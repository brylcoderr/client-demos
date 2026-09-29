import fs from 'fs';
import path from 'path';
import https from 'https';

const demoFolder = process.argv[2];
if (!demoFolder) {
  console.error("Usage: node scripts/fetch-images.mjs <demo-folder>");
  process.exit(1);
}

const envPath = path.join(process.cwd(), '.env.local');
let PEXELS_KEY = process.env.PEXELS_API_KEY;
let UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  const pexelsMatch = envFile.match(/PEXELS_API_KEY=(.+)/);
  if (pexelsMatch) PEXELS_KEY = pexelsMatch[1].trim();
  const unsplashMatch = envFile.match(/UNSPLASH_ACCESS_KEY=(.+)/);
  if (unsplashMatch) UNSPLASH_KEY = unsplashMatch[1].trim();
}

// API Fetch helper
function fetchJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data));
          } else {
            resolve({ error: true, status: res.statusCode, data });
          }
        } catch (e) {
          resolve({ error: true, message: e.message });
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  const manifestPath = path.join(demoFolder, 'public', 'images', 'images.manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error(`Manifest not found at ${manifestPath}`);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const creditsPath = path.join(demoFolder, 'CREDITS.md');
  const lockPath = path.join(demoFolder, 'public', 'images', 'images.lock.json');
  const lockData = fs.existsSync(lockPath) ? JSON.parse(fs.readFileSync(lockPath, 'utf8')) : {};
  const imagesDir = path.join(demoFolder, 'public', 'images');

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const manualReview = [];

  for (const entry of manifest) {
    console.log(`\nProcessing: ${entry.file}`);
    let survivor = null;
    let source = '';

    const queriesToTry = [entry.query, ...(entry.fallbacks || [])].slice(0, 4); // main + up to 3 fallbacks

    for (const q of queriesToTry) {
      if (survivor) break;
      console.log(`  Trying query: "${q}"`);

      // 1. Try Pexels
      if (PEXELS_KEY) {
        const pexelsUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&orientation=${entry.orientation || 'landscape'}&per_page=20`;
        const pexelsData = await fetchJson(pexelsUrl, { 'Authorization': PEXELS_KEY });
        if (!pexelsData.error && pexelsData.photos) {
          for (const photo of pexelsData.photos) {
            const alt = (photo.alt || '').toLowerCase();
            const width = photo.width;

            if (width < (entry.minWidth || 0)) continue;

            const hasMust = !entry.must || entry.must.length === 0 || entry.must.some(w => alt.includes(w.toLowerCase()));
            const hasAvoid = entry.avoid && entry.avoid.some(w => alt.includes(w.toLowerCase()));

            if (hasMust && !hasAvoid) {
              survivor = photo;
              source = 'pexels';
              break;
            }
          }
        }
      }

      if (survivor) break;

      // 2. Try Unsplash
      if (UNSPLASH_KEY) {
        const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&orientation=${entry.orientation || 'landscape'}&per_page=20`;
        const unsplashData = await fetchJson(unsplashUrl, { 'Authorization': `Client-ID ${UNSPLASH_KEY}` });
        if (!unsplashData.error && unsplashData.results) {
          for (const photo of unsplashData.results) {
            const desc = (photo.alt_description || photo.description || '').toLowerCase();
            const width = photo.width;

            if (width < (entry.minWidth || 0)) continue;

            const hasMust = !entry.must || entry.must.length === 0 || entry.must.some(w => desc.includes(w.toLowerCase()));
            const hasAvoid = entry.avoid && entry.avoid.some(w => desc.includes(w.toLowerCase()));

            if (hasMust && !hasAvoid) {
              survivor = photo;
              source = 'unsplash';
              break;
            }
          }
        }
      }
    }

    if (survivor) {
      console.log(`  Found survivor from ${source}. ID: ${survivor.id}`);
      let downloadUrl = '';
      let photographer = '';
      let pageUrl = '';
      let license = '';
      let altText = entry.alt || '';

      if (source === 'pexels') {
        downloadUrl = survivor.src.large2x;
        photographer = survivor.photographer;
        pageUrl = survivor.url;
        license = 'Pexels License';
        if (!altText) altText = survivor.alt;
      } else {
        downloadUrl = survivor.urls.regular;
        photographer = survivor.user.name;
        pageUrl = survivor.links.html;
        license = 'Unsplash License';
        if (!altText) altText = survivor.alt_description || survivor.description;
        // Hit download_location as required by Unsplash
        await fetchJson(survivor.links.download_location, { 'Authorization': `Client-ID ${UNSPLASH_KEY}` });
      }

      const destPath = path.join(imagesDir, entry.file);
      await downloadFile(downloadUrl, destPath);
      console.log(`  Downloaded to ${destPath}`);

      // Try resize if sharp is available
      try {
        const sharp = (await import('sharp')).default;
        const buffer = fs.readFileSync(destPath);
        await sharp(buffer).resize({ width: 2000, withoutEnlargement: true }).toFile(destPath + '.tmp');
        fs.renameSync(destPath + '.tmp', destPath);
        console.log(`  Resized to max 2000px wide`);
      } catch (e) {
        // Ignore if sharp not available
      }

      // Update CREDITS.md
      const creditLine = `- [${entry.file}](${pageUrl}) by ${photographer} (${license})\n`;
      fs.appendFileSync(creditsPath, creditLine);

      // Update lock
      lockData[entry.file] = {
        id: survivor.id,
        source: source,
        alt: altText
      };
      fs.writeFileSync(lockPath, JSON.stringify(lockData, null, 2));

    } else {
      console.log(`  No survivor found. Generating placeholder.`);
      const destPath = path.join(imagesDir, entry.file);

      // Determine placeholder styling from tokens.css if it exists
      let bg = '#222';
      let fg = '#fff';
      const tokensPath = path.join(demoFolder, 'app', 'tokens.css');
      if (fs.existsSync(tokensPath)) {
        const css = fs.readFileSync(tokensPath, 'utf8');
        const bgMatch = css.match(/--bg\s*:\s*(#[0-9a-fA-F]{3,8})/);
        const fgMatch = css.match(/--accent\s*:\s*(#[0-9a-fA-F]{3,8})/);
        if (bgMatch) bg = bgMatch[1];
        if (fgMatch) fg = fgMatch[1];
      }

      // Generate SVG placeholder
      const svg = `<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bg}" />
        <text x="50%" y="50%" font-family="sans-serif" font-size="48" fill="${fg}" text-anchor="middle" dominant-baseline="middle">
          Placeholder: ${entry.file}
        </text>
      </svg>`;

      // If the file extension is .svg, write it directly. Otherwise, write as SVG and rename or just write the raw SVG for now.
      fs.writeFileSync(destPath + (destPath.endsWith('.svg') ? '' : '.svg'), svg);
      manualReview.push(entry.file);
    }
  }

  if (manualReview.length > 0) {
    console.log('\nNEEDS_MANUAL:');
    manualReview.forEach(f => console.log(`- ${f}`));
  }
}

run().catch(console.error);
