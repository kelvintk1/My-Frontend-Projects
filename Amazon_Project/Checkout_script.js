import data from "./cart_data.js";

// Load data from localStorage using the correct key
const storedData = JSON.parse(localStorage.getItem('cart_data'));
if (storedData) {
    data.cart = storedData.cart.filter(item => item !== null); // Filter nulls
    data.checkout_cart_items = storedData.checkout_cart_items;
}

function saveCart() {
    localStorage.setItem('cart_data', JSON.stringify(data));
}

function renderCart() {
    let totalItems_amount = 0;
    for (let item of data.cart) {
        if (item) {
            totalItems_amount += Number(item.price);
        }
    }

    const shipping_handling_amount = 0;
    const totalAmount_beforeTax = (totalItems_amount + shipping_handling_amount).toFixed(2);
    const estimated_tax = (0.1 * totalAmount_beforeTax).toFixed(2);
    const orderTotal = (Number(estimated_tax) + Number(totalAmount_beforeTax)).toFixed(2);

    document.querySelector(".checkout_items").textContent = `CHECKOUT (${data.checkout_cart_items} items)`;

    let Checkout_html = `
        <div class="order_review">
            <h2 class="orderS">Order Summary</h2>
            <div class="order_summary">
                <span>
                    <p class="checkout_cart_items_num">Items (${data.checkout_cart_items})</p>
                    <p class="cart_items_amount">$${totalItems_amount.toFixed(2)}</p>
                </span>
                <span>
                    <p>Shipping & Handling :</p>
                    <p class="line">$${shipping_handling_amount.toFixed(2)}</p>
                </span>
                <span>
                    <p>Total Before Tax:</p>
                    <p>$${totalAmount_beforeTax}</p>
                </span>
                <span class="line">
                    <p>Estimated Tax (10%):</p>
                    <p>$${estimated_tax}</p>
                </span>
                <span class="total">
                    <h3>Order Total:</h3>
                    <h3>$${orderTotal}</h3>
                </span> 
            </div>
            <a href="Order.html" class="viewProducts_link">
                <button class="place_order" ${data.checkout_cart_items === 0 ? 'disabled' : ''}>
                    Place Your Order
                </button>
            </a>
        </div>
    `;
    document.querySelector('.Review').innerHTML = Checkout_html;

    let selectedProducts_html = "";

    if (data.checkout_cart_items === 0) {
        selectedProducts_html = `
        <h2>Your cart is empty</h2>
        <div>
            <button class="ViewProduct"><a class="viewProducts_link" href="Amazon.html">View Products</a></button>
        </div>
        `;
    } else {
        for (let index in data.cart) {
            const item = data.cart[index];
            if (!item) continue;
            selectedProducts_html += `
                <h1 class="delivery_date"></h1>
                <div class="product_details">
                    <div class="selectedProducts_image">
                        <img src="${item.image}" class="selectedImage">
                    </div>
                    <div class="selectedProducts_info">
                        <span class="selectedProducts_name">${item.product_Name}</span>
                        <span class="selectedProducts_price">$${item.price}</span>
                        <span class="selectedProducts_quantity">
                            Quantity:
                            <input type="number" class="quantity_input" value="${item.quantity}" min="1" disabled>
                        </span>
                        <span class="selectedProducts_buttons">
                            <button class="buttons_config_update" data-product-id="${index}">Update</button>
                            <button class="buttons_config_delete" data-product-id="${index}">Delete</button>
                        </span>
                    </div>
                </div>
            `;
        }
    }
    document.querySelector(".selectedProdcuts").innerHTML = selectedProducts_html;

    // DELETE BUTTONS
    document.querySelectorAll('.buttons_config_delete').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            if (data.cart[productId]) {
                data.checkout_cart_items -= data.cart[productId].quantity;
                delete data.cart[productId];
                data.cart = data.cart.filter(item => item !== null); // Clean nulls after delete
                saveCart();
                renderCart();
            }
        });
    });

    // UPDATE BUTTONS
    document.querySelectorAll('.buttons_config_update').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            const item = data.cart[productId];
            if (!item) return;

            const quantityInput = this.closest('.product_details').querySelector('.quantity_input');

            if (quantityInput.disabled) {
                quantityInput.disabled = false;
                quantityInput.focus();
                this.textContent = "Save";
            } else {
                const newQuantity = parseInt(quantityInput.value);
                if (newQuantity >= 1) {
                    const unitPrice = item.price / item.quantity;
                    item.quantity = newQuantity;
                    item.price = (unitPrice * newQuantity).toFixed(2);
                    saveCart();
                    renderCart();
                } else {
                    alert("Quantity must be at least 1.");
                }
            }
        });
    });
}

// Buy Again functionality
function buyAgain(order) {
    data.cart = order.items.map(item => ({
        ...item,
        price: (item.price / item.quantity * item.quantity).toFixed(2)
    }));
    data.checkout_cart_items = data.cart.reduce((sum, item) => sum + item.quantity, 0);
    saveCart();
    renderCart();
}

// Initial render
renderCart();

// Handle Buy Again from Order Page
const orderData = JSON.parse(localStorage.getItem('buy_again_order'));
if (orderData) {
    buyAgain(orderData);
    localStorage.removeItem('buy_again_order');
}

// Place Order button click handler
document.querySelector('.Review').addEventListener('click', (e) => {
    if (e.target.classList.contains('place_order') && data.checkout_cart_items > 0) {
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        const newOrder = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            items: [...data.cart],
            total: data.cart.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2)
        };
        existingOrders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(existingOrders));
        data.cart = [];
        data.checkout_cart_items = 0;
        saveCart();
        window.location.href = 'Order.html';
    }
});
