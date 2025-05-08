// * ========= Product/Allmen_products.jsx ========= */

import React, { useState, useEffect, useRef } from 'react';
import './Allmen_products.css';
import { products } from './productData';

function Allmen_products({ addToCart, category, searchQuery }) {
  const [quantities, setQuantities] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const [highlightedProductId, setHighlightedProductId] = useState(null);
  
  // Create refs for each product
  const productRefs = useRef({});

  // Filter products by category and search query
  const filteredProducts = (category === 'all' 
    ? products.men 
    : products.men.filter(product => product.category === category)
  ).filter(product => 
    product.name.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  // Handle scrolling to product when search query changes
  useEffect(() => {
    if (searchQuery && filteredProducts.length > 0) {
      const matchingProduct = filteredProducts.find(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (matchingProduct && productRefs.current[matchingProduct.id]) {
        // Scroll to the matching product with smooth behavior
        productRefs.current[matchingProduct.id].scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        
        // Highlight the product
        setHighlightedProductId(matchingProduct.id);
        
        // Remove highlight after 3 seconds
        const timer = setTimeout(() => {
          setHighlightedProductId(null);
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [searchQuery, filteredProducts]);
  
  const handleQuantityChange = (id, e) => {
    const value = e.target.value;
    setQuantities(prev => ({
      ...prev,
      [id]: value === "" ? "" : Math.max(1, Number(value))
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = Number(quantities[product.id]) || 1;
    addToCart(product, quantity);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedItems(prev => ({ ...prev, [product.id]: false })), 2000);
  };

  return (
    <div className="products-container">
      {filteredProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        filteredProducts.map(product => (
          <div 
            className={`product-card ${highlightedProductId === product.id ? 'highlighted-product' : ''}`} 
            key={product.id}
            ref={el => productRefs.current[product.id] = el}
          >
            <div className="image-container">
              <img 
                src={product.image} 
                className="product-image" 
                alt={product.name} 
              />
            </div>
            <div className="products-details">
              <div className='product-name'>{product.name}</div>
              <div className='pro-detailed'>
                <div className='product-price'>${product.price.toFixed(2)}</div>
                <input
                  type='number'
                  value={quantities[product.id] || 1}
                  min={1}
                  onChange={(e) => handleQuantityChange(product.id, e)}
                  className='product-quantity'
                />
              </div>
            </div>
            <div className='add-button-container'>
              <button 
                className={`add-button ${addedItems[product.id] ? 'added' : ''}`}
                onClick={() => handleAddToCart(product)}
              >
                {addedItems[product.id] ? 'Added👍' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Allmen_products;