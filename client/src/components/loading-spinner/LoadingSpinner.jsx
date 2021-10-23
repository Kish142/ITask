import React from 'react';

import './LoadingSpinner.style.scss';

const LoadingSpinner = () => {
  return (
    <div className='loading-spinner'>
      <div className='bg-overlay'></div>
      <div className='loader-wrapper'>
        <div className='loader'></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
