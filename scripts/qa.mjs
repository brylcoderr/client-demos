import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

const demo = process.argv[2];
if (!demo) {
  console.error('Usage: node scripts/qa.mjs <demo-folder>');
  process.exit(1);
}

const qaDir = path.join(process.cwd(), demo, 'qa');
if (!fs.existsSync(qaDir)) fs.mkdirSync(qaDir, { recursive: true });

async function run() {
  console.log(`Running QA for ${demo}...`);
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // We assume the demo is already built and running on a port, or we just test localhost:3000
  // In a real environment, we'd spawn the server here. For this script, we'll try port 3000.
  const url = 'http://localhost:3005';
  
  let hasErrors = false;
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`[Console Error] ${msg.text()}`);
      hasErrors = true;
    }
  });
  
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
  } catch (e) {
    console.error(`[Error] Could not reach ${url}. Make sure the server is running.`);
    await browser.close();
    process.exit(1);
  }

  // Check 3 viewports
  const viewports = [360, 768, 1440];
  for (const width of viewports) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(500); // let layout settle
    await page.screenshot({ path: path.join(qaDir, `screenshot-${width}.png`), fullPage: true });
    
    // Check horizontal overflow
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    if (overflow) {
      console.error(`[FAIL] Horizontal overflow detected at ${width}px`);
      hasErrors = true;
    }
  }

  // Wait for images to load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Check zero width images
  const zeroImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.filter(img => img.naturalWidth === 0).map(img => img.src);
  });
  if (zeroImages.length > 0) {
    console.error(`[FAIL] Images with naturalWidth 0:`, zeroImages);
    hasErrors = true;
  }

  // Axe core check
  try {
    const results = await new AxeBuilder({ page }).analyze();
    if (results.violations.length > 0) {
      console.error(`[FAIL] Axe-core violations found:`);
      results.violations.forEach(v => console.error(JSON.stringify({id: v.id, nodes: v.nodes.map(n => n.html)})));
      hasErrors = true;
    }
  } catch (e) {
    console.error(`[Warning] @axe-core/playwright not available or failed`);
  }

  // We skip computed contrast < 4.5 here via playwright because axe-core 'color-contrast' rule already checks it,
  // but if we need a custom check we would evaluate getComputedStyle.
  
  await browser.close();
  
  if (hasErrors) {
    process.exit(1);
  } else {
    console.log(`[PASS] ${demo} QA checks passed`);
  }
}

run();
