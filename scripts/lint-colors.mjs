import fs from 'fs';
import path from 'path';

const demo = process.argv[2];
let demosToCheck = [];

if (demo) {
  demosToCheck.push(demo);
} else {
  // Find all directories that contain 'app' or 'components'
  const root = process.cwd();
  const dirs = fs.readdirSync(root, { withFileTypes: true });
  for (const d of dirs) {
    if (d.isDirectory() && !d.name.startsWith('.') && d.name !== 'node_modules' && d.name !== 'scripts' && d.name !== 'packages') {
      demosToCheck.push(d.name);
    }
  }
}

const colorRegex = /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/;
const tailwindRegex = /(text|bg|border|from|to|via|ring|fill|stroke)-(white|black|gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(-\d+)?/;

function walkDir(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === 'dist') continue;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

let files = [];
for (const d of demosToCheck) {
  const dirsToCheck = ['app', 'components', 'lib'].map(folder => path.join(process.cwd(), d, folder));
  dirsToCheck.forEach(dirPath => {
    walkDir(dirPath, files);
  });
}

let failed = false;
for (const file of files) {
  if (path.basename(file) === 'tokens.css') continue;
  
  const content = fs.readFileSync(file, 'utf8');
  if (colorRegex.test(content)) {
    console.error(`FAIL: Hardcoded color found in ${file}`);
    failed = true;
  }
  if (tailwindRegex.test(content)) {
    console.error(`FAIL: Tailwind palette class found in ${file}`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
} else {
  console.log(`PASS: ${demo} color linting`);
}
