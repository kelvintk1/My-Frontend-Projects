import data from "./cart_data.js";

// Retrieve orders from localStorage
const orders = JSON.parse(localStorage.getItem('orders')) || [];
orders.reverse();

let Order_html = ``;

if (orders.length > 0) {
    orders.forEach((order) => {
        order.items.forEach((ordered_item) => {
            Order_html += `
                <div class="order_item">
                    <div class="picture"> 
                        <img src="${ordered_item.image}" class="order_image">
                    </div>
                    <div class="order_details">
                        <h3 class="order_name">${ordered_item.product_Name}</h3>
                        <p class="arrival_date">Arriving on:</p>
                        <p class="order_quantity">Quantity: ${ordered_item.quantity}</p>
                        <p class="order_price">Price: $${ordered_item.price}</p>
                        <p class="add"></p>
                        <span class="order_button">
                            <button class="buy_button">
                                <img src="Gallery/icons/buy-again.png" class="buy_image">
                                Buy Again
                            </button>
                        </span>
                    </div>
                    <button class="track_package">Track Package</button>
                </div>
            `;
        });

        Order_html += `</div><hr>`;
    });
} else {
    Order_html = `<p>No orders found.</p>`;
}

document.querySelector(".orders").innerHTML = Order_html;

// Buy Again Functionality
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".buy_button").forEach(button => {
        button.addEventListener("click", function () {
            const productElement = this.closest(".order_item");
            const productName = productElement.querySelector(".order_name").textContent;
            const productImage = productElement.querySelector(".order_image").src;
            const productQuantity = parseInt(productElement.querySelector(".order_quantity").textContent.split(":")[1].trim());
            const productPrice = parseFloat(productElement.querySelector(".order_price").textContent.split("$")[1].trim());

            // Find the ".add" element inside productElement
            const add_notice = productElement.querySelector(".add");

            if (add_notice) {
                add_notice.innerHTML = `
                    <div class="checkmark_order">
                        <img src="Gallery/icons/checkmark.png" alt="Checkmark" class="checkmark-icon">
                    </div>
                    <div class="added_order">Added!</div>`;
                
                setTimeout(() => {
                    add_notice.textContent = "";
                }, 2000);
            }

            // Retrieve existing cart data
            let cartData = JSON.parse(localStorage.getItem("cart_data")) || { cart: [], checkout_cart_items: 0 };

            // Check if product already exists in cart
            let existingProduct = cartData.cart.find(item => item.product_Name === productName);
            if (existingProduct) {
                // Update existing product quantity & price
                existingProduct.quantity += productQuantity;
                existingProduct.price = (existingProduct.quantity * (productPrice / productQuantity)).toFixed(2);
            } else {
                // Add new product with correct price & quantity
                cartData.cart.push({
                    product_Name: productName,
                    image: productImage,
                    quantity: productQuantity,
                    price: (productPrice).toFixed(2) 
                });
            }

            // Update cart count
            cartData.checkout_cart_items += productQuantity;

            // Save updated cart data
            localStorage.setItem("cart_data", JSON.stringify(cartData));
        });
    });

    // Track Package Functionality
    document.querySelectorAll(".track_package").forEach(button => {
        button.addEventListener("click", function () {
            const productElement = this.closest(".order_item");
            const trackedProduct = {
                product_Name: productElement.querySelector(".order_name").textContent,
                image: productElement.querySelector(".order_image").src,
                quantity: parseInt(productElement.querySelector(".order_quantity").textContent.split(":")[1].trim()),
                price: productElement.querySelector(".order_price").textContent.split("$")[1].trim(),
            };

            localStorage.setItem("tracked_product", JSON.stringify(trackedProduct));
            window.location.href = "Track.html"; // Redirect to tracking page
        });
    });
});
