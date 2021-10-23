
import { HiMenuAlt1 } from 'react-icons/hi';
import { GrAnnounce } from 'react-icons/gr';
import { RiLogoutBoxLine } from 'react-icons/ri';
import React, { useContext } from 'react';


import { UserContext } from '../../context/currentUser';
import { useHttpClient } from '../../../custom-hooks/httpClient';

import './Sidebar.style.scss';

const Sidebar = ({ sidebarToggle, sidebarToggleAction }) => {
  const { sendRequest } = useHttpClient();

  const [isuserLoggedIn, setIsUserLoggedIn] = useContext(UserContext);

  const logout = async () => {
    const response = await sendRequest('/logout', 'post');

    if (response) {
      localStorage.removeItem('hash');
      setIsUserLoggedIn(false);
    }
  };

  return (
    <div
      style={{ display: sidebarToggle ? 'block' : 'none' }}
      className='sidebar-section'
    >
      <div
        style={{ display: sidebarToggle ? 'block' : 'none' }}
        className='bg-overlay'
      ></div>
      <div className='sidebar-wrapper'>
        <div className='header flex flex-ai-c flex-jc-sb'>
          <h3 className='logo-text'>SA-INTRANET</h3>
          <div onClick={sidebarToggleAction} className='icon menu-icon'>
            <HiMenuAlt1 />
          </div>
        </div>
        <div className='menu-items'>
          <div className='item announcement flex flex-ai-c'>
            <div className='icon flex flex-ai-c'>
              <GrAnnounce />
            </div>
            <p className='text'>Announcement</p>
          </div>
          <div onClick={logout} className='item logout flex flex-ai-c'>
            <div className='icon flex flex-ai-c'>
              <RiLogoutBoxLine />
            </div>
            <p className='text'>Log out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
