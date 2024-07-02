

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createEvent.css';

const categories = ["All", "Music", "Games", "Sports", "Arts", "Film", "Literature", "Technology", "Culture", "Lifestyle", "Charity", "Fashion", "Kids", "Other"];

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [mode, setMode] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('username', localStorage.getItem('username'));
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('mode', mode);
    formData.append('time', time);
    formData.append('category', category);
    formData.append('location', location);
    formData.append('image', image);

    try {
      const response = await fetch('https://eventapi-mr8f.onrender.com/add-user-event', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Event created successfully');
        navigate('/myevent');
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="create-event-overlay">
          <div className="create-event">
            <h2>Create Event</h2>
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <label>
                  Title:
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>
                  Description:
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <label>
                  Date:
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>    
                <label>
                  Mode (Offline/Online):
                  <input type="text" value={mode} onChange={(e) => setMode(e.target.value)} required />
                </label>
                <label>
                  Time:
                  <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </label>
                <label>
                  Category:
                  <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select Category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Location:
                  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </label>
                <label>
                  Image:
                  <input type="file" onChange={handleImageChange} accept="image/*" required />
                </label>
                <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
                <button type="button" onClick={closeModal}>Close</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateEvent;
