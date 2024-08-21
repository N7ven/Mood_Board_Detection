import { APIConstant } from '../../services/api-constant';
import AuthActionType from './auth-action-types';
import query from '../../services/api/api-service';
import { showSuccessMessage } from '../../utils/toster';

const authLoginRequest = () => ({ type: AuthActionType.AUTH_LOGIN_REQUEST });
const authLoginSuccess = (data) => {
  return {
    type: AuthActionType.AUTH_LOGIN_SUCCESS,
    payload: data
  };
};

const authLoginFailure = (error) => {
  return {
    type: AuthActionType.AUTH_LOGIN_FAILURE,
    error
  };
};

const dismissAuthErrorMessage = () => ({ type: AuthActionType.DISMISS_AUTH_ERROR_MESSAGE });
const authLogout = () => ({ type: AuthActionType.AUTH_LOGOUT });

const login = (payload) => async (dispatch) => {
  try {
    dispatch(authLoginRequest());
    const authRes = await query(APIConstant.logIn, true, payload, 'POST');
    const { data, hasErrors, errDetails } = authRes;
    if (hasErrors && errDetails?.length > 0) {
      dispatch(authLoginFailure(errDetails));
    } else {
      dispatch(authLoginSuccess(data));
    }
  } catch (error) {
    dispatch(authLoginFailure([error]));
  }
};

const forgotPasswordRequest = () => ({ type: AuthActionType.FORGOT_PASSWORD_API_REQUEST });
const forgotPasswordSuccess = () => ({ type: AuthActionType.FORGOT_PASSWORD_API_SUCCESS });
const forgotPasswordFailure = (error) => {
  return { type: AuthActionType.FORGOT_PASSWORD_API_FAILURE, error };
};

const forgotPassword = (payload) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const forgotApiRes = await query(APIConstant.forgotPassword, true, payload, 'POST');
    const { hasErrors, errDetails } = forgotApiRes;
    if (hasErrors && errDetails?.length > 0) {
      dispatch(forgotPasswordFailure(errDetails));
    } else {
      dispatch(forgotPasswordSuccess());
    }
  } catch (error) {
    dispatch(forgotPasswordFailure([error]));
  }
};

const verifyOTPRequest = () => ({ type: AuthActionType.VERIFY_OTP_API_REQUEST });
const verifyOTPSuccess = () => ({ type: AuthActionType.VERIFY_OTP_API_SUCCESS });
const verifyOTPFailure = (error) => ({ type: AuthActionType.VERIFY_OTP_API_FAILURE, error });

const verifyOTP = (payload) => async (dispatch) => {
  try {
    dispatch(verifyOTPRequest());
    const forgotApiRes = await query(APIConstant.confirmOTP, true, payload, 'POST');
    if (forgotApiRes === 'Fail') {
      dispatch(verifyOTPFailure([{ description: 'Invalid OTP' }]));
    } else {
      dispatch(verifyOTPSuccess());
    }
  } catch (error) {
    dispatch(verifyOTPFailure());
  }
};

const updateUserPasswordRequest = () => ({ type: AuthActionType.UPDATE_PASSWORD_REQUEST });
const updateUserPasswordSuccess = () => ({ type: AuthActionType.UPDATE_PASSWORD_SUCCESS });
const updateUserPasswordFailure = () => ({ type: AuthActionType.UPDATE_PASSWORD_FAILURE });

const updateUserPassword = (payload) => async (dispatch) => {
  try {
    dispatch(updateUserPasswordRequest());
    const forgotApiRes = await query(APIConstant.newusersetpassword, true, payload, 'POST');
    const { hasErrors, errDetails } = forgotApiRes;
    if (hasErrors && errDetails?.length > 0) {
      dispatch(updateUserPasswordFailure(errDetails));
    } else {
      dispatch(updateUserPasswordSuccess());
    }
  } catch (error) {
    dispatch(updateUserPasswordSuccess([error]));
  }
};

