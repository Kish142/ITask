import { useState, useCallback } from 'react';
import axios from 'axios';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = 'GET', data = null, headers = {}) => {
      setIsLoading(true);
      axios.defaults.baseURL = 'https://itask-webdev.herokuapp.com/';

      try {
        const response = await axios({
          url,
          method,
          data,
          headers,
          withCredentials: true,
        });

        response && console.log(response);

        if (!response.ok) {
          setError(response.data.error);
        }

        setIsLoading(false);

        return response.data;
      } catch (err) {
        setError(err.response.data.error);
        setIsLoading(false);
        console.log(err.response.data);
      }
    },
    []
  );

  return { isLoading, error, sendRequest, setError };
};
