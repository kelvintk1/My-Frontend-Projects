// const lodash = require('lodash');

// const names = ['kay', 'kelly', 'kelvin', 'nessa' ]
// const Capitalize = lodash.map(names, lodash.capitalize);

// console.log(Capitalize);

const path = require('path');


console.log('Directory name: ', path.dirname(__filename));
console.log('File name: ', path.basename(__filename));
console.log('File  extention: ', path.extname(__filename));

const joinPath = path.join('/user', 'documents', 'node', 'projects')
console.log('Joined path: ', joinPath);

const resolvePath = path.resolve('user', 'documents', 'node', 'project')
console.log('Resolve path: ', resolvePath);

const normalizePath = path.normalize('/user/.documents/../node/projects')
console.log('normalizePath: ',normalizePath);
