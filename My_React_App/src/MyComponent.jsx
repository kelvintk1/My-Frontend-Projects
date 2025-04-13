import React, {useState, useEffect, useRef} from "react";

function MyComponent(){
    // let [number, setNumber] = useState(0)
    const inputRef1 = useRef(null)
    const inputRef2= useRef(null)
    const inputRef3 = useRef(null)

    function handleClick1(){
        inputRef1.current.focus();
        inputRef1.current.style.backgroundColor = "yellow";
        inputRef2.current.style.backgroundColor = "";
        inputRef3.current.style.backgroundColor = "";
    }
    function handleClick2(){
        inputRef2.current.focus();
        inputRef2.current.style.backgroundColor = "yellow";
        inputRef1.current.style.backgroundColor = "";
        inputRef3.current.style.backgroundColor = "";
    }
    function handleClick3(){
        inputRef3.current.focus();
        inputRef3.current.style.backgroundColor = "yellow";
        inputRef1.current.style.backgroundColor = "";
        inputRef2.current.style.backgroundColor = "";
    }

    useEffect(() => {
        console.log("Component Rendered")
        // console.log(inputRef)
    })
    return (
        <div>
        <button onClick={handleClick1}>
            Click me1!
        </button>
        <input ref={inputRef1}/>
        <button onClick={handleClick2}>
            Click me2!
        </button>
        <input ref={inputRef2}/>
        <button onClick={handleClick3}>
            Click me3!
        </button>
        <input ref={inputRef3}/>
        </div>
    )
}

export default MyComponent









// import React, {useState, useEffect} from "react";

// function MyComponent(){
//     const [width, setWidth] = useState(window.innerWidth)
//     const [height, setHight] = useState(window.innerHeight)

//     function handleResize(){
//         setWidth(window.innerWidth)
//         setHight(window.innerHeight)
//     }

//     useEffect(() => {
//         window.addEventListener("resize", handleResize);
//         console.log("EVENT LISTNER ADDED")

//         return () => {
//             window.addEventListener("resize", handleResize);
//             console.log("EVENT LISTNER REMOVED")
//         }
//     }, [])
//     useEffect(() => {
//         document.title = `Size: ${width} x ${height}`
//     }, [width, height])
//     return(
//         <>
//         <p style={{color: "white"}}>Window width: {width}px</p>
//         <p style={{color: "white"}}>Window height: {height}px</p>
//         </>
//     )
// }

// export default MyComponent







// import React, {useState, useEffect} from "react";

// function MyComponent(){

//     const [count, setCount] = useState(0)
//     const [color, setColor] = useState("green")
//     useEffect(() =>{
//         document.title = `Count: ${count} ${color}`;
//     }, [count, color]);


//     function addCount(){
//         setCount(c => c + 1)
//     }
//     function subtract(){
//         setCount(c => c-1)
//     }
//     function changeColor(){
//         setColor(c => c === "green" ? "red" : "green")
//     }
//     return(
//         <>
//         <p style={{color: color}}>Count: {count}</p>
//         <button onClick={addCount}>Add</button>
//         <button onClick={subtract}>Subtract</button>
//         <button onClick={changeColor}>Change Color</button>
//         </>
//     )
// }

// export default MyComponent






// import React, {useState } from "react"

// function MyComponent(){

//     const [cars, setCars] = useState([])
//     const [carYear, setCarYear] = useState(new Date().getFullYear())
//     const [carMake, setCarMake] = useState("")
//     const [carModel, setCarModel] = useState("")

//     function handleAddCar (){
//         const newCar = {
//             year: carYear,
//             make: carMake,
//             model: carModel
//         }

//         setCars(c => [...c, newCar])

//         setCarYear(new Date().getFullYear())
//         setCarMake("")
//         setCarModel("")
//     }

//     function handleRemoveCar(index){
//         setCars(c => c.filter((_, i) => i !== index))
//     }

//     function handleYearChange(index) {
//         setCars(c => c.filter((_, i) => i !== index ))
//     }

//     function handleYearChange(event){
//         setCarYear(event.target.value)
//     }

//     function handleMakeChange(event){
//         setCarMake(event.target.value)
//     }

//     function handleModelChange(event){
//         setCarModel(event.target.value)
//     }

//     return (
//         <div>
//             <h2>List of Car Objects</h2>
//             <ul>
//                 {cars.map((car, index) =>
//                 <li key={index} onClick={() =>handleRemoveCar(index)}>
//                     {car.year} {car.make} {car.model}
//                 </li>
//                 )}
//             </ul>
//             <input type="number" value={carYear} onChange={handleYearChange}/><br/>
//             <input type="text" value={carMake} onChange={handleMakeChange} placeholder="Enter car make"/><br/>
//             <input type="text" value={carModel} onChange={handleModelChange} placeholder="Enter car model"/><br/>
//             <button onClick={handleAddCar}>Add Car</button>
//         </div>
//     )
// }

