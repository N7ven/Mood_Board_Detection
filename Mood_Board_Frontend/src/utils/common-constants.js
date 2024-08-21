const LOAN_APPLICATION_STATUS = {
  SUBMITTED: 'SUBMITTED',
  RESUBMITTED: 'RESUBMITTED',
  PENDING: 'PENDING',
  PENDING_ADDITIONAL_DETAILS: 'PENDING_ADDITIONAL_DETAILS',
  UNDERWRITING: 'UNDERWRITING',
  APPROVING: 'APPROVING',
  REJECTED: 'REJECTED',
  PENDING_SECOND_APPROVAL: 'PENDING_SECOND_APPROVAL',
  APPROVED: 'APPROVED',
  DISBURSED: 'DISBURSED',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED'
};

const LOAN_APPLICATION_PROCESS = {
  APPROVING: 'APPROVING',
  UNDERWRITING: 'UNDERWRITING'
};

const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMINISTRATOR: 'ADMINISTRATOR',
  APPROVER: 'APPROVER',
  UNDERWRITER: 'UNDERWRITER',
  VERIFIER: 'VERIFIER'
};

const FILE_TYPE = {
  PDF: 'application/pdf',
  JPEG: 'image/jpeg',
  PNG: 'image/png'
};

const APP_LANGUAGES = [
  {
    text: 'English',
    id: 'en'
  },
  {
    text: 'தமிழ்',
    id: 'ta'
  },
  {
    text: 'हिंदी',
    id: 'hi'
  },
  {
    text: 'తెలుగు',
    id: 'te'
  },
  {
    text: 'മലയാളം',
    id: 'ml'
  },
  {
    text: 'ಕನ್ನಡ',
    id: 'kn'
  },
  {
    text: 'عربي',
    id: 'ar'
  },
  {
    text: 'मराठी',
    id: 'mr'
  },
  {
    text: 'ગુજરાતી',
    id: 'gu'
  }
];

const TYPE = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
};

const LOAN_TYPES = {
  PERSONAL_LOAN: 'Personal Loan',
  HOUSING_LOAN: 'Housing Loan',
  VEHICLE_LOAN: 'Vehicle Loan',
  LOAN_AGAINST_PROPERTY: 'Loan Against Property',
  LOAN_AGAINST_DEPOSIT: 'Loan Against Deposit',
  GOLD_LOAN: 'Gold Loan'
};

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PHONE_REGEX = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const TABLE_PROPERTIES = {
  ROWS_PER_PAGE: 10,
  DEFAULT_SKIP: 0
};

export const DROP_DOWN = {
  LOCATION_TYPE: 1,
  PRODUCT_TYPE: 2,
  CC_OD: 3,
  TERM_LOAN: 4,
  NUMERIC_VALUE: 5,
  CUSTOMER_TYPE: 6,
  DEVIATION: 6,
  ASSET_CLASS: 9,
  STATEMENT_FRE: 10,
  CHARGE_BASIS: 11,
  INTEREST_BASIS: 12,
  DOCUMENT_TYPE: 13,
  DOCUMENT_FORMAT: 16,
  CRITERIS_LIST: 17,
  EDUCATION: 20,
  HOLIDAY: 22,
  HIGH_RISK_OCCUPATION: 25,
  WORKFLOW_FIELDS: 26,
  OCCUPATION: 27,
  EMPLOYMENT_TYPE_ID: 29,
  NEGATIVE_OCCUPATION: 24,
  SEQUENCE_STEPS: 23,

  // Code data
  GENDER: 1,
  LOAN_APPLICATION_TYPE: 2,
  EMPLOYMENT_TYPE: 3,
  EDUCATION_CODE: 4,
  MARITAL_STATUS_CODE: 5
};

const ERROR_TYPE = {
  INFO: 1,
  WARNING: 2,
  CONFIRM: 3,
  SUCCESS: 4,
  STOP: 5
};

export {
  LOAN_APPLICATION_STATUS,
  ROLES,
  APP_LANGUAGES,
  LOAN_APPLICATION_PROCESS,
  FILE_TYPE,
  TYPE,
  LOAN_TYPES,
  ERROR_TYPE
};
