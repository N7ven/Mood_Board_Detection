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

export default APIRequestError;
