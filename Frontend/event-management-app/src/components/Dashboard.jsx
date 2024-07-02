
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import CreateEvent from './CreateEvent';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleCreateEvent = () => {
    setShowCreateEvent(true);
  };

  return (
    <>
      <div className="dashboard">
        <div className="sidebar">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/cart">Event Cart</Link></li>
            <li><Link to="/myevent">My Events</Link></li>
          </ul>
        </div>
        <div className="content">
          <h1>Dashboard Content</h1>
          <p>Select a link from the sidebar to view the content.</p>
        </div>
        {username && (
          <div className="username-display">
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXBI4OyBdatLrVutR2Ku7CXGTVb5MOq5BBQA&s' alt="User Icon" />
            {username}
          </div>
        )}
        <button className="create-button" onClick={handleCreateEvent}>+ Create</button>
      </div>
      {showCreateEvent && <CreateEvent />} 
    </>
  );
}

export default Dashboard;