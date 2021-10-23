import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';

import { TextField } from '../../../Input-field/InputField';
import Bitmap from '../../../../assets/Bitmap_1.png';
import { useHttpClient } from '../../../../custom-hooks/httpClient';

import './VerifyEmail.style.scss';

const VerifyEmail = () => {
  // FORM VALIDATION USING YUP
  const validate = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  const { sendRequest, isLoading, error } = useHttpClient();

  let history = useHistory();

  const onSubmit = async (values) => {
    const { email } = values;

    const data = { email };

    console.log(email);

    const response = await sendRequest('/register/email', 'post', data);

    if (response) {
      console.log(response);
      localStorage.setItem('userEmail', JSON.stringify(email));
      history.push('/register/verify-otp');
    }
  };

  return (
    <div className='verify-email-section'>
      <div className='verify-email-wrapper container-lg'>
        <div className='row flex'>
          <div className='col'>
            <div className='image'>
              <img src={Bitmap} alt='' />
            </div>
          </div>
          <div className='col'>
            <h1 className='title'>Make Your Life Easy with Intranet!</h1>
            <p className='text'>
              To make a workspace from scratch, please confirm your email
              address.
            </p>

            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={validate}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <div className='input-field-text'>
                    <TextField
                      label='Email Address'
                      name='email'
                      id='email'
                      type='email'
                      placeholder='Enter Your Email Address'
                    />
                  </div>
                  {error && (
                    <div style={{ marginBottom: '1rem' }} className='error'>
                      {error}
                    </div>
                  )}
                  <button className='submit' type='submit'>
                    {isLoading ? (
                      <div className='btn-loader'></div>
                    ) : (
                      'Confirm Email'
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

export default VerifyEmail;
