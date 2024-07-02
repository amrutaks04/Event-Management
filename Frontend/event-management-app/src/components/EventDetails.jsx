
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "./Header";

const EventDetails = () => {
    const { detailedEventId } = useParams();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://eventapi-mr8f.onrender.com/eventdes/${detailedEventId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event');
                }
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [detailedEventId]);

    const addToCart = async () => {
        const username = localStorage.getItem('username');
        if (!username) {
            alert('Please log in to add items to your cart.');
            return;
        }

        try {
            const response = await fetch('https://eventapi-mr8f.onrender.com/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    title: event.title,
                    category: event.category,
                    date: event.date,
                    imageUrl: event.imageUrl,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }
            alert('Event added to cart');
        } catch (error) {
            alert('Error adding to cart: ' + error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!event) {
        return <div>No event found</div>;
    }

    return (
        <>
            <Header />
            <div className="event-details">
                <div className="event-left">
                    <h1 style={{textAlign: 'center'}}>{event.title}</h1>
                    <img src={event.imageUrl} alt={event.title} className="event-image" />
                    <p><strong>Category:</strong> {event.category}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Mode:</strong> {event.mode}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>About:</strong> {event.about}</p>
                </div>
                <div className="event-right">
                    <div className="terms-and-conditions">
                        <p><strong>Terms and Conditions:</strong> {event.termsAndConditions}</p>
                    </div>
                    <button className="book-now-button" onClick={addToCart}>Add to Event Cart</button>
                </div>
            </div>
        </>
    );
};

export default EventDetails;
