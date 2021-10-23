import React, { useEffect, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { UserContext } from './components/context/currentUser';

import LoadingSpinner from './components/loading-spinner/LoadingSpinner';

// REACT LAZY LOAD METHOD
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));

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
      <React.Suspense fallback={<LoadingSpinner />}>
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
            render={() =>
              !isUserLoggedIn ? <LoginPage /> : <Redirect to='/' />
            }
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
      </React.Suspense>
    </div>
  );
};

export default App;
