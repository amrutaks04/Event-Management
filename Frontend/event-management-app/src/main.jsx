import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import Event from './components/Event';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import EventDetails from './components/EventDetails';
import Cart from './components/Cart';
import Home from './components/Home';
import CreateEvent from './components/CreateEvent';
import MyEvents from './components/MyEvents';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/events",
    element: <Event />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/eventdes/:detailedEventId",
    element: <EventDetails />,
},
{
  path:"/cart",
  element:<Cart/>
},  {
  path: "/create-event",
  element: <CreateEvent />,
},{
  path: "/myevent",
  element: <MyEvents/>,
}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
