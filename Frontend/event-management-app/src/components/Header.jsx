// import {Link} from 'react-router-dom'
// const Header=()=>{
// return(
//     <>
//     <div className='head'>
//     <div id='outer'>
//         <p>Event Master</p>
//     </div>
//     <div id='inner'>
//         <ul>
//             <li><Link to='/home'>Home</Link></li>
//             <li><Link to='/events'>Events</Link></li>
//             <li><Link to='/dashboard'>Dashboard</Link></li>
//             <li><Link to='/login'>Login</Link></li>
// </ul>
//     </div>
//     </div>
 
//     </>
// )
// }
// export default Header;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    setIsLoggedIn(!!username);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      <div className='head'>
        <div id='outer'>
          <p>Event Master</p>
        </div>
        <div id='inner'>
          <ul>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/events'>Events</Link></li>
            <li><Link to='/dashboard'>Dashboard</Link></li>
            {isLoggedIn ? (
              <li><Link to='#' onClick={handleLogout}>Logout</Link></li>
            ) : (
              <li><Link to='/login'>Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
