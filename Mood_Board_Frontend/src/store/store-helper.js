const updateState = (state, newState) => ({
  ...state,
  ...newState
});

const defaultRequestState = () => ({
  isLoading: false,
  isLoaded: false,
  hasErrors: false,
  errorDetails: null,
  failureCount: 0,
  success: null
});

const defaultLoadingState = () => ({
  isLoading: true,
  isLoaded: false,
  hasErrors: false,
  errorDetails: null,
  failureCount: 0,
  success: null
});

const defaultLoadedState = () => ({
  isLoading: false,
  isLoaded: true,
  hasErrors: false,
  errorDetails: null,
  failureCount: 0,
  success: null
});

const defaultErrorState = (error) => ({
  isLoading: false,
  isLoaded: true,
  hasErrors: true,
  errorDetails: error,
  failureCount: 1,
  success: null
});

const defaultSuccessState = (success) => ({
  isLoading: false,
  isLoaded: true,
  hasErrors: false,
  errorDetails: null,
  success
});

export {
  updateState,
  defaultRequestState,
  defaultLoadingState,
  defaultLoadedState,
  defaultErrorState,
  defaultSuccessState
};
