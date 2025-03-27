// Amazon.html JS file
import data, { saveToLocalStorage, loadFromLocalStorage } from "./cart_data.js";

// Load data from localStorage before anything else
loadFromLocalStorage();

const products = [{
    productID: "54oKk33!0+",
    image: "Gallery/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
        stars: "⭐⭐⭐",
        count: 87
    },
    price: 10.90
},
{
    productID: "94^u1(43IV",
    image: "Gallery/intermediate-composite-basketball.jpg",
    name: "Intermediate size Basketball",
    rating: {
        stars: "⭐⭐⭐⭐",
        count: 127
    },
    price: 20.95
},
{
    productID:"@At418!5A0", 
    image: "Gallery/6-piece-non-stick-baking-set.webp",
    name: "6 Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 12
    },
    price: 34.99
},
{
    productID: "*2G9x8(33G",
    image: "Gallery/countertop-blender-64-oz.jpg",
    name: "Countertop Blender- 64oz, 1400 Watts",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 53
    },
    price: 107.47
},
{
    productID: "51$H72hf+2",
    image: "Gallery/adults-plain-cotton-tshirt-2-pack-black.jpg",
    name: "Adults Plain Cotton T-shirt -2 Pack",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 53
    },
    price: 7.99
},
{
    productID: "X5^m517$U3",
    image: "Gallery/men-athletic-shoes-black.jpg",
    name: "Men's Athletic Sneaker",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 53
    },
    price: 38.90
},
{
    productID: "6))44u74pV",
    image: "Gallery/men-cozy-fleece-zip-up-hoodie-red.jpg",
    name: "Men's Full-Zip Hooded Fleece Sweatshirt",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 53
    },
    price: 24.00
},
{
    productID: "6Y281&Ya@6",
    image: "Gallery/women-french-terry-fleece-jogger-camo.jpg",
    name: "Women's Fleece Jogger Sweatpant",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 536
    },
    price: 24.00
},
{
    productID: "80e%hp341+",
    image: "Gallery/backpack.jpg",
    name: "Backpack",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 35
    },
    price: 11.00
},
{
    productID: "19pR7&i0&8",
    image: "Gallery/floral-mixing-bowl-set.jpg",
    name: "Floral-Mixing-Bowl-Set",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 40
    },
    price: 24.00
},
{
    productID: "1137yh^7r@",
    image: "Gallery/facial-tissue-2-ply-18-boxes.jpg",
    name: "Ultra Soft Tissue 2-Ply-18 Box",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 40
    },
    price: 23.74
},
{
    productID: "+8Ee#6p039",
    image: "Gallery/electric-glass-and-steel-hot-water-kettle.webp",
    name: "Electric-Glass-and-Steel-Hot-Water-Kettle",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 40
    },
    price: 30.74
},
{
    productID: "9)+n3d570R",
    image: "Gallery/blackout-curtains-black.jpg",
    name: "Blackout Curtains Set 42 x 84-Inch-Black,2 Panels",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 30.99
    },
    price: 23.74
},
{
    productID: "84j5C%X4+5",
    image: "Gallery/women-stretch-popover-hoodie-black.jpg",
    name: "Women-Stretch-Popover-Hoodie-Black",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 56
    },
    price: 13.74
},
{
    productID: "L72^b3V63+",
    image: "Gallery/bathroom-rug.jpg",
    name: "Bathroom-rug",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 22
    },
    price: 12.50
},
{
    productID: "%82091v(YM",
    image: "Gallery/coffeemaker-with-glass-carafe-black.jpg",
    name: "Coffeemaker-with-Glass-Carafe-Black",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 22.50
    },
    price: 23.74
},
{
    productID: "%82091o(YM",
    image: "Gallery/kay_Airpod.jpg",
    name: "Airpod",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 22.50
    },
    price: 89.67
},
{
    productID: "%89611v(ZM",
    image: "Gallery/kay_Black & white shoe.jpg",
    name: "OffWhite Shoe",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 22.50
    },
    price: 190.52
},
{
    productID: "*82068v@YM",
    image: "Gallery/kay_Black Basketball.jpg",
    name: "Black Basketball",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 22.50
    },
    price: 15.00
},
{
    productID: "&82181v(YK",
    image: "Gallery/kay_Cardy's top & down.jpg",
    name: "Cardy top & down",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 22.50
    },
    price: 200.74
},
{
    productID: "%02091w(AM",
    image: "Gallery/kay_complete suit.jpg",
    name: "Complete suit",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 22.50
    },
    price: 290.89
},
{
    productID: "%72091q>YM",
    image: "Gallery/kay_lady's sneakers.jpg",
    name: "Lady's Sneakers",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 22.50
    },
    price: 80.24
},
{
    productID: "%_5391v(YM",
    image: "Gallery/kay_Men's material suit.jpg",
    name: "Men's Material suit",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 22.50
    },
    price: 210.56
},
{
    productID: "</>82091YM",
    image: "Gallery/kay_Men's short nickers.jpg",
    name: "Men's Short Nickers",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 22.50
    },
    price: 50.25
},
{
    productID: "%52091v^$M",
    image: "Gallery/kay_Sneakers Airforce.jpg",
    name: "Airforce Sneakers",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 22.50
    },
    price: 300.00
},
{
    productID: "%8209#&HM",
    image: "Gallery/kay_Sneakers Social Man.jpg",
    name: "Social Sneakers",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 22.50
    },
    price: 240.99
},
{
    productID: "%82091V!=+a",
    image: "Gallery/kay_White Cardy top & down.jpg",
    name: "White Cardy top & down",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 22.50
    },
    price: 310.50
},
{
    productID: "%81234v(YM",
    image: "Gallery/kay_Wine suit.jpg",
    name: "Wine suit coat",
    rating: {
        stars: "⭐⭐⭐⭐⭐",
        count: 22.50
    },
    price: 270.89
},
];

