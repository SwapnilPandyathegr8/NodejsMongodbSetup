"use strict";

const Ajv = require("ajv");
const ajv = new Ajv({
  coerceTypes: true,
  format: "full",
  verbose: true
});

const ERROR_CODES = require("./errors").ERROR_CODES;
const CustomeError = require("./custom-error");

// All Schemas
const userValidationSchema = require("../models/schemas/user");



// User Schemas
const signInUserValidate = userValidationSchema.signInUserValidate;
const signUpUserValidate = userValidationSchema.signUpUserValidate;




// User Schema Compilation
const signInUserValidateCompiled = ajv.compile(signInUserValidate);
const signUpUserValidateCompiled = ajv.compile(signUpUserValidate);
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
  signInUserValidate:signInUserValidateCompiled,
  signUpUserValidate:signUpUserValidateCompiled
};
