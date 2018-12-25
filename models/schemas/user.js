"use strict";

const constants = require("../../utils/constants");
const errors = require("../../utils/errors");

const VALIDATION_ERROR_MESSAGES = errors.SCHEMA_VALIDATION_ERROR_MESSAGES;
const ERROR_CODES = errors.ERROR_CODES;



const signInUserValidate = {
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "errorMessages": {
        "type": {
          "code": ERROR_CODES.BAD_REQUEST.EMAIL_TYPE,
          "message": VALIDATION_ERROR_MESSAGES.TYPE.EMAIL
        }
      }
    },
    "password": {
      "type": "string",
      "errorMessages": {
        "type": {
          "code": ERROR_CODES.BAD_REQUEST.PASSWORD_TYPE,
          "message": VALIDATION_ERROR_MESSAGES.TYPE.PASSWORD
        }
      }
    }
  },
  "required": ["email", "password"],
  "additionalProperties": false,
  "errorMessages": {
    "required": {
      "email": {
        "code": ERROR_CODES.BAD_REQUEST.EMAIL_REQUIRED,
        "message": VALIDATION_ERROR_MESSAGES.REQUIRED.EMAIL
      },
      "password": {
        "code": ERROR_CODES.BAD_REQUEST.PASSWORD_REQUIRED,
        "message": VALIDATION_ERROR_MESSAGES.REQUIRED.PASSWORD
      }
    }
  }
};

const signUpUserValidate = {
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "errorMessages": {
        "type": {
          "code": ERROR_CODES.BAD_REQUEST.EMAIL1_TYPE,
          "message": VALIDATION_ERROR_MESSAGES.TYPE.EMAIL1
        }
      }
    },
    "username": {
      "type": "string",
      "errorMessages": {
        "type": {
          "code": ERROR_CODES.BAD_REQUEST.USERNAME_TYPE,
          "message": VALIDATION_ERROR_MESSAGES.TYPE.USERNAME
        }
      }
    },
    "password": {
      "type": "string",
      "errorMessages": {
        "type": {
          "code": ERROR_CODES.BAD_REQUEST.PASSWORD1_TYPE,
          "message": VALIDATION_ERROR_MESSAGES.TYPE.PASSWORD1
        }
      }
    },
    "user_id": {
      "type": "number",
      "errorMessages": {
        "type": {
          "code": ERROR_CODES.BAD_REQUEST.USER_ID_TYPE,
          "message": VALIDATION_ERROR_MESSAGES.TYPE.USER_ID
        }
      }
    }
  },
  "required": ["email","username","password","user_id"],
  "additionalProperties": false,
  "errorMessages": {
    "required": {
      "email": {
        "code": ERROR_CODES.BAD_REQUEST.EMAIL1_REQUIRED,
        "message": VALIDATION_ERROR_MESSAGES.REQUIRED.EMAIL1
      },
      "username": {
        "code": ERROR_CODES.BAD_REQUEST.USERNAME_REQUIRED,
        "message": VALIDATION_ERROR_MESSAGES.REQUIRED.USERNAME
      },
      "password": {
        "code": ERROR_CODES.BAD_REQUEST.PASSWORD1_REQUIRED,
        "message": VALIDATION_ERROR_MESSAGES.REQUIRED.PASSWORD1
      },
      "user_id": {
        "code": ERROR_CODES.BAD_REQUEST.USER_ID_REQUIRED,
        "message": VALIDATION_ERROR_MESSAGES.REQUIRED.USER_ID
      }
    }
  }
};

// Error constructor
const constructError = function (errors) {
  const err = errors[0];
  const dataPath = err.dataPath.replace(".", "");
  const errMessage = err.message;

  let code = null;
  let message = null;
  console.log(JSON.stringify(err), err.keyword);

  if (err.keyword === "required") {
    console.log("inside required");
    code = err.parentSchema.errorMessages.required[err.params.missingProperty].code;
    message = err.parentSchema.errorMessages.required[err.params.missingProperty].message;
  }

  if (err.keyword === "additionalProperties") {
    console.log("inside additionalProperties");
    code = ERROR_CODES.BAD_REQUEST.ADDITIONAL_PROPERTY;
    message = "You should not send additional property: " + err.params.additionalProperty;
  }

  if (err.keyword === "minProperties") {
    console.log("inside minProperties");
    code = ERROR_CODES.BAD_REQUEST.MIN_PROPERTY;
    message = "You must send at least one of the following properties - " + Object.keys(err.parentSchema.properties).toString();
  }

  if (!code) {
    console.log("code not found", err.parentSchema.errorMessages);
    code = err.parentSchema.errorMessages[err.keyword].code;
  }

  if (!message) {
    console.log("message not found", err.parentSchema);
    message = err.parentSchema.errorMessages[err.keyword].message;
  }

  if (!message) {
    message = dataPath + " " + errMessage;
  }

  if (!code) {
    code = ERROR_CODES.UNKNOWN_ERROR.CODE;
  }

  return CustomeError._400(code, message);
};

module.exports = {
  constructError: constructError,
  signInUserValidate:signInUserValidate,
  signUpUserValidate:signUpUserValidate
}