const resetUserPasswordRequest = () => ({ type: AuthActionType.RESET_PASSWORD_REQUEST });
const resetUserPasswordSuccess = () => ({ type: AuthActionType.RESET_PASSWORD_SUCCESS });
const resetUserPasswordFailure = () => ({ type: AuthActionType.RESET_PASSWORD_FAILURE });

const resetUserPassword = (payload) => async (dispatch) => {
  try {
    dispatch(resetUserPasswordRequest());
    const forgotApiRes = await query(APIConstant.savenewpassword, true, payload, 'POST');
    const { hasErrors, errDetails } = forgotApiRes;
    if (hasErrors && errDetails?.length > 0) {
      dispatch(resetUserPasswordFailure(errDetails));
    } else {
      showSuccessMessage('Password updated successfully!');
      dispatch(resetUserPasswordSuccess());
    }
  } catch (error) {
    dispatch(resetUserPasswordSuccess([error]));
  }
};

const passwordIdValidationRequest = () => ({ type: AuthActionType.PASSWORD_ID_VALIDATION_REQUEST });
const passwordIdValidationSuccess = (data) => ({ type: AuthActionType.PASSWORD_ID_VALIDATION_SUCCESS, data });
const passwordIdValidationFailure = () => ({ type: AuthActionType.PASSWORD_ID_VALIDATION_FAILURE });

const passwordIdValidation = (id) => async (dispatch) => {
  try {
    dispatch(passwordIdValidationRequest());
    const url = `${APIConstant.passwordIdValidation}/${id}/validate`;
    const res = await query(url, false);
    const { hasErrors, errDetails, valid } = res;
    if (hasErrors && errDetails?.length > 0) {
      dispatch(passwordIdValidationFailure(errDetails));
    } else {
      dispatch(passwordIdValidationSuccess(valid));
    }
  } catch (error) {
    dispatch(passwordIdValidationFailure([error]));
  }
};

const authLogoutRequest = () => ({ type: AuthActionType.AUTH_LOGOUT_REQUEST });
const authLogoutSuccess = (data) => {
  return {
    type: AuthActionType.AUTH_LOGOUT_SUCCESS,
    payload: data
  };
};

const authLogoutFailure = (error) => {
  return {
    type: AuthActionType.AUTH_LOGOUT_FAILURE,
    error
  };
};

const logoutAll = () => async (dispatch) => {
  try {
    dispatch(authLogoutRequest());
    const authRes = await query(APIConstant.logoutAll, true, {}, 'POST');
    const { data, hasErrors, errDetails } = authRes;
    if (hasErrors && errDetails?.length > 0) {
      dispatch(authLogoutFailure(errDetails));
    } else {
      dispatch(authLogoutSuccess(data));
    }
  } catch (error) {
    dispatch(authLogoutFailure([error]));
  }
};

const fetchCurrentUserRequest = () => ({ type: AuthActionType.FETCH_CURRENT_USER_REQUEST });
const fetchCurrentUserSuccess = (data) => ({ type: AuthActionType.FETCH_CURRENT_USER_SUCCESS, data });
const fetchCurrentUserFailure = (error) => ({ type: AuthActionType.FETCH_CURRENT_USER_FAILURE, error });

const fetchCurrentUser = () => async (dispatch) => {
  try {
    dispatch(fetchCurrentUserRequest());
    const url = APIConstant.me;
    const res = await query(url, true);
    const { hasErrors, errDetails, user } = res;
    console.log('user', user);
    if (hasErrors && errDetails?.length > 0) {
      dispatch(fetchCurrentUserFailure(errDetails));
    } else {
      dispatch(fetchCurrentUserSuccess(user));
    }
  } catch (error) {
    dispatch(fetchCurrentUserFailure([error]));
  }
};

export {
  login,
  forgotPassword,
  dismissAuthErrorMessage,
  authLogout,
  verifyOTP,
  updateUserPassword,
  resetUserPassword,
  passwordIdValidation,
  fetchCurrentUser,
  logoutAll
};
