let cookie = `
    <div class="cookies_container">
        <div class="images">
            <span class="cookies_image_container">
                <img src="cookie.png" class="cookies_image">
            </span>
            <span class="close_container">
                <img src="multiply.png" class="close_image">
            </span>
        </div>
        <div class="words">
            <p>We use cookies to improve your user experience</p>
        </div>
        <button>I like Cookies</button>
    </div> 
`

document.querySelector(".body").innerHTML = cookie;

document.querySelector("button").addEventListener("click", () => {
    cookie = ` `
    document.querySelector(".body").innerHTML = cookie;
})

document.querySelector(".close_image").addEventListener("click", () => {
    cookie = ` `
    document.querySelector(".body").innerHTML = cookie;
})