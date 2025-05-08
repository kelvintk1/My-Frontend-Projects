// Checkout.jsx
import './Checkout.css';
import Header from './Home/Header.jsx';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Checkout({ cartItems, updateCartItem, removeFromCart, clearCart, addOrder, cartCount, profileImage }) {
    const [editingId, setEditingId] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [orderName, setOrderName] = useState('');
    const navigate = useNavigate();

    const calculateOrderSummary = () => {
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1;
        const delivery = subtotal > 0 ? 5.99 : 0;
        const total = subtotal + tax + delivery;
        return { subtotal, tax, delivery, total };
    };

    const orderSummary = calculateOrderSummary();

    const handleEditClick = (id, currentQuantity) => {
        setEditingId(id);
        setQuantity(currentQuantity);
    };

    const handleInputChange = (e) => {
        setQuantity(Math.max(1, Number(e.target.value)));
    };

    const handleSaveClick = (id) => {
        updateCartItem(id, quantity);
        setEditingId(null);
    };

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) return;
        const order = {
            orderItems: cartItems,
            orderTotal: orderSummary.total,
            orderName: orderName || "My order",
            orderDate: new Date()
        };
        addOrder(order);
        clearCart();
        navigate("/order");
    };

    return (
        <div className='checkout-main-page'>
            <Header hideSecondHeader={true} cartCount={cartCount} profileImage={profileImage}/>
            <div className='checkout-page'>
                <div className='checkout-items'>
                    <div className='back-container'>
                        <span className='back-images'>
                            <Link to='/products/men'><img src='/src/assets/male_icon.png' className='male-icon' alt="Men"/></Link>
                            <Link to='/products/ladies'><img src='/src/assets/female_icon.png' className='male-icon' alt="Ladies"/></Link>
                        </span>
                        <h1 className='back'>🔙</h1>
                    </div>
                    <h1 className='list-name'>Checkout items ({cartItems.length})</h1>
                    <div className='checkout-list'>
                        {cartItems.length === 0 ? (
                            <p className='empty-cart'>Your cart is empty</p>
                        ) : (
                            cartItems.map(item => (
                                <div className='list-container' key={item.id}>
                                    <span className='list-image-container'>
                                        <img src={item.image} className='list-image' alt={item.name}/>
                                    </span>
                                    <span className='list-product-details'>
                                        <p>{item.name}</p>
                                        <p>${item.price.toFixed(2)}</p>
                                        <span className='list-product-quantity-container'>
                                            <p>Quantity: </p>
                                            {editingId !== item.id ? (
                                                <p className='quantity-number'>{item.quantity}</p>
                                            ) : (
                                                <input
                                                    type='number'
                                                    className='list-product-quantity'
                                                    value={quantity}
                                                    min={1}
                                                    onChange={handleInputChange}
                                                />
                                            )}
                                        </span>
                                        <span className='edit-buttons-container'>
                                            {editingId !== item.id ? (
                                                <>
                                                    <button 
                                                        className='edit-buttons' 
                                                        onClick={() => handleEditClick(item.id, item.quantity)}
                                                    >
                                                        Update
                                                    </button>
                                                    <button 
                                                        className='edit-buttons remove'
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </>
                                            ) : (
                                                <button 
                                                    className='edit-buttons' 
                                                    onClick={() => handleSaveClick(item.id)}
                                                >
                                                    Save
                                                </button>
                                            )}
                                        </span>
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className='checkout-pricing'>
                    <div className='order-name-container'>
                        <h2 className='order-name-label'>Order Name:</h2>
                        <input 
                            type='text' 
                            placeholder='Give your order a name' 
                            className='order-name'
                            value={orderName}
                            onChange={e => setOrderName(e.target.value)}
                        />
                    </div>
                    <div className='pricing-container'>
                        <h1 className='title'>Order Summary</h1>
                        <span className='item-pricing'>
                            <p>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}):</p>
                            <p>${orderSummary.subtotal.toFixed(2)}</p>
                        </span>
                        <span className='item-pricing'>
                            <p>Delivery Fee:</p>
                            <p>${orderSummary.delivery.toFixed(2)}</p>
                        </span>
                        <span className='item-pricing'>
                            <p>Tax (10%):</p>
                            <p>${orderSummary.tax.toFixed(2)}</p>
                        </span>
                        <span className='order-total'>
                            <p>Order Total:</p>
                            <p>${orderSummary.total.toFixed(2)}</p>
                        </span>
                        <button 
                            className='place-order-button'
                            disabled={cartItems.length === 0}
                            onClick={handlePlaceOrder}
                        >
                            📋Place Order🛒
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Checkout;