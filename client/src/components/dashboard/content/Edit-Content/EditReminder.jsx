import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { AiOutlineCloseSquare } from 'react-icons/ai';

import { TextField, TextArea } from '../../../Input-field/InputField';
import TagInput from '../add-announcement/Tag-input/TagInput';
import { useHttpClient } from '../../../../custom-hooks/httpClient';

import './EditContent.style.scss';

const EditReminder = ({
  contentId,
  openEdit,
  setOpenEdit,
  renderListAction,
}) => {
  const [emailTags, setEmailTags] = useState([]);
  const [formData, setFormData] = useState();

  const validate = Yup.object({
    subject: Yup.string().required('This field is required'),
    category: Yup.string().required('Select any one above this field'),
    description: Yup.string().required('This field is required'),
    eventDateTime: Yup.string().required('This field is required'),
  });

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
      `/dashboard/reminder/${contentId}`,
      'patch',
      data,
      headers
    );

    if (response) {
      console.log(response);
      renderListAction();
      setOpenEdit();
    }
  };

  useEffect(() => {
    const fetchRequest = async () => {
      const token = localStorage.getItem('hash');

      console.log(JSON.parse(token));

      const headers = {
        Authorization: 'Bearer ' + JSON.parse(token),
      };

      const response = await sendRequest(
        `/dashboard/reminder/${contentId}`,
        'get',
        {},
        headers
      );

      if (response) {
        console.log(response.result._id);
        setFormData(response.result);
      }
    };
    fetchRequest();
  }, [contentId, sendRequest]);

  const selectedTags = (tags) => {
    setEmailTags(tags);
  };
  return (
    <div
      style={{ display: openEdit ? 'block' : 'none' }}
      className='edit-announcement'
    >
      {openEdit && <div onClick={setOpenEdit} className='bg-overlay'></div>}
      <div className='edit-announcement-wrapper'>
        <div className='title-closeIcon flex flex-ai-c flex-jc-sb'>
          <h4 className='title'>Edit Reminder</h4>
          <div onClick={setOpenEdit} className='closeIcon flex flex-ai-c'>
            <AiOutlineCloseSquare />
          </div>
        </div>

        {formData && (
          <Formik
            initialValues={{
              category: formData.category || '',
              subject: formData.subject || '',
              description: formData.description || '',
              eventDateTime: formData.eventDateTime || '',
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

                  <div className='category'>
                    <p className='title'>Category</p>
                    <button className='category-name'>Reminder</button>
                  </div>
                </div>

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

                    <TagInput
                      selectedTags={selectedTags}
                      tags={formData.notifyTo}
                    />
                  </div>
                </div>

                <div className='btn'>
                  <button
                    onClick={setOpenEdit}
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
        )}
      </div>
    </div>
  );
};

export default EditReminder;
