const fs = require('fs');

// First argument is build configuration
const build_cnf = process.argv[2].toLowerCase();

const transform_content = fs.readFileSync(`config.${build_cnf}.json`);
fs.writeFileSync('config.json', transform_content);