import fs from 'fs';
import path from 'path';

const demo = process.argv[2];
if (!demo) {
  console.error('Usage: node scripts/check-contrast.mjs <demo-folder>');
  process.exit(1);
}

const tokensPath = path.join(process.cwd(), demo, 'app', 'tokens.css');
if (!fs.existsSync(tokensPath)) {
  console.error(`File not found: ${tokensPath}`);
  process.exit(1);
}

const content = fs.readFileSync(tokensPath, 'utf8');

// Parse blocks
const blocks = {};
const blockRegex = /([^{]+)\{([^}]+)\}/g;
let match;
while ((match = blockRegex.exec(content)) !== null) {
  const selector = match[1].trim();
  const rules = match[2];
  if (!blocks[selector]) blocks[selector] = {};
  
  const ruleRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let ruleMatch;
  while ((ruleMatch = ruleRegex.exec(rules)) !== null) {
    blocks[selector][`--${ruleMatch[1]}`] = ruleMatch[2].trim();
  }
}

// Inherit :root
const rootVars = blocks[':root'] || {};
for (const selector of Object.keys(blocks)) {
  if (selector !== ':root') {
    blocks[selector] = { ...rootVars, ...blocks[selector] };
  }
}

// Parse extra-pairs
const extraPairs = [];
const commentMatch = content.match(/\/\*\s*extra-pairs\s*:\s*([^*]+)\*\//);
if (commentMatch) {
  const pairs = commentMatch[1].split(',').map(s => s.trim()).filter(Boolean);
  pairs.forEach(p => {
    const [fg, bg] = p.split('/');
    if (fg && bg) extraPairs.push({ fg: `--${fg}`, bg: `--${bg}` });
  });
}

const basePairs = [
  { fg: '--fg', bg: '--bg' },
  { fg: '--fg', bg: '--surface' },
  { fg: '--fg', bg: '--surface-2' },
  { fg: '--fg-muted', bg: '--bg' },
  { fg: '--fg-muted', bg: '--surface' },
  { fg: '--fg-muted', bg: '--surface-2' },
  { fg: '--on-accent', bg: '--accent' },
  { fg: '--inverse-fg', bg: '--inverse-bg' }
];

const allPairs = [...basePairs, ...extraPairs];

function parseColor(str) {
  if (!str) return null;
  str = str.trim();
  if (str.startsWith('#')) {
    let hex = str.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      hex = Array.from(hex).map(c => c + c).join('');
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return [r, g, b];
  }
  return null;
}

function luminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

let failed = false;

for (const [selector, vars] of Object.entries(blocks)) {
  for (const pair of allPairs) {
    const fgVal = vars[pair.fg];
    const bgVal = vars[pair.bg];
    
    if (!fgVal || !bgVal) continue;
    
    const fgColor = parseColor(fgVal);
    const bgColor = parseColor(bgVal);
    
    if (!fgColor || !bgColor) continue;
    
    const l1 = luminance(...fgColor);
    const l2 = luminance(...bgColor);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    
    if (ratio < 4.5) {
      console.error(`FAIL: ${selector} | pair: ${pair.fg}/${pair.bg} | ratio: ${ratio.toFixed(2)}`);
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
} else {
  console.log(`PASS: ${demo} contrast ratios are >= 4.5`);
}
