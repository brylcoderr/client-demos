const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');
fs.writeFileSync('app/page.tsx', content.replace(/ duration=\{1\.1\} ease="power2\.out"/g, ''));
