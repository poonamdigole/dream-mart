import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css';
import Login from './views/Login/Login';
import SignUp from './views/Signup/Signup';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <h1>Home</h1>
    },

    {
        path: '/login',
        element: <Login/>
    },
     {
        path : '/signup',
        element: <SignUp/>
     }
])

root.render(
  <RouterProvider router={router}/>
);
