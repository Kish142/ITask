import React, { useEffect, useState } from 'react';
import { CgCloseO } from 'react-icons/cg';

import { useHttpClient } from '../../../../custom-hooks/httpClient';
import LoadingSpinner from '../../../loading-spinner/LoadingSpinner';
import EditAnnouncement from '../Edit-Content/EditAnnouncement';
import EditEvent from '../Edit-Content/EditEvent';
import EditReminder from '../Edit-Content/EditReminder';

import DeleteModal from './Delete-modal/DeleteModal';

import './AnnouncementDetail.style.scss';

const AnnouncementDetail = ({
  toggleDetail,
  toggleDetailAction,
  contentId,
  contentCategory,
  renderListAction,
}) => {
  
  const [content, setContent] = useState();  
  const [openEdit, setOpenEdit] = useState(false);  
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  
  const { sendRequest, isLoading } = useHttpClient();

  const setOpenEditAction = () => {
    setOpenEdit(!openEdit);
  };

  const setOpenDeleteModalAction = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  useEffect(() => {
    console.log(contentCategory);
    const fetchRequest = async () => {
      const token = localStorage.getItem('hash');

      console.log(JSON.parse(token));

      const headers = {
        Authorization: 'Bearer ' + JSON.parse(token),
      };

      const response = await sendRequest(
        `/dashboard/${contentCategory}/${contentId}`,
        'get',
        {},
        headers
      );

      if (response) {
        console.log(response.result.user.firstName);
        setContent(response.result);
      }
    };
    fetchRequest();
  }, [contentCategory, contentId, sendRequest]);

  const getDateFormat = (d) => {
    const date = new Date(d);
    return date.toLocaleDateString();
  };

  return (
    <>
      {content && (
        <>
          {contentCategory === 'announcement' && openEdit && (
            <EditAnnouncement
              contentId={contentId}
              openEdit={openEdit}
              setOpenEdit={setOpenEditAction}
              renderListAction={renderListAction}
            />
          )}
          {contentCategory === 'event' && openEdit && (
            <EditEvent
              contentId={contentId}
              openEdit={openEdit}
              setOpenEdit={setOpenEditAction}
              renderListAction={renderListAction}
            />
          )}
          {contentCategory === 'reminder' && openEdit && (
            <EditReminder
              contentId={contentId}
              openEdit={openEdit}
              setOpenEdit={setOpenEditAction}
              renderListAction={renderListAction}
            />
          )}
        </>
      )}
      {openDeleteModal && (
        <DeleteModal
          contentId={contentId}
          contentCategory={contentCategory}
          renderListAction={renderListAction}
          setOpenDeleteModalAction={setOpenDeleteModalAction}
        />
      )}
      <div
        style={{ display: toggleDetail ? 'block' : 'none' }}
        className='announcement-detail-section'
      >
        {isLoading && <LoadingSpinner />}
        <div
          style={{ display: toggleDetail ? 'block' : 'none' }}
          onClick={toggleDetailAction}
          className='bg-overlay'
        ></div>
        <div className='announcement-detail-section-wrapper'>
          {content && (
            <div className='detail'>
              <div className='avatar-name-timestamp-closeIcon flex flex-ai-c flex-jc-sa'>
                <div className='avatar'>
                  <div className='avatar-wrapper'>
                    <p>
                      {content.user.firstName
                        ? content.user.firstName.charAt(0)
                        : 'A'}
                    </p>
                  </div>
                </div>
                <h3 className='name'>{content.subject}</h3>
                <p className='date'>{getDateFormat(content.date)}</p>
                <div onClick={toggleDetailAction} className='close-icon'>
                  <CgCloseO />
                </div>
              </div>
              <div className='description'>
                <p>{content.description}</p>
              </div>
              <div className='edit-delete'>
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    toggleDetailAction();
                  }}
                  className='edit'
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    toggleDetailAction();
                    setOpenDeleteModalAction();
                  }}
                  className='delete'
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          <div className='comments'>
            <div className='title-count flex flex-ai-c'>
              <h4 className='title'>Comments</h4>
              <p className='reply-count'>3&nbsp;replies</p>
            </div>
            <div className='comment-wrapper'>
              <div className='user-comment'>
                <div className='avatar-name-timestamp flex flex-ai-c flex-jc-sb'>
                  <div className='avatar-name flex flex-ai-c'>
                    <div className='avatar-wrapper'>
                      <p>K</p>
                    </div>
                    <h3 className='name'>King Of Art</h3>
                  </div>
                  <p className='timestamp'>04 Feb 2019, 3:35pm</p>
                </div>
                <div className='comment-text'>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Ipsam vitae ex ut est commodi? Blanditiis qui ipsam at
                    ducimus quasi.
                  </p>
                </div>
              </div>
            </div>

            <div className='comment-wrapper'>
              <div className='user-comment'>
                <div className='avatar-name-timestamp flex flex-ai-c flex-jc-sb'>
                  <div className='avatar-name flex flex-ai-c'>
                    <div className='avatar-wrapper'>
                      <p>J</p>
                    </div>
                    <h3 className='name'>John Cage</h3>
                  </div>
                  <p className='timestamp'>04 Feb 2019, 3:35pm</p>
                </div>
                <div className='comment-text'>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Ipsam vitae ex ut est commodi? Blanditiis qui ipsam at
                    ducimus quasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementDetail;