let product_html = ``;

products.forEach((product) => {
    product_html += `
        <div class="templates">
        <div class="pictures">
            <img src= "${product.image}" class="images">
        </div>
        <div class="describe">
        <p class="description">${product.name}</p>
        </div>
        <div class="stars">${product.rating.stars} ${product.rating.count}</div>
        <div class="amount_quantity">
            <p class="amount">${product.price}</p>
            <select class="dropdown-quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            </select>
            </div>
            <div class="addCart">
                <span class="add"></span>
                <button class="addCart_button" data-product-id = "${product.productID}">Add to Cart</button>
            </div>
        </div>
    `
});

document.querySelector(".amazon_products")
    .innerHTML = product_html;

document.querySelector(".number").textContent = data.checkout_cart_items ?? 0;

document.querySelectorAll(".addCart_button")
    .forEach((button) => {
        button.addEventListener('click', () => {
            const add_notice = button.parentElement.querySelector(".add");
            add_notice.innerHTML = `
                <div class="checkmark">
                    <img src="Gallery/icons/checkmark.png" alt="Checkmark" class="checkmark-icon">
                </div>
                <div class="added">Added!</div>`;
            setTimeout(() => {
                add_notice.textContent = "";
            }, 2000);

            const product_card = button.closest(".templates");
            const quantity_dropdown = product_card.querySelector(".dropdown-quantity");
            const selected_quantity = parseInt(quantity_dropdown.value);

            const product_id = button.getAttribute("data-product-id");
            const product_name = product_card.querySelector(".description").textContent;
            const product_price = product_card.querySelector(".amount").textContent;
            const product_image = product_card.querySelector(".images").src;

            const price = parseFloat(product_price.replace(/[^0-9.-]+/g, ""));
            const total_Product_price = (price * selected_quantity).toFixed(2);

            // FIX: null-safe
            const existingProductIndex = data.cart.findIndex((item) => item && item.product_id === product_id);
            if (existingProductIndex !== -1) {
                const existingProduct = data.cart[existingProductIndex];
                data.checkout_cart_items -= existingProduct.quantity;
                existingProduct.quantity = selected_quantity;
                existingProduct.price = total_Product_price;
                data.checkout_cart_items += selected_quantity;
            } else {
                data.cart.push({
                    product_id: product_id,
                    product_Name: product_name,
                    quantity: selected_quantity,
                    price: total_Product_price,
                    image: product_image
                });
                data.checkout_cart_items += selected_quantity;
            }

            document.querySelector(".number").textContent = data.checkout_cart_items;
            saveToLocalStorage();
        });
    });
