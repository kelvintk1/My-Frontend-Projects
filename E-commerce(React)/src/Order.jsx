// Order.jsx
import './Order.css';
import Header from "./Home/Header";
import { useNavigate } from 'react-router-dom';

// Helper for formatting order date
function formatDateTime(dateObj) {
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return {date, time};
}

function Order({ cartCount, orders, clearOrders, profileImage }) {
    const navigate = useNavigate();

    if (!orders || orders.length === 0) {
        return (
            <>
                <Header hideSecondHeader={true} cartCount={cartCount} profileImage={profileImage}/>
                <div className='order-page'>
                    <h1 className='ur-orders'>Your Orders</h1>
                    <button className='clear-btn' disabled>Clear</button>
                    <p style={{margin:'2rem', color:'white', fontSize:'large'}}>No orders yet. Place an order to see it here.</p>
                </div>
            </>
        );
    }

    // Show most recent first
    const orderList = [...orders].reverse();

    // New: Clear button handler
    const handleClearOrders = () => {
        if(window.confirm("Are you sure you want to clear all orders?")){
            clearOrders();
            localStorage.removeItem('orders');
        }
    };

    return (
        <>
        <Header hideSecondHeader={true} cartCount={cartCount} profileImage={profileImage}/>
        <div className='order-page'>
            <h1 className='ur-orders'>Your Orders</h1>
            <button className='clear-btn' onClick={handleClearOrders}>Clear</button>
            <div className='orders-container'>
                {orderList.map((order, index) => {
                    const items = order.orderItems;
                    let previewImages = [];
                    if (items.length === 1) {
                        previewImages = [items[0].image];
                    } else if (items.length === 2) {
                        previewImages = [items[0].image, items[1].image];
                    } else if (items.length > 2) {
                        previewImages = [items[0].image, items[1].image, items[items.length-1].image];
                    }
                    const orderId = order.orderId || (order.orderDate && new Date(order.orderDate).valueOf()) || (index+1);
                    const { date, time } = formatDateTime(new Date(order.orderDate || Date.now()));
                    let sectionClass = '';
                    if (items.length === 1) sectionClass = 'order-section_1';
                    else if (items.length === 2) sectionClass = 'order-section_2';
                    else sectionClass = 'order-section_3';

                    function handleTrackPackage() {
                        navigate('/trackOrder', { state: { order } });
                    }

                    return (
                        <div className={sectionClass} key={orderId + '-' + index}>
                            <span className={
                                items.length === 1 ? 'order-image-container' :
                                items.length === 2 ? 'order-image-container_2' :
                                'order-image-container_3'
                            }>
                                {previewImages.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        className={
                                            items.length === 1
                                            ? 'order-rep-cover-img'
                                            : items.length === 2
                                            ? 'order-rep-cover-img_2'
                                            : 'order-rep-cover-img_3'
                                        }
                                        alt='order-rep-cover-image'
                                    />
                                ))}
                            </span>
                            <span className={
                                items.length === 1 ? 'ordered-details' :
                                items.length === 2 ? 'ordered-details_2' :
                                'ordered-details_3'
                            }>
                                <p>Order Name: {order.orderName || 'My order'}</p>
                                <p>Order Id: {orderId}</p>
                                <p>Ordered Date: {date}</p>
                                <p>Ordered Time: {time}</p>
                            </span>
                            <span className='track-btn-container' onClick={handleTrackPackage}>
                                <button className='track-btn'>
                                    <p className='track-name-btn'>Track Package</p>
                                    <img src='./assets/bag_icon.png' className='bag_icon' alt="Bag" />
                                </button>
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    );
}

export default Order;