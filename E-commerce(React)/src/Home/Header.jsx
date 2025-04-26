import './Header.css'
function Header(){

    return(
        <div className='header-container'>
            <div className='header-container-inner'>
                <span className='brand-container'><h1 className='brand-name'>KellyHub</h1></span>
                <span className='search-container'>
                    <input type='search' placeholder="Search" id='search'/>
                    <img src='./src/assets/search-icon.png' id='search-icon'/>
                </span>
                <span className='order-container'>
                    <p id='order'>Order</p>
                </span>
                <span className='cart-area'>
                    <span className='cart-container'>
                        <p id='cart'>Cart</p>
                        <img src='./src/assets/cart-icon.png' id='cart-img'/>
                        <p id='cart-number'>0</p>
                    </span>
                </span>
                <span className='profile-container'>
                    <img src='./src/assets/kevin.jpg' alt='profile' id='profile-img'/>
                    <p id='profile'>Account</p>
                </span>
            </div>
        </div>
    )
}
export default Header