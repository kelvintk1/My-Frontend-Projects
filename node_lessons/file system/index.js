const { log } = require('console');
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
