import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const root = process.cwd();
const dirs = fs.readdirSync(root, { withFileTypes: true });
const demos = [];

for (const d of dirs) {
  if (d.isDirectory() && !d.name.startsWith('.') && d.name !== 'node_modules' && d.name !== 'scripts' && d.name !== 'packages') {
    demos.push(d.name);
  }
}

let failed = false;

for (const demo of demos) {
  console.log(`\n================================`);
  console.log(`VERIFYING: ${demo}`);
  console.log(`================================`);
  
  try {
    console.log(`> Build...`);
    execSync(`pnpm --filter ${demo} build`, { stdio: 'inherit' });
    
    console.log(`\n> Lint Colors...`);
    execSync(`node scripts/lint-colors.mjs ${demo}`, { stdio: 'inherit' });
    
    console.log(`\n> Check Contrast...`);
    execSync(`node scripts/check-contrast.mjs ${demo}`, { stdio: 'inherit' });
    
    console.log(`\n> QA (Playwright/Axe)...`);
    execSync(`node scripts/qa.mjs ${demo}`, { stdio: 'inherit' });
    
  } catch (err) {
    console.error(`\n[FAIL] Verification failed for ${demo}`);
    failed = true;
  }
}

if (failed) {
  console.error(`\n[ERROR] One or more demos failed verification.`);
  process.exit(1);
} else {
  console.log(`\n[SUCCESS] All demos verified successfully.`);
}
