import React, { useState } from 'react';
import { HiMenuAlt1 } from 'react-icons/hi';

import AddAnnouncements from './add-announcement/AddAnnouncements';
import AnnouncementDetail from './announcement-detail/AnnouncementDetail';
import AnnouncementList from './announcement-list/AnnouncementList';

import './Announcement.style.scss';

const Announcement = ({ sidebarToggleAction }) => {
  const [toggleDetail, setToggleDetail] = useState(false);
  const [renderList, setRenderList] = useState(false);
  const [contentId, setContentId] = useState();
  const [contentCategory, setContentCategory] = useState();
  const [toggleAddAnnouncement, setToggleAddAnnouncement] = useState(false);

  const changeToggleAnnouncement = () => {
    setToggleAddAnnouncement(!toggleAddAnnouncement);
  };

  const toggleDetailAction = () => {
    console.log('clickded');

    setToggleDetail(!toggleDetail);
  };

  const renderListAction = () => {
    setRenderList(!renderList);
  };

  return (
    <div className='announcement-section'>
      <div className='announcement-wrapper'>
        <h3 className='title flex'>
          <span
            onClick={sidebarToggleAction}
            className='flex flex-ai-c menu-icon'
          >
            <HiMenuAlt1 />
          </span>
          Announcement
        </h3>
        <div className='menu-list-detail'>
          <div className='list-detail'>
            <AnnouncementList
              renderList={renderList}
              toggleDetail={toggleDetail}
              toggleAddAnnouncementAction={changeToggleAnnouncement}
              toggleDetailAction={toggleDetailAction}
              setContentId={setContentId}
              setContentCategory={setContentCategory}
            />
            <AnnouncementDetail
              renderListAction={renderListAction}
              toggleDetail={toggleDetail}
              toggleDetailAction={toggleDetailAction}
              contentId={contentId}
              contentCategory={contentCategory}
              setContentId={setContentId}
            />
          </div>
        </div>
      </div>
      <AddAnnouncements
        renderListAction={renderListAction}
        toggleAddAnnouncement={toggleAddAnnouncement}
        toggleAddAnnouncementAction={changeToggleAnnouncement}
      />
    </div>
  );
};

export default Announcement;
