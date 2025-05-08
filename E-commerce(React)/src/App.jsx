import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Slideshow from './Slideshow';
import Register from './Register';
import Login from './Login';
import Verify from './Verify';
import Home from './Home';
import Products from './Products';
import Checkout from './Checkout';
import Order from './Order';
import TrackOrder from './TrackOrder';
import Account from './Account';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileImage, setProfileImage] = useState('https://cdn-icons-png.flaticon.com/512/3135/3135715.png');

  // Load all data from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
    const savedProfileImage = localStorage.getItem('profileImage') || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
    setProfileImage(savedProfileImage);
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('profileImage', profileImage);
  }, [profileImage]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const updateCartItem = (id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const addOrder = (order) => setOrders(prev => [...prev, order]);

  const clearOrders = () => setOrders([]);

  const updateProfileImage = (newImage) => {
    setProfileImage(newImage);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Slideshow cartCount={cartCount} profileImage={profileImage} />} />
          <Route path="/login" element={<Login cartCount={cartCount} profileImage={profileImage} />} />
          <Route path="/register" element={<Register cartCount={cartCount} profileImage={profileImage} />} />
          <Route path="/verify" element={<Verify cartCount={cartCount} profileImage={profileImage} />} />
          <Route path="/home" element={<Home cartCount={cartCount} profileImage={profileImage} />} />
          <Route 
            path="/account" 
            element={
              <Account 
                cartCount={cartCount} 
                profileImage={profileImage}
                updateProfileImage={updateProfileImage}
              />
            } 
          />
          <Route path="/order" element={<Order cartCount={cartCount} orders={orders} clearOrders={clearOrders} profileImage={profileImage} />} />
          <Route path="/trackOrder" element={<TrackOrder cartCount={cartCount} profileImage={profileImage} />} />
          <Route 
            path="/checkout" 
            element={
              <Checkout 
                cartItems={cartItems}
                updateCartItem={updateCartItem}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                addOrder={addOrder}
                cartCount={cartCount}
                profileImage={profileImage}
              />
            } 
          />
          <Route 
            path="/products/men" 
            element={
              <Products 
                gender="men" 
                addToCart={addToCart}
                searchQuery={searchQuery}
                cartCount={cartCount}
                profileImage={profileImage}
              />
            } 
          />
          <Route 
            path="/products/ladies" 
            element={
              <Products 
                gender="ladies" 
                addToCart={addToCart}
                searchQuery={searchQuery}
                cartCount={cartCount}
                profileImage={profileImage}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;