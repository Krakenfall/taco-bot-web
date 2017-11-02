const fs = require('fs');

// First argument is build configuration
const build_cnf = 'Releases';// process.argv[2].toLowerCase();

try {
    const transform_content = fs.readFileSync(`config.${build_cnf}.json`);
    fs.writeFileSync('config.json', transform_content)
} catch (e) {
    console.log(e);
}