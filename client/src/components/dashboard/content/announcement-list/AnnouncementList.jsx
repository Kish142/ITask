import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import { GoCalendar } from 'react-icons/go';
import { GrLocation } from 'react-icons/gr';

import { useHttpClient } from '../../../../custom-hooks/httpClient';
import LoadingSpinner from '../../../loading-spinner/LoadingSpinner';

import './AnnouncementList.style.scss';
const AnnouncementList = ({
  toggleDetailAction,
  toggleAddAnnouncementAction,
  setContentId,
  setContentCategory,
  renderList,
}) => {
  const [searchTerm, setSearchTerm] = useState();
  const [allAnnounceent, setAllAnnounceent] = useState();
  const [allEvent, setAllEvent] = useState();
  const [allReminder, setAllReminder] = useState();
  const [allContent, setAllContent] = useState();

  const { sendRequest, isLoading } = useHttpClient();

  useEffect(() => {
    const fetchRequest = async () => {
      const token = localStorage.getItem('hash');

      console.log(JSON.parse(token));

      const headers = {
        Authorization: 'Bearer ' + JSON.parse(token),
      };

      const response_1 = await sendRequest(
        '/dashboard/announcement',
        'get',
        {},
        headers
      );

      response_1 && setAllAnnounceent(response_1.result);

      const response_2 = await sendRequest(
        '/dashboard/event',
        'get',
        {},
        headers
      );

      response_2 && setAllEvent(response_2.result);

      const response_3 = await sendRequest(
        '/dashboard/reminder',
        'get',
        {},
        headers
      );

      response_3 && setAllReminder(response_3.result);
    };
    fetchRequest();
  }, [sendRequest, renderList]);

  // TO MERGE ALL RECEIVED ARRAY FROM BACKEND
  useEffect(() => {
    if (allReminder && allEvent && allAnnounceent) {
      setAllContent([...allReminder, ...allEvent, ...allAnnounceent]);
    }

    return () => {
      setAllContent(null);
    };
  }, [allAnnounceent, allEvent, allReminder]);

  console.log(allContent);

  const searchFilter =
    allContent &&
    !!searchTerm &&
    allContent.filter(
      (content) =>
        content.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
        content.subject
    );

  const getDateFormat = (d) => {
    const date = new Date(d);
    return date.toLocaleDateString();
  };

  const getTime = (d) => {
    const date = new Date(d);
    return date
      .toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(/(:\d{2}| [AP]M)$/, '');
  };

  return (
    <div className='announcement-list'>
      {isLoading && <LoadingSpinner />}
      <div
        style={{ gap: '3rem' }}
        className='item-count-search-menu flex flex-ai-c flex-jc-sb'
      >
        <div className='item-count'>
          {allContent && (
            <p>
              <strong>Items Total: </strong>
              {allContent.length}
            </p>
          )}
        </div>
        <div className='search-menu'>
          <div className='search-box'>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type='text'
              placeholder='Search'
            />
            <div className='icon'>
              <AiOutlineSearch />
            </div>
          </div>
          <div className='menu'>
            <button onClick={toggleAddAnnouncementAction} className='text'>
              <strong>+</strong>Announcement
            </button>
          </div>
        </div>
      </div>

      {searchFilter && searchFilter.length > 0
        ? searchFilter.map((a) => (
            <div
              key={a._id}
              onClick={() => {
                toggleDetailAction();
                setContentId(a._id);
                setContentCategory(a.category);
              }}
              className='announcement-list-wrapper'
            >
              <div className='row flex'>
                <div className='user-avatar'>
                  <div className='user-avatar-wrapper'>
                    <p>{a.user.firstName ? a.user.firstName.charAt(0) : 'A'}</p>
                  </div>
                </div>
                <div className='announcement-detail'>
                  <div className='announcement-detail-wrapper'>
                    <div className='name-comments-date flex flex-jc-sb'>
                      <h4 className='name'>{a.subject}</h4>
                      <div className='comments-date flex flex-ai-c'>
                        <div className='comments flex flex-ai-c'>
                          <div className='icon flex flex-ai-c'>
                            <FaRegCommentDots />
                          </div>
                          <p>3</p>
                        </div>
                        <div className='date'>
                          <p>
                            <span style={{ marginRight: '10px' }}>
                              {getTime(a.date)}
                            </span>
                            {getDateFormat(a.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className='description'>L{a.description}</p>
                  </div>
                  <div className='expiresOn-location flex flex-ai-c'>
                    {a.eventDateTime && (
                      <div className='expires-on flex flex-ai-c'>
                        <div className='icon flex flex-ai-c'>
                          <GoCalendar />
                        </div>
                        <p className='date'>{getDateFormat(a.eventDateTime)}</p>
                      </div>
                    )}
                    {a.location && (
                      <div className='location flex flex-ai-c'>
                        <div className='icon flex flex-ai-c'>
                          <GrLocation />
                        </div>
                        <p className='address'>{a.location}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        : allContent &&
          allContent.map((a) => (
            <div
              key={a._id}
              onClick={() => {
                toggleDetailAction();
                setContentId(a._id);
                setContentCategory(a.category);
              }}
              className='announcement-list-wrapper'
            >
              <div className='row flex'>
                <div className='user-avatar'>
                  <div className='user-avatar-wrapper'>
                    <p>{a.user.firstName ? a.user.firstName.charAt(0) : 'A'}</p>
                  </div>
                </div>
                <div className='announcement-detail'>
                  <div className='announcement-detail-wrapper'>
                    <div className='name-comments-date flex flex-jc-sb'>
                      <h4 className='name'>{a.subject}</h4>
                      <div className='comments-date flex flex-ai-c'>
                        <div className='comments flex flex-ai-c'>
                          <div className='icon flex flex-ai-c'>
                            <FaRegCommentDots />
                          </div>
                          <p>3</p>
                        </div>
                        <div className='date'>
                          <p>
                            <span style={{ marginRight: '10px' }}>
                              {getTime(a.date)}
                            </span>
                            {getDateFormat(a.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className='description'>{a.description}</p>
                  </div>

                  <div className='expiresOn-location flex flex-ai-c'>
                    {a.eventDateTime && (
                      <div className='expires-on flex flex-ai-c'>
                        <div className='icon flex flex-ai-c'>
                          <GoCalendar />
                        </div>
                        <p className='date'>{getDateFormat(a.eventDateTime)}</p>
                      </div>
                    )}
                    {a.location && (
                      <div className='location flex flex-ai-c'>
                        <div className='icon flex flex-ai-c'>
                          <GrLocation />
                        </div>
                        <p className='address'>{a.location}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default AnnouncementList;
