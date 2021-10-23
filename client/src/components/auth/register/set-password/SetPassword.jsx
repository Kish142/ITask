import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { TextField } from '../../../Input-field/InputField';
import { useHistory } from 'react-router-dom';
import Bitmap from '../../../../assets/Bitmap_2.png';
import { useHttpClient } from '../../../../custom-hooks/httpClient';

import './SetPassword.style.scss';

const SetPassword = () => {
  // FORM VALIDATION USING YUP
  const validate = Yup.object({
    firstName: Yup.string().required('This field is required'),
    lastName: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required'),
  });

  let history = useHistory();

  const { sendRequest, isLoading } = useHttpClient();

  const onSubmit = async (values) => {
    const data = { ...values };

    const token = localStorage.getItem('hash');

    const headers = {
      Authorization: 'Bearer ' + JSON.parse(token),
    };

    const response = await sendRequest(
      '/register/create-password',
      'post',
      data,
      headers
    );

    if (response) {
      console.log(response);
      history.push('/');
    }
  };

  return (
    <div className='register-form'>
      <div className='register-form-wrapper container-lg'>
        <div className='row flex'>
          <div className='col'>
            <div className='image'>
              <img src={Bitmap} alt='' />
            </div>
          </div>
          <div className='col'>
            <h1 className='title'>Create Personal Password</h1>
            <p className='text'>
              To make a workspace from scratch, please confirm your email
              address.
            </p>

            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                password: '',
              }}
              validationSchema={validate}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <div className='input-field-text'>
                    <div className='row'>
                      <TextField
                        label='First Name'
                        name='firstName'
                        id='firstName'
                        type='text'
                        placeholder='Enter Your First Name'
                      />
                      <TextField
                        label='Last Name'
                        name='lastName'
                        id='lastName'
                        type='text'
                        placeholder='Enter Your Last Name'
                      />
                    </div>

                    <TextField
                      label='Password'
                      name='password'
                      id='password'
                      type='password'
                      placeholder='Enter Your Password'
                    />
                  </div>
                  <button className='submit' type='submit'>
                    {isLoading ? (
                      <div className='btn-loader'></div>
                    ) : (
                      'Complete'
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
