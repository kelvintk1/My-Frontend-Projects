const lodash = require('lodash');

const names = ['kay', 'kelly', 'kelvin', 'nessa' ]
const Capitalize = lodash.map(names, lodash.capitalize);

console.log(Capitalize);