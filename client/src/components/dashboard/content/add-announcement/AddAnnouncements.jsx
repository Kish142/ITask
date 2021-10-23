import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import { AiOutlineCloseSquare } from 'react-icons/ai';

import {
  TextField,
  RadioInput,
  TextArea,
} from '../../../Input-field/InputField';

import TagInput from './Tag-input/TagInput';
import { useHttpClient } from '../../../../custom-hooks/httpClient';

import './AddAnnouncements.style.scss';

const AddAnnouncements = ({
  toggleAddAnnouncement,
  toggleAddAnnouncementAction,
  renderListAction,
}) => {
  
  const [category, setCategory] = useState();
  const [emailTags, setEmailTags] = useState([]);

  // FORM VALIDATION USING YUP
  let validate;

  if (category === 'announcement') { // IF ANNOUNCEMENT IS SELECTED IN INPUT
    validate = Yup.object({
      subject: Yup.string().required('This field is required'),
      category: Yup.string().required('Select any one above this field'),
      description: Yup.string().required('This field is required'),
    });
  } else if (category === 'event') { // IF EVENT IS SELECTED IN INPUT
    validate = Yup.object({
      subject: Yup.string().required('This field is required'),
      category: Yup.string().required('Select any one above this field'),
      description: Yup.string().required('This field is required'),
      eventDateTime: Yup.string().required('This field is required'),
      time: Yup.string().required('This field is required'),
      location: Yup.string().required('This field is required'),
    });
  } else if (category === 'reminder') { // IF REMINDER IS SELECTED IN INPUT
    validate = Yup.object({
      subject: Yup.string().required('This field is required'),
      category: Yup.string().required('Select any one above this field'),
      description: Yup.string().required('This field is required'),
      eventDateTime: Yup.string().required('This field is required'),
    });
  } else { // IT RUNS VALIDATED BEFORE CATEGORY IS SELECTED IN INPUT
    validate = Yup.object({
      category: Yup.string().required('Select any one above this field'),
    });
  }

  const { sendRequest, isLoading } = useHttpClient();

  const onSubmit = async (values) => {
    const token = localStorage.getItem('hash');

    const data = {
      ...values,
      notifyTo: emailTags,
    };

    const headers = {
      Authorization: 'Bearer ' + JSON.parse(token),
    };

    const response = await sendRequest(
      `/dashboard/make-${values.category}`,
      'post',
      data,
      headers
    );

    if (response) {
      console.log(response);
      renderListAction();
      toggleAddAnnouncementAction();
    }
  };

  const selectedTags = (tags) => {
    setEmailTags(tags);
  };

  return (
    <div
      style={{ display: toggleAddAnnouncement ? 'block' : 'none' }}
      className='add-announcement'
    >
      <div
        style={{ display: toggleAddAnnouncement ? 'block' : 'none' }}
        onClick={toggleAddAnnouncementAction}
        className='bg-overlay'
      ></div>
      <div className='add-announcement-wrapper'>
        <div className='title-closeIcon flex flex-ai-c flex-jc-sb'>
          <h4 className='title'>Add New Announcement</h4>
          <div
            onClick={toggleAddAnnouncementAction}
            className='closeIcon flex flex-ai-c'
          >
            <AiOutlineCloseSquare />
          </div>
        </div>

        <Formik
          initialValues={{
            category: '',
            subject: '',
            description: '',
            eventDateTime: '',
            time: '',
            location: '',
          }}
          validationSchema={validate}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form>
              <div className='input-field-text'>
                <TextField
                  label='Subject'
                  name='subject'
                  id='subject'
                  type='text'
                  placeholder='Enter Your Subject Here'
                />

                <div className='select-list'>
                  <div className='label-radio'>Select Category</div>
                  <div className='select-list-wrapper'>
                    <RadioInput
                      label='Announcement'
                      name='category'
                      id='announcement'
                      value='announcement'
                    />
                    <RadioInput
                      value='event'
                      label='Event'
                      name='category'
                      id='event'
                    />
                    <RadioInput
                      value='reminder'
                      label='Reminder'
                      name='category'
                      id='reminder'
                    />
                  </div>
                  <ErrorMessage
                    component='div'
                    name='category'
                    className='error'
                  />
                </div>
              </div>

              {values.category === 'reminder' && (
                <div className='selected-inputs-reminder'>
                  <div style={{ gap: '16px' }} className='flex'>
                    <TextField
                      label='Expires On'
                      name='eventDateTime'
                      id='eventDateTime'
                      type='date'
                    />
                  </div>

                  <TextArea
                    label='Description'
                    name='description'
                    id='description'
                    placeholder='Enter Your Description Here'
                  />

                  <div className='tag-input-wrapper'>
                    <div className='tag-input-label'>Notify To</div>

                    <TagInput selectedTags={selectedTags} tags={[]} />
                  </div>
                </div>
              )}

              {values.category === 'event' && (
                <div className='selected-inputs-events'>
                  <div style={{ gap: '16px' }} className='flex'>
                    <TextField
                      label='Date'
                      name='eventDateTime'
                      id='eventDateTime'
                      type='date'
                    />
                    <TextField label='Time' name='time' id='time' type='time' />
                  </div>

                  <TextField
                    label='Location'
                    name='location'
                    id='location'
                    type='text'
                    placeholder='Enter Your Location Here'
                  />

                  <TextArea
                    label='Description'
                    name='description'
                    id='description'
                    placeholder='Enter Your Description Here'
                  />

                  <div className='tag-input-wrapper'>
                    <div className='tag-input-label'>Notify To</div>

                    <TagInput selectedTags={selectedTags} tags={[]} />
                  </div>
                </div>
              )}

              {setCategory(values.category)}

              {values.category === 'announcement' && (
                <div className='selected-inputs-announcement'>
                  <TextArea
                    label='Description'
                    name='description'
                    id='description'
                    placeholder='Enter Your Description Here'
                  />

                  <div className='tag-input-wrapper'>
                    <div className='tag-input-label'>Notify To</div>

                    <TagInput selectedTags={selectedTags} tags={[]} />
                  </div>
                </div>
              )}

              <div className='btn'>
                <button
                  onClick={toggleAddAnnouncementAction}
                  type='button'
                  className='discard-btn'
                >
                  Discard
                </button>
                <button className='submit-btn' type='submit'>
                  {isLoading ? <div className='btn-loader'></div> : 'Send'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddAnnouncements;
