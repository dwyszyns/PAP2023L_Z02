import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from './auth-slice';
import { useLazyLoginQuery } from '../store/api';

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
  }, []);

  const onButtonClick = () => {
    dispatch(setCredentials({ username, password }));
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    setUserTriggered(true);
    trigger();
  };

  const render = () => {
    console.log(status);
    if (status.isError && userTriggered) {
      return <p>Wrong credentials</p>;
    }
    if (status.isSuccess) {
      navigate('/member/current');
    }
    return <></>;
  };

  return (
    <div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="button" onClick={onButtonClick}>
        LOGIN
      </button>
      {render()}
    </div>
  );
};

export default Login;
