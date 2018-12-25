"use strict";

const ERROR_CODES = {
  AUTH_TOKEN_PRIVATE_KEY_NOT_FOUND: {
    CODE: 50001,
    MESSAGE: "Private key not found for auth token signing"
  },
  AUTH_TOKEN_PUBLIC_KEY_NOT_FOUND: {
    CODE: 50002,
    MESSAGE: "Public key not found for auth token verifying"
  },
  NOT_FOUND: {
    CODE: 404,
    MESSAGE: "Not found"
  },
  UNKNOWN_ERROR: {
    CODE: 999999,
    MESSAGE: "Something went wrong"
  },
  USER_NOT_FOUND: {
    CODE: 999991,
    MESSAGE: "User not found"
  },
  BAD_REQUEST: {
    ADDITIONAL_PROPERTY:10000,
    INVALID_PASSWORD: 10001,
    EMAIL_TYPE:10002,
    PASSWORD_TYPE:10003,
    EMAIL_REQUIRED:10004,
    PASSWORD_REQUIRED:10005,
    EMAIL1_TYPE:10006,
    USERNAME_TYPE:10007,
    PASSWORD1_TYPE:10008,
    EMAIL1_REQUIRED:10009,
    USERNAME_REQUIRED:10010,
    PASSWORD1_REQUIRED:10011,
    USER_ID_TYPE:10012,
    USER_ID_REQUIRED:10013
  },
  DATABASE_ERROR: {
    USER_EXIST: {
      CODE: 40001,
      MESSAGE: "User already exist"
    },
    INVALID_PASSWORD: {
      CODE: 40002,
      MESSAGE: "Please enter your valid password"
    },
    INVALID_EMAIL_OR_USERNAME:{
      CODE: 40003,
      MESSAGE: "Please enter your valid username or email address"
    },
    USERNAME_EXISTS:{
      CODE: 40004,
      MESSAGE: "Username is already registered"
    },
    EMAIL_EXISTS:{
      CODE: 40005,
      MESSAGE: "Email is already registered"
    },
    USER_ID:{
      CODE: 40006,
      MESSAGE: "This User id already exists"
    }
  },
  AUTH_TOKEN: {
    REQUIRED: {
      CODE: 41001,
      MESSAGE: "Auth token is required"
    },
    NOT_VALID: {
      CODE: 41002,
      MESSAGE: "Auth token is not valid"
    }
  }
};

const SCHEMA_VALIDATION_ERROR_MESSAGES = {
  PATTERN: {
    PHONE: "Phone should be a string of 9-10 digits",
  },
  TYPE: {
    PHONE:"Phone should be a string",
    EMAIL:"Username or Email address should be string",
    PASSWORD:"Password should be string",
    EMAIL1:"Email should be string",
    USERNAME:"Username should be string",
    PASSWORD1:"Password should be string",
    USER_ID:"User id should be a number"
  },
  LENGTH: {
    MIN_LENGTH: {
      FIRST_NAME: "First name length should be greater than 1",
    },
    MAX_LENGTH: {
      FIRST_NAME: "First name length should be smaller than 255",
    }
  },
  REQUIRED: {
    FIRST_NAME: "First name is required",
    EMAIL:"Username or Email address is required",
    PASSWORD:"Password is required",
    EMAIL1:"Email address is required",
    USERNAME:"Username is required",
    PASSWORD1:"Password is required",
    USER_ID:"User id is required"
  },
  EXISTS: {
    USER_EMAIL: "Email address is already registered",
  },
  ENUM: {
    GENDER: "Gender is not valid",
  },
  FORMAT: {
    IMAGE_URL: "Image Url is not valid"
  },
  MIN: {
    LATITUDE: "Min Latitude value is not valid",
  },
  MAX: {
    LATITUDE: "Max Latitude value is not valid",
  },
  UNIQUE: {
    LOOKING_FOR_UNIQUE: "Looking for contains duplicate values",
  },
  UPLOAD_FILE_ERROR: {
    GOV_DOC_PDF_UPLOAD: "Only .pdf file is allowed",
  },
  NOT_FOUND: {
    NO_DATA_AVAILABLE:"No Data Avaialble",
  }
};

module.exports = {
  ERROR_CODES: ERROR_CODES,
  SCHEMA_VALIDATION_ERROR_MESSAGES: SCHEMA_VALIDATION_ERROR_MESSAGES
};
