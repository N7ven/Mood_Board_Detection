import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from '../Assets/Images/icons/error.svg';
import Success from '../Assets/Images/icons/success.svg';

function ErrorIcon() {
  return (
    <i>
      <img src={Error} alt="error" />
    </i>
  );
}

function SuccessIcon() {
  return (
    <i>
      <img src={Success} alt="success" />
    </i>
  );
}

// eslint-disable-next-line jest/require-hook
toast.configure();

export const showErrorMessage = (msg) => toast.error(msg, {
  icon: ErrorIcon
});
export const showSuccessMessage = (msg) => toast.success(msg, {
  icon: SuccessIcon
});
