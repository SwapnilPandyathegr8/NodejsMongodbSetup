"use strict";

const ERRORS = require("./errors").ERRORS;

class MyError extends Error {
  constructor (name, statusCode, message, errorCode = ERRORS.UNKNOWN_ERROR.CODE) {
    super(message);
    this.message = message;
    this.name = name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

function _200 (errorCode, message = "Failure") {
  return new MyError("SuccessError", 200, message, errorCode);
}

function _400 (errorCode, message = "Bad Request") {
  return new MyError("BadRequestError", 400, message, errorCode);
}

function _401 (errorCode, message = "Unauthorized") {
  return new MyError("UnauthorizedError", 401, message, errorCode);
}

function _402 (errorCode, message = "Payment Required") {
  return new MyError("PaymentRequiredError", 402, message, errorCode);
}

function _403 (errorCode, message = "Forbidden") {
  return new MyError("ForbiddenError", 403, message, errorCode);
}

function _404 (errorCode, message = "Not Found") {
  return new MyError("NotFoundError", 404, message, errorCode);
}

function _409 (errorCode, message = "Conflict") {
  return new MyError("ConflictError", 409, message, errorCode);
}

function _429 (errorCode, message = "Too Many Requests") {
  return new MyError("TooManyRequestsError", 429, message, errorCode);
}

function _500 (errorCode, message = "Internal Server Error") {
  return new MyError("InternalServerError", 500, message, errorCode);
}

function _666 (errorCode, message = "The Number of the Beast") {
  return new MyError("DEVILSDANCE", 666, message, errorCode);
}

 

module.exports = {
  _200: _200,
  _400: _400,
  _401: _401,
  _402: _402,
  _403: _403,
  _404: _404,
  _409: _409,
  _429: _429,
  _500: _500,
  _666: _666
};
