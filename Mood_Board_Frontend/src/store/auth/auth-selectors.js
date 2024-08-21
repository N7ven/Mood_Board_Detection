export const getCurrentUser = (state) => state.auth.currentUser;
export const getAuthLoading = (state) => state.auth.loading;
export const getAuthRequest = (state) => state.auth.request;
export const getForgotPasswordSuccess = (state) => state.auth.forgotPasswordSuccess;
export const getVerifyOTPSuccess = (state) => state.auth.verifyOTPSuccess;
export const getResetPasswordSuccess = (state) => state.auth.passwordResetSuccess;
export const getIsValidRequest = (state) => state.auth.validId;
export const getPasswordIdSuccess = (state) => state.auth.passwordIdTest;
export const getUpdatePasswordSuccess = (state) => state.auth.updatePasswordSuccess;
export const getKeyclockRequest = (state) => state.auth.authRequest;
