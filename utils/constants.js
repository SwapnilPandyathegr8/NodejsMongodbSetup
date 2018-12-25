"user strict";

const PHONE_REGEX = "^[0-9]{9,10}$";
const LENGTHS = {
  FIRST_NAME: {
    MIN: 1,
    MAX: 255
  },
  LAST_NAME: {
    MIN: 1,
    MAX: 255
  },
  OTP: {
    MIN: 4,
    MAX: 4
  },
  USER_DETAILS: {
    MIN: 1,
    MAX: 255
  },
  INTRUSTED_IN: {
    MIN: 1,
    MAX: 255
  }
};

// constants to define PAGINATION
const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 50;

// this is the name of place holder image this image will be in root of public folder
const PLACEHOLDER_IMAGE = "placeholder-150x150.png";

const UPLOAD_DIR_PATH = {
  USER_IMAGE:'public/user-images'  
};



const SSH_PASSWORD_KEY = "198a38074880a9c67ace9c865eeeb0c8";
const BASE_IMAGE_UPLOAD_PATH = "public/images";
//const BASE_IMAGE_UPLOAD_PATH = "../images-outside";

module.exports = {
  PHONE_REGEX: PHONE_REGEX,
  LENGTHS: LENGTHS,
  PLACEHOLDER_IMAGE: PLACEHOLDER_IMAGE,
  DEFAULT_OFFSET:DEFAULT_OFFSET,
  DEFAULT_LIMIT:DEFAULT_LIMIT,
  UPLOAD_DIR_PATH:UPLOAD_DIR_PATH,
  SSH_PASSWORD_KEY:SSH_PASSWORD_KEY,
  BASE_IMAGE_UPLOAD_PATH:BASE_IMAGE_UPLOAD_PATH
};
