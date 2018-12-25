"use strict";

const Bluebird = require("bluebird");
const User = require("../models/user");
const constants = require("../utils/constants");
const utils = require("../utils/utils");
const crypto = require('crypto'); 

const createNewUser = function (userData) {
  return Bluebird.try(() => {
    
    // encrypting the password Before Saving in SSH
    userData.password = utils.encryptPasswordInSSh(userData.password);

    let user = new User(userData);
    return user.save();
  }).catch((error) => {
    console.error(error);
    return error;
  });
};

const findUserByUserId = function (userId) {
  return Bluebird.try(() => {
    return User.findById(userId);
  }).catch((error) => {
    console.error(error);
  });
};

const findUserByEmailOrUsername = function(email){
  return Bluebird.try(async() => {
      let userInfo = await User.findOne({$or:[{email:email},{username:email}]});
      if(userInfo != null){
        return userInfo;
      }else{
        return false;
      }
  });
};

const checkUsernameExists = function(username){
  return Bluebird.try(async() => {
    let userInfo = await User.findOne({username:username});
      if(userInfo != null){
        return true;
      }else{
        return false;
      }
  });
};

const checkEmailExists = function(email){
  return Bluebird.try(async() => {
    let userInfo = await User.findOne({email:email});
      if(userInfo != null){
        return true;
      }else{
        return false;
      }
  });
};

const checkUserIdExists = function(user_id){
  return Bluebird.try(async() => {
    let userInfo = await User.findOne({user_id:user_id});
      if(userInfo != null){
        return true;
      }else{
        return false;
      }
  });
}

module.exports = {
  createNewUser: createNewUser,
  findUserByUserId: findUserByUserId,
  findUserByEmailOrUsername:findUserByEmailOrUsername,
  checkUsernameExists:checkUsernameExists,
  checkEmailExists:checkEmailExists,
  checkUserIdExists:checkUserIdExists
};
