class APIRequestError {
    hasErrors;

    errDetails;

    constructor(message, status, code) {
      this.hasErrors = true;
      this.errDetails = [{
        errorcode: code,
        status,
        name: 'APIRequestError',
        description: message
      }];
    }
}

export const createRequestError = (error) => {
  const { response } = error;
  let message = 'Something went wrong try again later';

  if (response && response?.statusText) {
    message = response.statusText;
  } else if (error?.code === 'ERR_NETWORK') {
    message = 'Unable to make request to server. Please check your internet connection.';
  } else if (response?.status === 404) {
    message = 'Something went wrong try again later';
  } else {
    message = 'Unable to make request to server. Please try again later!';
  }

  return new APIRequestError(message, response && response?.status, error?.code);
};

export default APIRequestError;
