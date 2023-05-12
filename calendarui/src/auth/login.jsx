import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCredentials } from './auth-slice';
import { useLazyLoginQuery } from '../store/api';
import './auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userTriggered, setUserTriggered] = useState(false);
  const [trigger, status] = useLazyLoginQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUserTriggered(false);
    trigger();
  }, [trigger]);

  const onButtonClick = () => {
    dispatch(setCredentials({ username, password }));
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    setUserTriggered(true);
    trigger();
  };

  const invalidCredentials = () => status.isError && userTriggered;

  const render = () => {
    if (invalidCredentials()) {
      return <p className="auth-error-message">Wrong credentials</p>;
    }
    if (status.isSuccess) {
      navigate('/member/current');
    }
    return <></>;
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login</h1>
      <input
        className={`auth-input ${invalidCredentials() ? 'invalid' : ''}`}
        value={username}
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={`auth-input ${invalidCredentials() ? 'invalid' : ''}`}
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="auth-submit-button" type="button" onClick={onButtonClick}>
        Submit
      </button>
      <div className="auth-footer">
        <Link to="/register" className="auth-link">{'Don\'t have an account?'}</Link>
        {render()}
      </div>
    </div>
  );
};

export default Login;
