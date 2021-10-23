import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { TextField } from '../../Input-field/InputField';
import Bitmap from '../../../assets/Bitmap_2.png';
import { UserContext } from '../../context/currentUser';
import { useHttpClient } from '../../../custom-hooks/httpClient';

import './Login.style.scss';

const Login = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserContext);

  // FORM VALIDATION USING YUP
  const validate = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().required('This field is required'),
  });

  const { sendRequest, isLoading, error } = useHttpClient();

  const onSubmit = async (values) => {
    const data = { ...values };

    const response = await sendRequest('/login', 'post', data);

    if (response) {
      console.log(response);

      const token = response.token;
      localStorage.setItem('hash', JSON.stringify(token));

      setIsUserLoggedIn(true);
    }
  };
  return (
    <div className='login-section'>
      <div className='login-form-wrapper container-lg'>
        <div className='row flex'>
          <div className='col'>
            <div className='image'>
              <img src={Bitmap} alt='' />
            </div>
          </div>
          <div className='col'>
            <h1 className='title'>Login to your app</h1>
            <p className='text'>
              To make a workspace from scratch, please confirm your email
              address.
            </p>

            <Formik
              initialValues={{
                email: '',
                password: '',
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
                      type='text'
                      placeholder='Enter Your Email Address'
                    />
                    <TextField
                      label='Password'
                      name='password'
                      id='password'
                      type='password'
                      placeholder='Enter Your Password'
                    />
                  </div>

                  {error && (
                    <div
                      style={{
                        marginBottom: '1rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                      }}
                      className='error'
                    >
                      Mismatched Credentials
                    </div>
                  )}

                  <button className='submit' type='submit'>
                    {isLoading ? <div className='btn-loader'></div> : 'Log in'}
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

export default Login;
