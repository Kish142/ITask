import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';

import { TextField } from '../../../Input-field/InputField';
import Bitmap from '../../../../assets/Bitmap_2.png';
import { useHttpClient } from '../../../../custom-hooks/httpClient';

import './CompanyDetail.style.scss';

const CompanyDetail = () => {
  // FORM VALIDATION USING YUP
  const validate = Yup.object({
    companyName: Yup.string().required('This field is required'),
    location: Yup.string().required('This field is required'),
    employees: Yup.number().required('This field is required'),
    domainName: Yup.string().required('This field is required'),
  });

  const { sendRequest, isLoading } = useHttpClient();

  let history = useHistory();

  const onSubmit = async (values) => {
    const data = { ...values };

    const token = localStorage.getItem('hash');

    const headers = {
      Authorization: 'Bearer ' + JSON.parse(token),
    };

    const response = await sendRequest(
      '/register/company-details',
      'post',
      data,
      headers
    );

    if (response) {
      console.log(response);
      history.push('/register/create-password');
    }
  };

  return (
    <div className='company-detail-form'>
      <div className='company-detail-form-wrapper container-lg'>
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
                companyName: '',
                location: '',
                employees: '',
                domainName: '',
              }}
              validationSchema={validate}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <div className='input-field-text'>
                    <TextField
                      label='Company Name'
                      name='companyName'
                      id='companyName'
                      type='text'
                      placeholder='Enter Your Company Name'
                    />
                    <div className='row'>
                      <TextField
                        label='Location'
                        name='location'
                        id='location'
                        type='text'
                        placeholder='Enter Your Location'
                      />
                      <TextField
                        label='No.of Employees'
                        name='employees'
                        id='employees'
                        type='number'
                        placeholder='Employees count'
                      />
                    </div>
                    <TextField
                      label='Domain Name'
                      name='domainName'
                      id='domainName'
                      type='text'
                      placeholder='Enter Your Comapany Domain Name'
                    />
                  </div>
                  <button className='submit' type='submit'>
                    {isLoading ? <div className='btn-loader'></div> : 'Next'}
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

export default CompanyDetail;
