
function Button(){

    // let count = 0;
    // const handleClick = (name) => {
    //     if (count <3){
    //         count++;
    //         console.log(`${name},You clicked me ${count} times.`)
    //     } else {
    //         console.log(`${name}, stop clicking me`)
    //     }
    // }
    // const handleClick2 = (name) => console.log(`I love you, ${name}`)

    const handleClick = (e) => e.target.textContent = "Kay";

    return(<button onDoubleClick={(e) => handleClick(e)}>Click me 🤖</button>)
}

export default Button