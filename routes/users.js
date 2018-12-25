"use strict";

const router = require("express-promise-router")();
const Bluebird = require("bluebird");


const validations = require("../utils/validations");
const UserController = require("../controllers/user");
const utils = require("../utils/utils");
const customErrors = require("../utils/errors");


/* user routes starts */
router.post("/sign-up", function (req, res, next) {
  return Bluebird.try(async() => {

      if(!validations.signUpUserValidate(req.body)) {
          throw validations.constructError(validations.signUpUserValidate.errors);  
      }
      // Code after api validation
      let response = {success:false};
      let postData = req.body;
      let checkUsernameExists = await UserController.checkUsernameExists(postData.username);
      if(checkUsernameExists){
        response.success = false;
        response.errorCode = customErrors.ERROR_CODES.DATABASE_ERROR.USERNAME_EXISTS.CODE;
        response.reason = customErrors.ERROR_CODES.DATABASE_ERROR.USERNAME_EXISTS.MESSAGE;
      }else{
        let checkEmailExists = await UserController.checkEmailExists(postData.email);
        if(checkEmailExists){
          response.success = false;
          response.errorCode = customErrors.ERROR_CODES.DATABASE_ERROR.EMAIL_EXISTS.CODE;
          response.reason = customErrors.ERROR_CODES.DATABASE_ERROR.EMAIL_EXISTS.MESSAGE;
        }else{
          let checkUserIdExists = await UserController.checkUserIdExists(postData.user_id);
          if(checkUserIdExists){
            response.success = false;
            response.errorCode = customErrors.ERROR_CODES.DATABASE_ERROR.USER_ID.CODE;
            response.reason = customErrors.ERROR_CODES.DATABASE_ERROR.USER_ID.MESSAGE;
          }else{
            let isUserAdded = await UserController.createNewUser(postData);
            let signValues = { id: isUserAdded._id };
            let token = await utils.signToken(signValues);
            response.success = true;
            response.data = {userDetails:isUserAdded,token:token};
          }
        }
      }
      return res.status(200).send(response);
  });
});

router.post("/sign-in", function (req, res, next) {
  return Bluebird.try(async() => {

      if (!validations.signInUserValidate(req.body)) {
          throw validations.constructError(validations.signInUserValidate.errors);  
      }
      // Code after api validation
      let postData = req.body;
      let userFound = await UserController.findUserByEmailOrUsername(postData.email);
      let response = {success:false};
      if(userFound){
        let isPasswordValid = utils.matchPassword(postData.password,userFound.password);
        if(isPasswordValid){
          let signValues = { id: userFound._id };
          let token = await utils.signToken(signValues);
          response.success = true;
          response.data = {userDetails:userFound,token:token};
        }else{
          response.success = false;
          response.errorCode = customErrors.ERROR_CODES.DATABASE_ERROR.INVALID_PASSWORD.CODE;
          response.reason = customErrors.ERROR_CODES.DATABASE_ERROR.INVALID_PASSWORD.MESSAGE;
        }
      }else{
        response.success = false;
          response.errorCode = customErrors.ERROR_CODES.DATABASE_ERROR.INVALID_EMAIL_OR_USERNAME.CODE;
          response.reason = customErrors.ERROR_CODES.DATABASE_ERROR.INVALID_EMAIL_OR_USERNAME.MESSAGE;
      }
      return res.status(200).send(response); 
  });
});

/* user routes ends */

module.exports = router;
