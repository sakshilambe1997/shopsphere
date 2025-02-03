import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Signup from './views/Signup/Signup';
import NotFound from './views/404/404';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
   {
    path:"/",
    element:<Home/>
   },

   {
    path:"/login",
    element:<Login/>
   },

   {
    path:"/signup",
    element:<Signup/>
   },

   {
    path:"*",
    element:<NotFound/>
   },
])

root.render(
  <RouterProvider router={router}/>
);
