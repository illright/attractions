const fs = require('fs');

const files = fs.readdirSync('./src');

for (const file of files) {
  fs.renameSync(`./src/${file}`, `./${file}`);
}
