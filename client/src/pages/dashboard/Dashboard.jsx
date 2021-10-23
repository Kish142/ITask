import React, { useState } from 'react';
import Announcement from '../../components/dashboard/content/Announcement';
import Sidebar from '../../components/dashboard/sidebar/Sidebar';

const Dashboard = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const sidebarToggleAction = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <div className='dashboard-page'>
      <div className='flex'>
        <Sidebar
          sidebarToggle={sidebarToggle}
          sidebarToggleAction={sidebarToggleAction}
        />
        <Announcement sidebarToggleAction={sidebarToggleAction} />
      </div>
    </div>
  );
};

export default Dashboard;
