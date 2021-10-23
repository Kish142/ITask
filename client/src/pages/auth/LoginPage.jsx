import React from 'react';
import Login from '../../components/auth/login/Login';

import Header from '../../components/header/Header';
const LoginPage = () => {
  return (
    <div className='login-page'>
      <Header />
      <Login />
    </div>
  );
};

export default LoginPage;
