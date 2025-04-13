import React, {useState} from "react"

function Counter(){
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count + 1)
        // Updater functions
        // setCount(c => c + 1)
        // setCount(c => c + 1)
        // setCount(c => c + 1)
    }
    const reset = () => {
        setCount(count - count)
    }
    const decrement = () => {
        if (count == 0){
            setCount(count)
        } else{
            setCount(count-1)
            // Updater functions
            // setCount(c =>c-1)
            // setCount(c =>c-1)
            // setCount(c =>c-1)
        }
    }

    return (
        <div className="counter-container">
            <p className="count-display">{count}</p>
            <button className="counter-button" onClick={decrement}>Decrement</button>
            <button className="counter-button" onClick={reset}>Reset</button>
            <button className="counter-button" onClick={increment}>Increment</button>
        </div>
    )
}

export default Counter