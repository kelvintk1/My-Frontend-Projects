const firstModule = require("./first-module")

console.log(firstModule.add(15, 5));
console.log(firstModule.subtract(15, 5));
console.log(firstModule.divide(15, 0));

try{
    console.log('trying to divide by zero');
    let result = firstModule.divide(0,0)
    console.log(result);   
} catch(error){
    console.log('Caught an error', error.message);
    
}

// module wrapper
// function(exports, require, module, __filename, __dirname)
