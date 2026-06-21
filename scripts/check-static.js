const fs = require('fs');
const required = ['index.html', 'src/styles.css'];
for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`Missing ${file}`);
    process.exit(1);
  }
}
const html = fs.readFileSync('index.html', 'utf8');
for (const token of ['Selected Work', 'Full Case Study', 'AUTO GLM', 'Contact']) {
  if (!html.includes(token)) {
    console.error(`Missing content token: ${token}`);
    process.exit(1);
  }
}
console.log('Static portfolio files verified.');
