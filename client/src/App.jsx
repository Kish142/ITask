import React, { useEffect, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/dashboard/Dashboard';

import { UserContext } from './components/context/currentUser';

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('hash');

    if (token) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [setIsUserLoggedIn]);

  return (
    <div className='app'>
      <Switch>
        <Route
          exact
          path='/register/*'
          render={() =>
            !isUserLoggedIn ? <RegisterPage /> : <Redirect to='/' />
          }
        />
        <Route
          exact
          path='/login'
          render={() => (!isUserLoggedIn ? <LoginPage /> : <Redirect to='/' />)}
        />
        <Route
          exact
          path='/'
          render={() =>
            isUserLoggedIn ? <Dashboard /> : <Redirect to='/login' />
          }
        />
        <Route path='*' render={() => 'No Page Found'} />
      </Switch>
    </div>
  );
};

export default App;
