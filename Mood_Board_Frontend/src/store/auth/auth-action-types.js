const AuthActionType = {
  AUTH_LOGIN_REQUEST: 'AUTH_LOGIN_REQUEST',
  AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILURE: 'AUTH_LOGIN_FAILURE',

  AUTH_LOGOUT_REQUEST: 'AUTH_LOGOUT_REQUEST',
  AUTH_LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS',
  AUTH_LOGOUT_FAILURE: 'AUTH_LOGOUT_FAILURE',

  AUTH_LOGOUT: 'AUTH_LOGOUT',
  DISMISS_AUTH_ERROR_MESSAGE: 'DISMISS_AUTH_ERROR_MESSAGE',

  FORGOT_PASSWORD_API_REQUEST: 'FORGOT_PASSWORD_API_REQUEST',
  FORGOT_PASSWORD_API_SUCCESS: 'FORGOT_PASSWORD_API_SUCCESS',
  FORGOT_PASSWORD_API_FAILURE: 'FORGOT_PASSWORD_API_FAILURE',

  VERIFY_OTP_API_REQUEST: 'REQUEST_VERIFY_OTP_API_REQUEST',
  VERIFY_OTP_API_SUCCESS: 'REQUEST_VERIFY_OTP_API_SUCCESS',
  VERIFY_OTP_API_FAILURE: 'REQUEST_VERIFY_OTP_API_FAILURE',

  SET_PASSWORD_ID_VALIDATION_REQUEST: 'SET_PASSWORD_ID_VALIDATION_REQUEST',
  SET_PASSWORD_ID_VALIDATION_SUCCESS: 'SET_PASSWORD_ID_VALIDATION_SUCCESS',
  SET_PASSWORD_ID_VALIDATION_FAILURE: 'SET_PASSWORD_ID_VALIDATION_FAILURE',

  UPDATE_PASSWORD_REQUEST: 'UPDATE_PASSWORD_REQUEST',
  UPDATE_PASSWORD_SUCCESS: 'UPDATE_PASSWORD_SUCCESS',
  UPDATE_PASSWORD_FAILURE: 'UPDATE_PASSWORD_FAILURE',

  RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST',
  RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE',

  PASSWORD_ID_VALIDATION_REQUEST: 'PASSWORD_ID_VALIDATION_REQUEST',
  PASSWORD_ID_VALIDATION_SUCCESS: 'PASSWORD_ID_VALIDATION_SUCCESS',
  PASSWORD_ID_VALIDATION_FAILURE: 'PASSWORD_ID_VALIDATION_FAILURE',

  FETCH_CURRENT_USER_REQUEST: 'FETCH_CURRENT_USER_REQUEST',
  FETCH_CURRENT_USER_SUCCESS: 'FETCH_CURRENT_USER_SUCCESS',
  FETCH_CURRENT_USER_FAILURE: 'FETCH_CURRENT_USER_FAILURE',
  SET_OLD_REPORT: 'SET_OLD_REPORT'

};

export default AuthActionType;

