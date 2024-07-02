
import React, { useState, useEffect } from 'react';
import './MyEvents.css';

const MyEvents = () => {
  const [username, setUsername] = useState('');
  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    mode: '',
    time: '',
    category: '',
    location: '',
    imageUrl: ''
  });
  const [alertShownForEvents, setAlertShownForEvents] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      fetchUserEvents(storedUsername);
    }
  }, []);

  useEffect(() => {
    events.forEach(event => {
      const eventDate = new Date(event.date);
      const now = new Date();
      const timeDifference = eventDate - now;

      if (
        (timeDifference <= 48 * 60 * 60 * 1000 || timeDifference <= 1 * 60 * 60 * 1000) &&
        !alertShownForEvents.includes(event._id)
      ) {
        alert(`The event "${event.title}" is approaching!`);
        setAlertShownForEvents(prev => [...prev, event._id]);
      }
    });
  }, [events, alertShownForEvents]);

  const fetchUserEvents = async (username) => {
    try {
      const response = await fetch(`https://eventapi-mr8f.onrender.com/user-events?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error('Failed to fetch user events');
      }
    } catch (error) {
      console.error('Error fetching user events:', error);
    }
  };

  const handleEditClick = (event) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().split('T')[0],
      mode: event.mode,
      time: event.time,
      category: event.category,
      location: event.location,
      imageUrl: event.imageUrl
    });
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setCurrentEvent(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, imageUrl: file });
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`https://eventapi-mr8f.onrender.com/user-events/${eventId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEvents(events.filter(event => event._id !== eventId));
        setAlertShownForEvents(alertShownForEvents.filter(id => id !== eventId));
      } else {
        console.error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      const response = await fetch(`https://eventapi-mr8f.onrender.com/user-events/${currentEvent._id}`, {
        method: 'PUT',
        body: formDataToSubmit,
      });
      if (response.ok) {
        const updatedEvent = await response.json();
        setEvents(events.map(event => (event._id === updatedEvent._id ? updatedEvent : event)));
        handleCloseEdit();
      } else {
        console.error('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className="my-events">
      <h1>My Events</h1>
      <div className="events-container">
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map(event => (
            <div key={event._id} className="event">
              <img src={`https://eventapi-mr8f.onrender.com${event.imageUrl}`} alt={event.title} />
              <h3>{event.title}</h3>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Mode:</strong> {event.mode}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <div className="event-buttons">
                <button className="edit-button" onClick={() => handleEditClick(event)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(event._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSave}>
              <label>
                Title:
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
              </label>
              <label>
                Description:
                <input type="text" name="description" value={formData.description} onChange={handleChange} />
              </label>
              <label>
                Date:
                <input type="date" name="date" value={formData.date} onChange={handleChange} />
              </label>
              <label>
                Mode:
                <input type="text" name="mode" value={formData.mode} onChange={handleChange} />
              </label>
              <label>
                Time:
                <input type="text" name="time" value={formData.time} onChange={handleChange} />
              </label>
              <label>
                Category:
                <input type="text" name="category" value={formData.category} onChange={handleChange} />
              </label>
              <label>
                Location:
                <input type="text" name="location" value={formData.location} onChange={handleChange} />
              </label>
              <label>
                Image:
                <input type="file" name="image" onChange={handleFileChange} />
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={handleCloseEdit}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyEvents;

