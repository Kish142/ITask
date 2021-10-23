import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Bitmap from '../../../../assets/Bitmap_2.png';
import { useHttpClient } from '../../../../custom-hooks/httpClient';

import './VerifyOtp.style.scss';

const VerifyOtp = () => {
  const [input, setInput] = useState({
    input_1: '',
    input_2: '',
    input_3: '',
    input_4: '',
    input_5: '',
  });
  const [error, setError] = useState(false);

  const { sendRequest, isLoading } = useHttpClient();

  let history = useHistory();

  const onChangeEvent = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  let digitValidate = function (el) {
    el.target.value = el.target.value.replace(/[^0-9]/g, '');
  };

  const onSubmitEvent = async (e) => {
    e.preventDefault();

    const { input_1, input_2, input_3, input_4, input_5 } = input;

    const otp = input_1 + input_2 + input_3 + input_4 + input_5;

    console.log(otp.length);

    if (otp.length < 5) {
      return setError(true);
    }

    const email = localStorage.getItem('userEmail');

    const data = {
      email: JSON.parse(email),
      otp,
    };

    const response = await sendRequest('/register/verify-otp', 'post', data);

    if (response) {
      console.log(response);

      const token = response.token;

      localStorage.setItem('hash', JSON.stringify(token));

      history.push('/register/company-details');
    }
  };

  return (
    <div className='verify-otp-section'>
      <div className='verify-otp-wrapper container-lg'>
        <div className='row flex'>
          <div className='col'>
            <div className='image'>
              <img src={Bitmap} alt='' />
            </div>
          </div>
          <div className='col'>
            <h1 className='title'>We’ve sent you a mail!</h1>
            <p className='text'>
              To make a workspace from scratch, please confirm your email
              address.
            </p>

            {input && (
              <form onSubmit={onSubmitEvent} action=''>
                <div className='input-field-text'>
                  <label htmlFor='input'>Enter Your Verification Code</label>
                  <div className='otp-field flex'>
                    <input
                      onChange={onChangeEvent}
                      value={input.input_1}
                      type='text'
                      name='input_1'
                      id='input'
                      className='otp-input-tab'
                      maxLength='1'
                      onInput={(e) => digitValidate(e)}
                    />
                    <input
                      onChange={onChangeEvent}
                      value={input.input_2}
                      type='text'
                      name='input_2'
                      id='input'
                      className='otp-input-tab'
                      onInput={(e) => digitValidate(e)}
                      maxLength='1'
                    />
                    <input
                      onChange={onChangeEvent}
                      value={input.input_3}
                      type='text'
                      name='input_3'
                      id='input'
                      className='otp-input-tab'
                      onInput={(e) => digitValidate(e)}
                      maxLength='1'
                    />
                    <input
                      onChange={onChangeEvent}
                      value={input.input_4}
                      type='text'
                      name='input_4'
                      id='input'
                      className='otp-input-tab'
                      onInput={(e) => digitValidate(e)}
                      maxLength='1'
                    />
                    <input
                      onChange={onChangeEvent}
                      value={input.input_5}
                      type='text'
                      name='input_5'
                      id='input'
                      className='otp-input-tab'
                      onInput={(e) => digitValidate(e)}
                      maxLength='1'
                    />
                  </div>
                  {error && (
                    <div className='error'>Please enter a valid otp</div>
                  )}
                </div>
                <button className='submit' type='submit'>
                  {isLoading ? (
                    <div className='btn-loader'></div>
                  ) : (
                    'Verify OTP'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
