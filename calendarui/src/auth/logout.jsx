import React, { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    localStorage.setItem('username', null);
    localStorage.setItem('password', null);
  });

  return <p>Logout successful</p>;
};

export default Logout;
