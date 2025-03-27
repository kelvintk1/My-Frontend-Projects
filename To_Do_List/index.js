const todoList = [];

function display(){
    todoListHtml = '';
    let index;
    for (index in todoList){
        const names = todoList[index]
        const html = `<h2>${names.item}</h2>
                    <p>${names.listDate}</p>
                    
                    <button onclick ="todoList.splice(${index}, 1); display();" class="deleteButton">Delete</button>
                    `;
                    todoListHtml += html;
                    console.log(todoListHtml)
    
        document.querySelector('.list')
        .innerHTML = (`${todoListHtml}`)
    }
}

function Todo_add(){
    let title = document.querySelector('.name');
    let Name = title.value;
    
    let date = document.querySelector('.todo_date');
    let Date = date.value;
    
    let subList = {item:`${Name}`, listDate:`${Date}`};

    // subList.push(Name, Date)
    console.log(subList)

    
    todoList.push(subList)
    console.log(todoList[subList])
    display();

    title.value = "";
    date.value = "";
}







// for (let i = 1; i<21; i++) {
//     nums = i
//     if(nums % 3 === 0 && i % 5 === 0){
//         nums = "FizzBuzz"
//     } else if (nums % 5 === 0){
//         nums = "Buzz"
//     } else if (nums % 3=== 0){
//         nums = "Fizz"
//     }
//     console.log(nums)
// }


// function countPositive(nums){
//     let numbers = nums

//     // let highest = Math.max(...nums)
//     // let lowest = Math.min(...nums)
//     let highest = numbers[0]
//     let lowest = numbers[0]

//     if (numbers.length === 0){
//         console.log(numbers)
//         highest = "null"
//         lowest = "null"
//     }
    
//     for (let i = 0; i < numbers.length; i++){
//         let number = numbers[i]
//         if (number > highest){
//             highest = number
//         } else if (number < lowest){
//             lowest = number
//         }
//     }

//     console.log(numbers)
//     console.log(`min: ${lowest}, max: ${highest}`)
// }

// countPositive([])


// function countWords(words) {
//     let wordCount = {}; // Object to store word counts

//     for (let i = 0; i < words.length; i++) {
//         let word = words[i]; // Current word in the array

//         // If the word is already in the object, increment its count
//         if (wordCount[word]) {
//             wordCount[word] += 1;
//         } else {
//             // Otherwise, add the word to the object with a count of 1
//             wordCount[word] = 1;
//         }
//     }

//     // Log the word counts
//     console.log(wordCount);
// }

// // Test the function
// countWords(["apple", "banana", "apple"]);

// function countWords(words){
//     let names = {};

//     for (let i = 0; i < words.length; i++){
//         let name = words[i];

//         if (names[name]) {
//             names[name] += 1;
//         } else {
//             names[name] =1;
//         }
//     }
//     console.log(names)
// }
// countWords(["apple", "banana", "apple", "orange", "banana"]);



