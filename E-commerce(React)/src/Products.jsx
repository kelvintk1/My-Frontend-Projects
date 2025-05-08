// Products.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './Home/Header';
import Allmen_products from './Product/Allmen_products';
import Allladies_products from './Product/Allladies_products';

function Products({ addToCart, gender, cartCount, profileImage }) {
  const [searchParams] = useSearchParams();
  const currentGender = gender || searchParams.get('gender') || 'men';
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get search query from URL parameters
  useEffect(() => {
    const queryParam = searchParams.get('query') || '';
    setSearchQuery(queryParam);
  }, [searchParams]);
  
  // Handle search from header
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Header 
        cartCount={cartCount} 
        category={category} 
        setCategory={setCategory}
        onSearch={handleSearch}
        showSearch={true} 
        profileImage={profileImage}
      />
      {currentGender === 'men' && (
        <Allmen_products
          addToCart={addToCart}
          category={category}
          searchQuery={searchQuery}
        />
      )}
      {currentGender === 'ladies' && (
        <Allladies_products
          addToCart={addToCart}
          category={category}
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
}

export default Products;