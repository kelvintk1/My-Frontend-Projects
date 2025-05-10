import './Header.css';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import your assets
import searchIcon from '/assets/search-icon.png';
import orderIcon from '/assets/order.png';
import cartIcon from '/assets/cart-icon.png';
import checkoutIcon from '/assets/checkout.png';
import menuIcon from '/assets/menu.png';
import dropdownMenuIcon from '/assets/dropdown-menu.png';
import allIcon from '/assets/all-bag.png';
import clothingIcon from '/assets/clothing.png';
import accessoryIcon from '/assets/accessory_2.png';
import footwearIcon from '/assets/footwear_1.png';
import electronicsIcon from '/assets/electronics.png';
import vehiclesIcon from '/assets/vehicles.png';
import mallIcon from '/assets/mall.png';


const categories = [
    { name: 'All', icon: allIcon, category: 'all' },
    { name: 'Clothing', icon: clothingIcon, category: 'clothing' },
    { name: 'Accessories', icon: accessoryIcon, category: 'accessories' },
    { name: 'Footwear', icon: footwearIcon, category: 'footwear' },
    { name: 'Electronics', icon: electronicsIcon, category: 'electronics' },
    { name: 'Vehicles', icon: vehiclesIcon, category: 'vehicles' },
];

function Header({ cartCount = 0, category, setCategory, hideSecondHeader, onSearch, profileImage }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Refs for menu containers
    const menuRef = useRef(null);
    const categoryDropdownRef = useRef(null);
    const hamburgerBtnRef = useRef(null);
    const categoryBtnRef = useRef(null);

    // Close menus when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                isMenuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                hamburgerBtnRef.current &&
                !hamburgerBtnRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
            if (
                isCategoryDropdownOpen &&
                categoryDropdownRef.current &&
                !categoryDropdownRef.current.contains(event.target) &&
                categoryBtnRef.current &&
                !categoryBtnRef.current.contains(event.target)
            ) {
                setIsCategoryDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen, isCategoryDropdownOpen]);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => {
            if (!prev) setIsCategoryDropdownOpen(false);
            return !prev;
        });
    };

    const toggleCategoryDropdown = () => {
        setIsCategoryDropdownOpen((prev) => {
            if (!prev) setIsMenuOpen(false);
            return !prev;
        });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        const menKeywords = ['men', 'man', 'male', 'boy', 'guys'];
        const ladiesKeywords = ['women', 'woman', 'female', 'girl', 'ladies', 'lady'];

        const lowerQuery = searchQuery.toLowerCase();
        let detectedGender = null;

        for (const keyword of menKeywords) {
            if (lowerQuery.includes(keyword)) {
                detectedGender = 'men';
                break;
            }
        }

        if (!detectedGender) {
            for (const keyword of ladiesKeywords) {
                if (lowerQuery.includes(keyword)) {
                    detectedGender = 'ladies';
                    break;
                }
            }
        }

        if (onSearch) {
            onSearch(searchQuery);
        } else {
            const searchParams = new URLSearchParams();
            searchParams.append('query', searchQuery);
            
            if (detectedGender) {
                searchParams.append('gender', detectedGender);
                navigate(`/products?${searchParams.toString()}`);
            } else {
                searchParams.append('gender', 'men');
                navigate(`/products?${searchParams.toString()}`);
            }
        }
    };

    return (
        <div className='header-page'>
            <div className='header-container'>
                <div className='header-container-inner'>
                    <span className='brand-container'>
                        <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h1 className='brand-name'>KellyHub</h1>
                        </Link>
                    </span>
                    
                    <form className='search-container' onSubmit={handleSearchSubmit}>
                        <input 
                            type='search' 
                            placeholder="Search" 
                            id='search'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button type="submit" id='search-icon'>
                            <img src={searchIcon} alt="Search" className='search-img' />
                        </button>
                    </form>
                    
                    <Link to='/order'>
                        <span className='order-container'>
                            <img src={orderIcon} id='order-img' alt="Order"/>
                            <p id='order'>Order</p>
                        </span>
                    </Link>
                    
                    <span className='cart-area'>
                        <span className='cart-container'>
                            <p id='cart'>Cart</p>
                            <img src={cartIcon} id='cart-img' alt="Cart"/>
                            <p id='cart-number'>{cartCount}</p>
                        </span>
                    </span>
                    
                    <span className='profile-container'>
                        <Link to='/checkout'>
                            <img src={checkoutIcon} alt='Checkout' id='profile-img'/>
                            <p id='profile'>Checkout</p>
                        </Link>
                    </span>
                    
                    <Link to='/account' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span className='profile-container'>
                            <img src={profileImage} alt='Profile' id='profile-img'/>
                            <p id='profile'>Account</p>
                        </span>
                    </Link>
                    <span className='hamburger-container' ref={hamburgerBtnRef}>
                        <img 
                            src={menuIcon}
                            id='menu' 
                            onClick={toggleMenu}
                            alt="Menu"
                        />
                    </span>
                </div>
            </div>
            
            {isMenuOpen && (
                <div className="dropdown-menu show" ref={menuRef}>
                    <ul>
                        <Link to='/home'><li onClick={() => setIsMenuOpen(false)}>Home</li></Link>
                        <Link to='/checkout'><li onClick={() => setIsMenuOpen(false)}>Checkout</li></Link>
                        <Link to='/order'><li onClick={() => setIsMenuOpen(false)}>Orders</li></Link>
                        <Link to='/account'><li onClick={() => setIsMenuOpen(false)}>Account</li></Link>
                    </ul>
                </div>
            )}

            {!hideSecondHeader && (
                <div className='second-header'>
                    <span className='dropdown-menu-container' ref={categoryBtnRef}>
                        <img 
                            src={dropdownMenuIcon}
                            id='dropdown-menu-img' 
                            className={isCategoryDropdownOpen ? 'rotated' : '' }
                            onClick={toggleCategoryDropdown}
                            alt="Dropdown Menu"
                        />
                        {isCategoryDropdownOpen && (
                            <div className="category-dropdown-menu" ref={categoryDropdownRef}>
                                <ul>
                                    {categories.map(cat => (
                                        <li
                                          key={cat.category}
                                          onClick={() => {
                                            setCategory && setCategory(cat.category);
                                            setIsCategoryDropdownOpen(false);
                                            setIsMenuOpen(false);
                                          }}
                                          className={category === cat.category ? 'active-category' : ''}
                                        >
                                            <img src={cat.icon} className='item-img' alt={cat.name}/>
                                            <p className='item-types'>{cat.name}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </span>
                    {categories.map(cat => (
                    <span
                        className={'fashion' + (category === cat.category ? ' active-category' : '')}
                        key={cat.category}
                        onClick={() => setCategory && setCategory(cat.category)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={cat.icon} className='fashion-img' alt={cat.name}/>
                        <p className='fashion-types'>{cat.name}</p>
                    </span>
                    ))}
                    <span className='mall-container'>
                        <img src={mallIcon} className='mall-img' alt="Mall"/>
                    </span>
                </div>
            )}
        </div>
    );
}

export default Header;