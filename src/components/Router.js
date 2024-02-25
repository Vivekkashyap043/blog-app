import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './root/Root';
import Home from './home/Home';
import Login from './login/Login';
import Register from './register/Register';

function Router() {
    let router=createBrowserRouter([
        {
            path:"",
            element:<Root />,
            children:[
                {
                    path:"",
                    element:<Home />,
                },
                {
                    path:"signin",
                    element:<Login />,
                },
                {
                    path:"signup",
                    element:<Register />
                }
            ]
        }
    ])
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}

export default Router
