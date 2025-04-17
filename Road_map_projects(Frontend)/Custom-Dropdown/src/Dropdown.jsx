import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css'; // We'll create this CSS file

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);

  const options = [
    'First Item',
    'Second Item',
    'Third Item',
    'Fourth Item',
    'Fifth Item'
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div 
        className={`dropdown-header ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
      >
        <span className="selected-value">
          {selectedItem || 'Select an item'}
        </span>
        <span className="dropdown-icon">
          {isOpen ? '∧' : '∨'}
        </span>
      </div>

      {isOpen && (
        <div className="dropdown-list">
          {options.map((item) => (
            <div
              key={item}
              className={`dropdown-item ${selectedItem === item ? 'selected' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              {item}
              {selectedItem === item && <span className="checkmark">✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;