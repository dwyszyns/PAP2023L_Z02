import { hot } from 'react-hot-loader';
import React from 'react';
import './app.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './main/main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
]);

const App = () => (
  <RouterProvider router={router} />
);

export default hot(module)(App);
