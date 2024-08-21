import AuthActionType from './auth-action-types';
import {
  defaultErrorState,
  defaultLoadingState,
  defaultRequestState,
  defaultSuccessState,
  updateState
} from '../store-helper';

const initialState = {
  currentUser: null,
  loading: false,
  errorMessage: '',
  request: defaultRequestState(),
  forgotPasswordSuccess: false,
  verifyOTPSuccess: false,
  passwordResetSuccess: false,
  updatePasswordSuccess: false,
  passwordIdTest: false,
  validId: undefined,
  authRequest: defaultRequestState()
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case AuthActionType.AUTH_LOGIN_REQUEST:
    case AuthActionType.AUTH_LOGOUT_REQUEST:
    case AuthActionType.FORGOT_PASSWORD_API_REQUEST:
    case AuthActionType.VERIFY_OTP_API_REQUEST:
    case AuthActionType.UPDATE_PASSWORD_REQUEST:
    case AuthActionType.RESET_PASSWORD_REQUEST:
    case AuthActionType.PASSWORD_ID_VALIDATION_REQUEST:
    case AuthActionType.FETCH_CURRENT_USER_REQUEST:
      return updateState(state, {
        request: defaultLoadingState(),
        authRequest: defaultLoadingState(),
        forgotPasswordSuccess: false,
        passwordResetSuccess: false,
        verifyOTPSuccess: false,
        updatePasswordSuccess: false
      });

    case AuthActionType.AUTH_LOGIN_SUCCESS:
    case AuthActionType.FETCH_CURRENT_USER_SUCCESS:
      return updateState(state, {
        currentUser: actions.data,
        authRequest: defaultSuccessState(true)
      });

    case AuthActionType.AUTH_LOGOUT_SUCCESS:
      return updateState(state, {
        currentUser: null,
        request: defaultSuccessState(true)
      });

    case AuthActionType.AUTH_LOGIN_FAILURE:
    case AuthActionType.AUTH_LOGOUT_FAILURE:
    case AuthActionType.FORGOT_PASSWORD_API_FAILURE:
    case AuthActionType.VERIFY_OTP_API_FAILURE:
    case AuthActionType.UPDATE_PASSWORD_FAILURE:
    case AuthActionType.RESET_PASSWORD_FAILURE:
    case AuthActionType.PASSWORD_ID_VALIDATION_FAILURE:
    case AuthActionType.FETCH_CURRENT_USER_FAILURE:
      return updateState(state, {
        ...actions.payload,
        passwordResetSuccess: false,
        updatePasswordSuccess: false,
        request: defaultErrorState(actions.error),
        authRequest: defaultErrorState(actions.error)
      });

    case AuthActionType.DISMISS_AUTH_ERROR_MESSAGE:
      return updateState(state, {
        loading: false,
        request: defaultRequestState()
      });
    case AuthActionType.AUTH_LOGOUT:
      return updateState(state, {
        ...initialState
      });

    case AuthActionType.PASSWORD_ID_VALIDATION_SUCCESS:
      return updateState(state, {
        loading: false,
        request: defaultSuccessState(true),
        validId: actions.data,
        passwordIdTest: true
      });

    case AuthActionType.FORGOT_PASSWORD_API_SUCCESS:
      return updateState(state, {
        loading: false,
        request: defaultSuccessState(true),
        forgotPasswordSuccess: true
      });

    case AuthActionType.VERIFY_OTP_API_SUCCESS:
      return updateState(state, {
        loading: false,
        request: defaultSuccessState(true),
        verifyOTPSuccess: true
      });
    case AuthActionType.RESET_PASSWORD_SUCCESS:
      return updateState(state, {
        passwordResetSuccess: true,
        loading: false,
        request: defaultSuccessState(true)
      });
    case AuthActionType.UPDATE_PASSWORD_SUCCESS:
      return updateState(state, {
        loading: false,
        updatePasswordSuccess: true,
        request: defaultSuccessState(true)
      });

    default: return state;
  }
};
