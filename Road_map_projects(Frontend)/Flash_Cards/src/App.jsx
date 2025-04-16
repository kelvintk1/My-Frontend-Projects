import './App.css'
import React, { useState } from 'react'
import FlashCards from './flashCards'
import ProgressBar from './ProgressBar'

const QuestionSet = [
  {
    id: 1,
    question: "What is the difference between var, let, and const?",
    answer: "var is function-scoped and can be re-declared; let and const are block-scoped, with let allowing re-assignment and const preventing it. However, const objects can have their contents modified."
  },
  {
    id: 2,
    question: "Explain == vs ===",
    answer: `== (loose equality): Compares values after type coercion.${<br/>} === (strict equality): Compares values and types without coercion`


  },
  {
    id: 3,
    question: "What is hoisting in JavaScript?",
    answer: "Hoisting moves variable and function declarations to the top of their scope during compilation. var declarations are hoisted (initialized as undefined), while let/const are hoisted but not initialized (Temporal Dead Zone)."
  },
  {
    id: 4,
    question: "What is closure?",
    answer: "A closure is a function that retains access to its lexical scope (outer function’s variables) even after the outer function has executed."
  },
  {
    id: 5,
    question: "Explain 'this' keyword behavior.",
    answer: "var is function-scoped and can be re-declared; let and const are block-scoped, with let allowing re-assignment and const preventing it. However, const objects can have their contents modified."
  },
  {
    id: 6,
    question: "What are promises? How do they work?",
    answer: `romises handle asynchronous operations with states:${<br/>}Pending: Initial state.${<br/>}Fulfilled: Success (resolve() called).${<br/>}Rejected: Failure (reject() called).`
  },
  {
    id: 7,
    question: "What is async / await?",
    answer: "Syntactic sugar for promises. 'async' functions return promises, and 'await' pauses execution until a promise settles."
  },
  {
    id: 8,
    question: " What is the event loop?",
    answer: `A mechanism that handles asynchronous callbacks by:${<br/>}Executing the call stack.${<br/>}Moving callbacks from the task queue (macro) or microtask queue (e.g., promises) to the stack when empty.`
  },
  {
    id: 9,
    question: `How does 'setTimeout(fn, 0)' work?`,
    answer: "It queues the callback in the task queue after the call stack is clear, allowing other synchronous code to run first."
  },
  {
    id: 10,
    question: "What is prototypal inheritance?",
    answer: `Objects inherit properties/methods from their prototype '(via __proto__ or Object.create())'.`
  },
  {
    id: 11,
    question: "What are template literals?",
    answer: "Backtick-enclosed strings (``) allowing interpolation (${variable}) and multiline strings."
  },
  {
    id: 12,
    question: "Explain 'map()', 'filter()', and 'reduce()'.",
    answer: `map(): Returns a new array with transformed elements.${<br/>}filter(): Returns elements passing a condition.${<br/>}reduce(): Accumulates values into a single result.`
  },
  {
    id: 13,
    question: "What is destructuring?",
    answer: "Unpacking values from objects/arrays into variables."
  },
  {
    id: 14,
    question: "What is the spread operator (...)?",
    answer: "Expands iterables (arrays/objects) into individual elements."
  },
  {
    id: 15,
    question: "What is a pure function?",
    answer: `A function that:${<br/>}Always returns the same output for the same input.${<br/>}Has no side effects (doesn’t modify external state).`
  },
  {
    id: 16,
    question: "What is the difference between 'null' and 'undefined'?",
    answer: `undefined: A variable declared but not assigned.${<br/>}null: An intentional absence of value (must be assigned).
`  },
  {
    id: 17,
    question: " Explain ES6 modules (import/export).",
    answer: `export: Exports variables/functions from a module.${<br/>}import: Imports bindings from another module.`
  },
  {
    id: 18,
    question: "What is the purpose of 'use strict'?",
    answer: `Enforces stricter parsing/error handling by:${<br/>}Preventing global variable creation without var/let/const.${<br/>}Disallowing duplicate parameters.`
  },
  {
    id: 19,
    question: "How do you deep-copy an object?",
    answer: `const copy = JSON.parse(JSON.stringify(obj)); // Method 1 (no functions)${<br/>}const copy = structuredClone(obj); // Method 2 (modern browsers)`
  },
  {
    id: 20,
    question: "What is a higher-order function?",
    answer: "A function that takes a function as an argument and/or returns a function (e.g., map(), filter())."
  },

]

function App() {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => prevIndex === QuestionSet.length -1 ? 0 : prevIndex + 1)
  }

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? QuestionSet.length - 1 : prevIndex - 1
    );
  };
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };
  const progress = ((currentIndex + 1) / QuestionSet.length) * 100;

  return (
    <div className="app">
      <h1>Flash Cards</h1>
      <ProgressBar progress={progress} />
      <div className="counter">
        {currentIndex + 1} of {QuestionSet.length}
      </div>
      <FlashCards
        card={QuestionSet[currentIndex]} 
        showAnswer={showAnswer} 
        toggleAnswer={toggleAnswer} 
      />
      <div className="navigation">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={toggleAnswer}>
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  )
}

export default App
