import React from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Root from './root/Root';
import Home from './home/Home';
import Login from './login/Login';
import Register from './register/Register';
import UserProfile from './user-profile/UserProfile'
import AuthorProfile from './author-profile/AuthorProfile'
import AddArticle from './add-article/AddArticle';
import Articles from './articles/Articles';

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
                    path:"login",
                    element:<Login />,
                },
                {
                    path:"register",
                    element:<Register />
                },
                {
                    path:"/user-profile",
                    element:<UserProfile/>,
                    // children:[
                    //   {
                    //     path:"articles",
                    //     element:<Articles />
                    //   },
                    //   {
                    //     path:"article/:articleId",
                    //     element:<Article />
                    //   },
                    //   {
                    //     path:'',
                    //     element:<Navigate to='articles' />
                    //   }
                    // ]
                  },
                  {
                    path:"/author-profile",
                    element:<AuthorProfile />,
                    children:[
                      {
                        path:'new-article',
                        element:<AddArticle />
                      },
                    //   {
                    //     path:'articles-by-author/:author',
                    //     element:<ArticlesByAuthor />,
                       
                    //   },
                      {
                        path:"article/:articleId",
                        element:<Articles />
                      },
                    ]
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
