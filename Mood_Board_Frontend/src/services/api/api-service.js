import axios from 'axios';
import AuthService from 'services/auth-service';
import { showErrorMessage } from 'utils/toster';
import { ACCESS_TOKEN_NOT_FOUND_ERROR } from '../../utils/auth-constants';
import { getBearerToken } from '../credential-storage/credential-storage';
import APIRequestError from './error-handling';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

const query = (
  url,
  authenticated,
  data,
  method = 'GET'
) => {
  const config = {
    url,
    method,
    headers: { ...defaultHeaders },
    data
  };

  const accessToken = getBearerToken();
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`
    };
  } else {
    return Promise.reject(new Error(ACCESS_TOKEN_NOT_FOUND_ERROR));
  }

  return axios
    .request(config)
    .then((response) => {
      if (response.status === 204) {
        return Promise.resolve({});
      }
      return response.data;
    })
    .catch((error) => {
      const { response } = error;
      if ((error?.response?.status === 401 || error?.response?.status === 403)) {
        showErrorMessage('Session expired');
        AuthService.doLogout();
        return response.data;
      }
      let message = 'Something went wrong try again later';

      if (response && response?.statusText) {
        message = response.statusText;
      } else if (error?.code === 'ERR_NETWORK') {
        message = 'Unable to make request to server. Please check your internet connection.';
      } else if (response?.status === 404 || response?.status === 500) {
        message = 'Something went wrong try again later';
      } else {
        message = 'Unable to make request to server. Please try again later!';
      }
      showErrorMessage(message);
      return Promise.reject(new APIRequestError(message, response?.status, response?.status));
    });
};

export default query;
