const { log } = require('console');
// sync way of creating a file.
const fs = require('fs')
const path = require("path");

const dataFolder = path.join(__dirname, 'data');

if(!fs.existsSync(dataFolder)){
    fs.mkdirSync(dataFolder);
    console.log('Data folder created');
} else{
    console.log('Data folder already exist');
}

const filePath = path.join(dataFolder, 'example.txt')
fs.writeFileSync(filePath, 'Hello from node js')
console.log('File created successfully');

const readContentFromFile = fs.readFileSync(filePath, "utf8");
console.log("File content:", readContentFromFile)

fs.appendFileSync(filePath, '\nThis is a new line')
console.log("New file content added");


// async way of creating a file

const asyncFilepath = path.join(dataFolder, 'async-example.txt')
fs.writeFile(asyncFilepath, 'Hello async node js', (err) => {
    if (err) throw err;
    console.log('Async file is created successfully')
})
fs.readFile(asyncFilepath, 'utf8', (err, data) => {
    if(err) throw err;
    console.log('Async file content:', data)
})
fs.appendFile(asyncFilepath, '\nThis is another line.', (err) => {
    if (err) throw err;
    console.log('New line added to async file.')
})
fs.readFile(asyncFilepath, 'utf8', (err, updatedData) => {
    if(err) throw err;
    console.log('Updated file content', updatedData);
})