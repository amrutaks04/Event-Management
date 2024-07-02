


import React, { useEffect, useState } from 'react';


const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alertShownForEvents, setAlertShownForEvents] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            setError(null);

            const username = localStorage.getItem('username');

            if (!username) {
                setError('User not logged in');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`https://eventapi-mr8f.onrender.com/getcart?username=${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }
                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        cartItems.forEach(item => {
            const eventDate = new Date(item.date);
            const now = new Date();
            const timeDifference = eventDate - now;

            if (
                (timeDifference <= 48 * 60 * 60 * 1000 || timeDifference <= 1 * 60 * 60 * 1000) &&
                !alertShownForEvents.includes(item._id)
            ) {
                alert(`The event "${item.title}" is approaching!`);
                setAlertShownForEvents(prev => [...prev, item._id]);
            }
        });
    }, [cartItems, alertShownForEvents]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (cartItems.length === 0) {
        return <div>No items in cart</div>;
    }

    return (
        <div className="cart">
            <h1>My Cart</h1>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={item._id} className="cart-item">
                        <img src={item.imageUrl.startsWith('http') ? item.imageUrl : `https://eventapi-mr8f.onrender.com${item.imageUrl}`} alt={item.title} className="cart-item-image" />
                        <div className="cart-item-info">
                            <h2>{item.title}</h2>
                            <p>{new Date(item.date).toLocaleDateString()}</p>
                            <p>{item.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;
