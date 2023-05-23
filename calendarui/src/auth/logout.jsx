import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './auth-slice';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCredentials({ username: '', password: '' }));
    localStorage.setItem('username', null);
    localStorage.setItem('password', null);
  });

  return (
    <Navigate to="/login" />
  );
};

export default Logout;
