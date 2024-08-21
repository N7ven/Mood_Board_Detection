import { Endpoint } from './end-point';
import {
  losApibaseUrl,
  masterService
} from './config';

const version = process.env.REACT_APP_VERSION;

// eslint-disable-next-line import/prefer-default-export
export const APIConstant = {
  signUp: `${version}${masterService}${Endpoint.signUp}`,
  logIn: `${version}${masterService}${Endpoint.logIn}`,
  forgotPassword: `${losApibaseUrl}${masterService}${Endpoint.forgotPassword}`,
  confirmOTP: `${losApibaseUrl}${masterService}${Endpoint.confirmOTP}`
};

