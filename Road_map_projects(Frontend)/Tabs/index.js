let Tab1_content = `
    <div class="content">
        <h1>Contents for the first tab</h1>
        <h2>1</h2>
    </div> `

document.querySelector(".tabsContent").innerHTML = Tab1_content;

document.querySelector(".tab_1").addEventListener("click", () => {
    document.querySelector(".tabsContent").innerHTML = Tab1_content;
})
document.querySelector(".tab_2").addEventListener("click", () => {
    document.querySelector(".tabsContent").innerHTML = `
    <div class="content">
        <h1>Contents for the second tab</h1>
        <h2>2</h2>
    </div> `
})
document.querySelector(".tab_3").addEventListener("click", () => {
    document.querySelector(".tabsContent").innerHTML = `
    <div class="content">
        <h1>Contents for the third tab</h1>
        <h2>3</h2>
    </div> `
})
document.querySelector(".tab_4").addEventListener("click", () => {
    document.querySelector(".tabsContent").innerHTML = `
    <div class="content">
        <h1>Contents for the fourth tab</h1>
        <h2>4</h2>
    </div> `
})