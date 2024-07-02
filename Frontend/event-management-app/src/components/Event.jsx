import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "./Header";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [category, setCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchEvents() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://eventbackend-1.onrender.com/req-event?category=${category}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, [category]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const categories = ["All", "Music", "Games", "Sports", "Arts", "Film", "Literature", "Technology", "Culture", "Lifestyle", "Charity", "Fashion", "Kids", "Other"];

    return (
        <>
        <Header/>
            <div className="all-events">
                <h1>Explore the best events happening around you</h1>
                <div className="categories">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`category-button ${category === cat.toLowerCase() ? 'active' : ''}`}
                            onClick={() => setCategory(cat.toLowerCase() === "all" ? '' : cat.toLowerCase())}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className='search-bar'>
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                {loading && <p>Loading events...</p>}
                {error && <p className="error-message">Error: {error}</p>}
                <div className="event-list">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
                            <div key={event._id} className="event-item">
                                <div className="event-image-container">
                                    <img src={event.imageUrl} alt={event.title} className="event-image" />
                                    <div className="event-category">{event.category}</div>
                                    <div className="event-date">{new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                                </div>
                                <div className="event-info">
                                    <h2>{event.title}</h2>                                
                                    {console.log(typeof event.detailedEventId._id)} 
                                    <Link to={`/eventdes/${event.detailedEventId._id}`}>View Details</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No events found.</p>
                    )}
                </div>
            </div>
             <div className="last"> 
        <div className="logo-div">
          <img src='https://seeklogo.com/images/I/instagram-logo-1494D6FE63-seeklogo.com.png' alt="Instagram" />
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqz0aID6B-InxK_03P7tCtqpXNXdawBcro67CyEE0I5g&s' alt="GitHub" />
          <img src='https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg' alt="Twitter" />
        </div>
        <p>© Event Master | All rights reserved | Amruta</p>
      </div>
        </>
    );
};

export default Events;

