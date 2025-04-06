// cart_data.js

const data = {
    checkout_cart_items: 0,
    cart: []
};

export function saveToLocalStorage() {
    localStorage.setItem('cart_data', JSON.stringify(data));
}

export function loadFromLocalStorage() {
    const savedData = localStorage.getItem('cart_data');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        data.checkout_cart_items = parsedData.checkout_cart_items || 0;
        data.cart = parsedData.cart || [];
    }
}

export default data;
