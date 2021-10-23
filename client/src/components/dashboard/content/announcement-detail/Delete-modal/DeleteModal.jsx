import React from 'react';
import { useHttpClient } from '../../../../../custom-hooks/httpClient';

import './DeleteModal.style.scss';

const DeleteModal = ({
  contentId,
  contentCategory,
  setOpenDeleteModalAction,
  renderListAction,
}) => {
  const { sendRequest, isLoading } = useHttpClient();

  const confirm = async () => {
    const token = localStorage.getItem('hash');

    console.log(JSON.parse(token));

    const headers = {
      Authorization: 'Bearer ' + JSON.parse(token),
    };

    const response = await sendRequest(
      `/dashboard/${contentCategory}/${contentId}`,
      'delete',
      {},
      headers
    );

    if (response) {
      console.log(response.result._id);
      setOpenDeleteModalAction();
      renderListAction();
    }
  };

  return (
    <div className='delete-modal'>
      <div className='delete-modal-wrapper'>
        <h3 className='text'>Are you sure?</h3>
        <div className='close-confirm'>
          <button onClick={setOpenDeleteModalAction} className='close'>
            Close
          </button>
          <button onClick={confirm} className='confirm'>
            {isLoading ? <div className='btn-loader'></div> : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
