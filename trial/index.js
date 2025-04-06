let number = 0;
let sentence = "Cart quantity: ";

function show(){
    console.log(`Cart quantity: ${number}`)
}

function add(){
    number += 1
    console.log(`Cart quantity: ${number}`)
}
function double(){
    number += 2
    console.log(`Cart quantity: ${number}`)
}
function triple(){
    number += 3
    console.log(`Cart quantity: ${number}`)
}
function reset(){
    number = number - number
    console.log(`Cart was reset\nCart quantity: ${number}`)
}

function backspace(){
    number -= 1
    console.log(`Cart quantity: ${number}`)
}