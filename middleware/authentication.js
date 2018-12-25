"use strict";

const Bluebird = require("bluebird");
const utils = require("../utils/utils");
const CustomError = require("../utils/custom-error");
const errors = require("../utils/errors").ERROR_CODES;
const UserController = require("../controllers/user");

const authenticate = function (req, res, next) {
  return Bluebird.try(() => {
    let token = req.headers.authorization;
    // console.log("TOKEN ", token.split(" ")[1]);
    if (!token) {
      throw CustomError._401(errors.AUTH_TOKEN.REQUIRED.CODE, errors.AUTH_TOKEN.REQUIRED.MESSAGE);
    }

    if (token.split(" ").length !== 2) {
      throw CustomError._401(errors.AUTH_TOKEN.NOT_VALID.CODE, errors.AUTH_TOKEN.NOT_VALID.MESSAGE);
    }

    if (token.split(" ")[0] !== "Bearer") {
      throw CustomError._401(errors.AUTH_TOKEN.NOT_VALID.CODE, errors.AUTH_TOKEN.NOT_VALID.MESSAGE);
    }
    return utils.verifyToken(token.split(" ")[1]);
  }).then((verifiedToken) => {
    console.log("AUTHENTICATION SUCCESS verifiedToken ", verifiedToken);

    if (!verifiedToken.data || !verifiedToken.data.id || verifiedToken.iss !== "iBlazing") {
      throw CustomError._401(errors.AUTH_TOKEN.NOT_VALID.CODE, errors.AUTH_TOKEN.NOT_VALID.MESSAGE);
    }

    return UserController.findUserByUserId(verifiedToken.data.id).then((userDetails) => {
      // console.log("AUTHENTICATION USER DETAILS ", userDetails);
      if (userDetails) {
        req.user = userDetails;
      } else {
        throw CustomError._404(errors.USER_NOT_FOUND.CODE, errors.USER_NOT_FOUND.MESSAGE);
      }

      return next();
    });
  });
};

module.exports = {
  authenticate: authenticate
};
