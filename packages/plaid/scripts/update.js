const fs = require('fs/promises');
const path = require('path');

const packageRoot = path.resolve(__dirname, '..');

async function main() {
  const packages = await fs.readdir(path.dirname(packageRoot));
  await fs.writeFile(
    path.resolve(packageRoot, 'util/packages.json'),
    JSON.stringify(packages, null, 2),
    'utf8',
  );
}

main();