// export default MyComponent









// Updating the state of arrays using React
// import React, {useState} from "react";

// function MyComponent() {
//     const [foods, setFoods] = useState(["Apple", "Orange", "Banana"])

//     function handleAddFood(){
//         const newFood = document.getElementById("foodInput").value
//         document.getElementById("foodInput").value=""
//         setFoods(f => [...f, newFood])
//     }
//     function handleRemoveFoood(index){
//         setFoods(foods.filter((_, i) => i !== index))
//     }

//     return (
//         <div>
//             <h2>List of Food</h2>
//             <ul>
//                 {foods.map((food, index) =>
//                 <li key={index} onClick={() => handleRemoveFoood(index)}>
//                     {food}
//                 </li>
//                 )}
//             </ul>
//             <input type="text" id="foodInput" placeholder="Enter food name:"/>
//             <button onClick={handleAddFood}>Add Food</button>
//         </div>
//     )
// }

// export default MyComponent








// import React, {useState} from "react";

// // Updating the state of an object
// function MyComponent() {
//     const [car, setCar] = useState({year: 2025, make: "Ford", model: "Mustang"})

//     function handleYearChange(event){
//         setCar(c =>({...c, year: event.target.value}))
//     }
//     function handleMakeChange(event){
//         setCar(c => ({...c, make: event.target.value}))
//     }
//     function handleModelChange(event){
//         setCar(c => ({...c, model: event.target.value}))
//     }

//     return (
//         <div>
//             <p>Your favorite car is: {car.year} {car.make} {car.model}</p>
//             <input type="number" value={car.year} onChange={handleYearChange}/><br/>
//             <input type="text" value={car.make} onChange={handleMakeChange}/><br/>
//             <input type="text" value={car.model} onChange={handleModelChange}/><br/>
//         </div>
//     )
// }

// export default MyComponent









// import React, {useState} from "react"

//     function MyComponent(){
//         const [name, setName] = useState("Guest")
//         const [quantity, setQuantity] = useState(0)
//         const [comment, setComment] = useState("")
//         const [payment, setPayment] = useState("")
//         const [shipping, setShipping] = useState("Delivery")

//         function handleNameChange(event){
//             setName(event.target.value)
//         }
//         function handleQuantityChange(event){
//             setQuantity(event.target.value)
//         }
//         function handleCommentChange(event){
//             setComment(event.target.value)
//         }
//         function handlePaymentChange(event){
//             setPayment(event.target.value)
//         }
//         function handleShippingChange(event){
//             setShipping(event.target.value)
//         }

//         return (
//             <div>
//                 <input value={name} onChange={handleNameChange}/>
//                 <p>Name: {name}</p>

//                 <input value={quantity} onChange={handleQuantityChange} type="number"/>
//                 <p>Quantity: {quantity}</p>

//                 <textarea value={comment} onChange={handleCommentChange} placeholder="Enter delivery instructions"/>
//                 <p>Comment: {comment}</p>

//                 <select value={payment} onChange={handlePaymentChange}>
//                     <option value="">Select an option</option>
//                     <option value="Visa">Visa</option>
//                     <option value="Mastercard">Mastercard</option>
//                     <option value="Giftcard">Giftcard</option>
//                 </select>
//                 <p>Payment: {payment}</p>

//                 <label>
//                     <input type="radio" value="Pick Up" checked={shipping === "Pick Up"} onChange={handleShippingChange}/>
//                     Pick up
//                 </label><br/>
//                 <label>
//                     <input type="radio" value="Delivery" checked={shipping === "Delivery"} onChange={handleShippingChange}/>
//                     Delivery
//                 </label>
//                 <p>Shipping: {shipping}</p>
//             </div>
//         )
//     }

//     export default MyComponent













// function MyComponent() {
//     const [name, setName] = useState("Guest")
//     const [age, setAge] = useState(0)
//     const [isEmployed, setIsEmployed] = useState(false)

//     const updateName = () => {
//         setName("Kelvin")
//     }
//     const incrementAge = () => {
//         setAge(age+1)
//     }
//     const  employmentStatus= () => {
//         setIsEmployed(!isEmployed)
//     }

//     return(
//         <div>
//             <p>Name: {name}</p>
//             <button onClick={updateName}>Set Name</button>

//             <p>Age: {age}</p>
//             <button onClick={incrementAge}>Increment Age</button>
            
//             <p>Employment Status: {isEmployed ? "Yes" : "No"}</p>
//             <button onClick={employmentStatus}>Employed?</button>
//         </div>
//     )
// }

// export default MyComponent