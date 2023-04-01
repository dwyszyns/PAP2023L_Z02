import React from 'react';
import { Outlet } from 'react-router-dom';
import './main.css';
import Sidebar from '../sidebar/sidebar';

const Main = () => (
  <div className="container">
    <Sidebar />
    <Outlet />
  </div>
);

export default Main;
