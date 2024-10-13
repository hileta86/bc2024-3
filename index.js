const { program } = require('commander');
const fs = require('node:fs');

program
  .requiredOption('-i, --input <path>')
  .option('-o, --output <path>')
  .option('-d, --display');

program.parse();

const options = program.opts();

if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

if (!options.output && !options.display) {
    process.exit(0); 
  }

const data = fs.readFileSync(options.input, 'utf8');

let result;


const jsonData = JSON.parse(data);
const maxRate = Math.max(...jsonData.map(item => item.rate));
result = `Максимальний курс: ${maxRate}`;

if (options.output) {
  fs.writeFileSync(options.output, result);
}

if (options.display) {
  console.log(result);
}

