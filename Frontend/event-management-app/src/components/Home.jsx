
import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header />
      <div className="start">
        <img src="images/events1.webp" className="img1" alt="Event" />
        <div className="quote">
          <h1 className="quote1">
            We do not remember days,<br />we remember moments
          </h1>
          <div className="buttons">
            <Link to='/dashboard'><button className="but">Go to Dashboard</button></Link>
            <Link to="/events"> <button className="but">Explore</button></Link>
          </div>
        </div>
      </div>
      <div className="middle">
        <div className="img-div">
          <img
            src="https://media.istockphoto.com/id/1380516073/photo/female-party-planner-arranging-decorations-for-a-child-birthday-party.jpg?s=612x612&w=0&k=20&c=7LWTCxgrl-8VmX8J0YToQU69_HJeBhj47ufevbxQtFU="
            id="img2"
            alt="Party Planner"
          />
        </div>
        <div className="text">
          <p>
            Welcome to EventMaster, where your dream events come to life with seamless planning and unforgettable experiences. Our app is designed to simplify every step of the event management process, whether you're organizing a corporate conference, a wedding, or a community gathering. With EventMaster, you can create events in minutes using our intuitive interface.
          </p>
          <Link to='/dashboard'><button className="but">Go to Dashboard</button></Link>
        </div>
      </div>
      <div className="last-before">
        <h1>A Complete Event Management Solution</h1>
        <div className="img-slider">
          <div className="images">
            <img src="images/pic1.jpg" alt="Slide 1" />
            <img src="images/pic2.jpg" alt="Slide 2" />
            <img src="images/pic3.jpg" alt="Slide 3" />
            <img src="images/pic4.png" alt="Slide 4" />
            <img src="images/pic5.jpg" alt="Slide 5" />
            <img src="images/pic6.jpg" alt="Slide 6" />
            <img src="images/pic7.jpg" alt="Slide 7" />
            {/* <img src="https://www.eventbrite.co.uk/blog/wp-content/uploads/2022/06/Your-Complete-Guide-to-Break-Into-the-Event-Planning-Business-768x348.jpg" alt="Slide 8" /> */}
          </div>
        </div>
      </div>
      <div className="last">
        <div className="buttons">
          <Link to='/dashboard'><button className="but">Go to Dashboard</button></Link>
          <Link to="/events"> <button className="but">Explore</button></Link>
        </div>
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

export default Home;

