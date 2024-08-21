import * as moment from 'moment';

const currencyFormat = (num) => {
  try {
    return `₹ ${num.toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}`;
  } catch (e) {
    return num;
  }
};

const getDifferenceInDays = (appliedOn) => {
  if (!appliedOn) return 0;
  const curDate = moment(new Date()).toDate();
  const secDate = moment(appliedOn).toDate();
  const days = moment(curDate).diff(secDate, 'days');
  return days;
};

const calculateEmiForLoan = (loanAmount, roi, tenure = 1) => {
  if (!(loanAmount && roi && tenure)) return '0';
  const monthlyROI = (Number(roi) / 1200);
  const offeredEMIValue = ((Number(loanAmount)
      * Number(monthlyROI)) * ((1 + Number(monthlyROI)) ** Number(tenure)))
      / (((1 + Number(monthlyROI)) ** Number(tenure)) - 1);
  return offeredEMIValue;
};

const convertCurrencyFormat = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR'
}).format(value);

export {
  calculateEmiForLoan,
  currencyFormat,
  getDifferenceInDays,
  convertCurrencyFormat
};
