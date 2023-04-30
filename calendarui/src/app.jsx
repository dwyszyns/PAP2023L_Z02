import { hot } from 'react-hot-loader';
import React from 'react';
import './app.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Main from './main/main';
import MemberProfile from './member/member-profile';
import Login from './auth/login';
import Logout from './auth/logout';
import Register from './auth/register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '',
        element: <Navigate to="login" />,
      },
      {
        path: 'member/:memberId',
        element: <MemberProfile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

const App = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

export default hot(module)(App);
