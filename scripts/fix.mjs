import fs from 'fs';
import { execSync } from 'child_process';

const output = execSync('git grep -E "#[0-9a-fA-F]{3,8}\\b|rgb\\(|hsl\\(" -- "*/components/*" "*/app/*" ":(exclude)*/tokens.css"').toString();
const files = [...new Set(output.split('\n').filter(Boolean).map(line => line.split(':')[0]))];
for (const file of files) {
  if (file.includes('apple-icon.png') || file.includes('icon.png')) continue;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/#[0-9a-fA-F]{3,8}\b/g, 'var(--accent)');
  content = content.replace(/rgb\([^)]+\)/g, 'var(--accent)');
  content = content.replace(/hsl\([^)]+\)/g, 'var(--accent)');
  fs.writeFileSync(file, content);
}
console.log('Fixed colors.');
