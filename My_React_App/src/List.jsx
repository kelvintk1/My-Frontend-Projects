import propTypes from "prop-types";
function List({
    category = "Category",
    items = [{name: "List of items", calories: 0}]
}){
    // let category = Category
    const itemList = items
    // const fruits = [{id: 1, name: "apple", calories: 95},
    //     {id: 2,name: "orange", calories: 45},
    //     {id: 3,name: "banana", calories: 105},
    //     {id: 4,name: "coconut", calories: 159},
    //     {id: 5,name: "pineapple", calories: 37}]

    // fruits.sort((a, b) => a.name.localeCompare(b.name)) //Alphabetical
    // fruits.sort((a, b) => b.name.localeCompare(a.name)) //Reverse-Alphabetical
    // fruits.sort((a, b) => a.calories - b.calories) //Numeric
    // fruits.sort((a, b) => b.calories - a.calories) //Reverse-Numeric

    // const lowCalFruits = fruits.filter(fruit => fruit.calories > 100)
    
    // const listItems = lowCalFruits.map(lowCalFruit => <li key={lowCalFruit.id}>
    //                                         {lowCalFruit.name}: &nbsp;
    //                                         <b>{lowCalFruit.calories}</b></li>);

    const listItems = itemList.map(items => <li key={items.id}>
                                            {items.name}: &nbsp;
                                            <b>{items.calories}</b></li>);

    return(
        <>
            <h3 className="list-category">{category}</h3>
            <ol className="list-items">{listItems}</ol>
        </>
    )
}
List.propTypes = {
    category: propTypes.string,
    items: propTypes.arrayOf(propTypes.shape({id: propTypes.number, name: propTypes.string, calories: propTypes.number}))
}

export default List


// for App.jsx
// import List from "./List.jsx"

// function App() {

//   const fruits = [{id: 1, name: "apple", calories: 95},
//                   {id: 2,name: "orange", calories: 45},
//                   {id: 3,name: "banana", calories: 105},
//                   {id: 4,name: "coconut", calories: 159},
//                   {id: 5,name: "pineapple", calories: 37}]

//   const vegetables = [{id: 6, name: "potatoes", calories: 100},
//     {id: 7,name: "celery", calories: 15},
//     {id: 8,name: "carrots", calories: 25},
//     {id: 9,name: "corn", calories: 63},
//     {id: 10,name: "broccoli", calories: 50}]

//   return(
//     <>
//       {fruits.length > 0 && <List items={fruits} category="Fruits"/>
//     }
//       {vegetables.length > 0 && <List items={vegetables} category="Vegetables"/>
//     }
//     </>
//   )
// }


// export default App
