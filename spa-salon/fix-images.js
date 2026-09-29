const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const dir = path.join(process.cwd(), 'public', 'images');

// 1. Generate noise.png
const noiseSize = 256;
const noiseBuffer = Buffer.alloc(noiseSize * noiseSize * 4);
for (let i = 0; i < noiseBuffer.length; i += 4) {
  const v = Math.random() * 255;
  noiseBuffer[i] = v;
  noiseBuffer[i+1] = v;
  noiseBuffer[i+2] = v;
  noiseBuffer[i+3] = 20; // low opacity
}
sharp(noiseBuffer, { raw: { width: noiseSize, height: noiseSize, channels: 4 } })
  .png()
  .toFile(path.join(dir, 'noise.png'));

// 2. Generate cursor-view.svg
const cursorSvg = `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="32" fill="rgba(255, 255, 255, 0.2)" />
  <circle cx="32" cy="32" r="31.5" fill="none" stroke="rgba(255, 255, 255, 0.5)" />
  <text x="32" y="32" font-family="sans-serif" font-size="12" fill="#fff" text-anchor="middle" dominant-baseline="middle" letter-spacing="2">VIEW</text>
</svg>`;
fs.writeFileSync(path.join(dir, 'cursor-view.svg'), cursorSvg);

// 3. Convert all .jpg.svg to .jpg
const files = fs.readdirSync(dir);
for (const f of files) {
  if (f.endsWith('.jpg.svg')) {
    const svgPath = path.join(dir, f);
    const jpgPath = path.join(dir, f.replace('.svg', ''));
    sharp(svgPath).jpeg().toFile(jpgPath).then(() => {
      fs.unlinkSync(svgPath);
    });
  }
}
