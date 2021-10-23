import React from 'react';

import { MdEmail } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';


import './Header.style.scss';

const Header = () => {
  let history = useHistory();

  console.log(history.location.pathname);

  const pathname = history.location.pathname;
  return (
    <div className='header'>
      <header>
        <nav className='container-lg flex flex-ai-c flex-jc-sb'>
          <h2 className='logo-text'>SA-INTRANER</h2>
          <div className='menu-items flex flex-ai-c'>
            {pathname !== '/login' ? (
              <Link to='/login'>
                <p className='login'>Login</p>
              </Link>
            ) : (
              <Link to='/register/'>
                <p className='login'>Register</p>
              </Link>
            )}

            <div className='email flex flex-ai-c'>
              <div className='icon flex flex-ai-c'>
                <MdEmail />
              </div>
              <a href='mailto:support@squashapps.com'>
                <p className='email-text'>support@squashapps.com</p>
              </a>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
