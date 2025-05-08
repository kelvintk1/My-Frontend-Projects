// TrackOrder.jsx
import './TrackOrder.css'
import Header from './Home/Header'
import { useLocation } from 'react-router-dom'

function TrackOrder({cartCount, profileImage}) {
    const location = useLocation();
    const order = location.state?.order;

    if (!order) {
        return (
            <div>
                <Header hideSecondHeader={true} cartCount={cartCount} />
                <div className='track-page'>
                    <h2 style={{margin:'2rem'}}>No order to track.</h2>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header hideSecondHeader={true} cartCount={cartCount} profileImage={profileImage}/>
            <div className='track-page'>
                <h1 className='track-title'>Order Tracking</h1>
                <div className="track-order-details">
                    <p className='track-details'><strong>Order Name:</strong> {order.orderName || "My order"}</p>
                    <p className='track-details'><strong>Order Total:</strong> ${order.orderTotal.toFixed(2)}</p>
                    <ul className='track-list'>
                        {order.orderItems.map((item, i) => (
                            <li key={item.id}>
                                <img src={item.image} alt={item.name} style={{width: 100, marginRight:'20px'}} />
                                <span>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default TrackOrder;