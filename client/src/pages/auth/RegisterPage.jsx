import React from 'react';
import CompanyDetail from '../../components/auth/register/company-detail/CompanyDetail';
import VerifyEmail from '../../components/auth/register/verify-email/VerifyEmail';
import VerifyOtp from '../../components/auth/register/Verify-otp/VerifyOtp';
import Header from '../../components/header/Header';
import SetPassword from '../../components/auth/register/set-password/SetPassword';

import { Route, Switch } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className='register-page'>
      <Header />

      <Switch>
        <Route exact path='/register/' render={() => <VerifyEmail />} />
        <Route exact path='/register/verify-otp' render={() => <VerifyOtp />} />
        <Route
          exact
          path='/register/company-details'
          render={() => <CompanyDetail />}
        />

        <Route
          exact
          path='/register/create-password'
          render={() => <SetPassword />}
        />
      </Switch>
    </div>
  );
};

export default RegisterPage;
