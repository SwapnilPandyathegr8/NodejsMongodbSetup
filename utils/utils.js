"use strict";

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const Bluebird = require("bluebird");
const uuidv4 = require("uuid/v4");

const CustomError = require("./custom-error");
const errors = require("./errors").ERROR_CODES;
const validator = require("validator");

const crypto = require('crypto'); 
const constants = require("./constants");


Bluebird.promisifyAll(fs);
Bluebird.promisifyAll(jwt);

const signToken = function (value) {
  return Bluebird.try(() => {
    const dirPath = path.join(__dirname, "..", "cert");
    const fileName = process.env.AUTH_TOKEN_PRIVATE_KEY;
    if (!fileName) {
      console.error("auth token file path not found, reason .env is not set");
      throw CustomError._500(errors.AUTH_TOKEN_PRIVATE_KEY_NOT_FOUND.CODE);
    }
    return fs.readFileAsync(dirPath + "/" + fileName);
  }).then((privateKey) => {
    return jwt.signAsync({ data: value }, privateKey, { algorithm: "RS512", issuer: "iBlazing", audience: "urn:foo" });
  }).catch((error) => {
    console.error("Error while signing auth token ", error);
    throw CustomError._500(errors.UNKNOWN_ERROR.CODE);
  });
};

const verifyToken = function (token) {
  return Bluebird.try(() => {
    const dirPath = path.join(__dirname, "..", "cert");
    const fileName = process.env.AUTH_TOKEN_PUBLIC_KEY;
    if (!fileName) {
      console.error("auth token file path not found, reason .env is not set");
      throw CustomError._500(errors.AUTH_TOKEN_PUBLIC_KEY_NOT_FOUND.CODE);
    }
    return fs.readFileAsync(dirPath + "/" + fileName);
  }).then((publicKey) => {
    return jwt.verifyAsync(token, publicKey, { algorithms: ["RS512"] });
  }).catch((error) => {
    console.error("Error while verifying auth token ", error);
    throw CustomError._401(errors.AUTH_TOKEN.NOT_VALID.CODE, errors.AUTH_TOKEN.NOT_VALID.MESSAGE);
  });
};

const uuidPlugin = function (schema, options) {
  options = options || {};
  var pk = schema.add({
    _id: {
      type: String,
      default: () => uuidv4(),
      trim: true,
      lowercase: true
    }
  });

  schema.path("_id").validate(function (v) {
    console.log("validating: " + JSON.stringify(v));
    return validator.isUUID(v);
  }, "ID is not a valid GUID: {VALUE}");
};

/**
 * Consume update args object for document and can handle one level nesting.
 * Returns object for leverage by $set in Mongoose update function.
 *
 * @param args
 * @returns {{}}
 */
const objectToDotNotation = (args) => {
  const setObject = {};
  Object.keys(args).forEach((key) => {
    if (typeof args[key] === "object") {
      Object.keys(args[key]).forEach((subkey) => {
        setObject[`${key}.${subkey}`] = args[key][subkey];
      });
    } else {
      setObject[key] = args[key];
    }
  });
  return setObject;
};

const SSH_PASSWORD_KEY = constants.SSH_PASSWORD_KEY;

const encryptPasswordInSSh = function(password){
  let salt = SSH_PASSWORD_KEY;
  let hash = crypto.pbkdf2Sync(password, salt,1000, 64, `sha512`).toString(`hex`);
  return hash;
}

const matchPassword = function(password,encryptedPassword) { 
  let salt = SSH_PASSWORD_KEY;
  let hash = crypto.pbkdf2Sync(password,salt, 1000, 64, `sha512`).toString(`hex`); 
  return encryptedPassword === hash; 
};

const getFilesFromDir = function(dir, fileTypes) {
  let filesToReturn = [];
  let directories = [];
  let returnObject = false;
  function walkDir(currentPath) {
      let files = fs.readdirSync(currentPath);
      for (var i in files) {
      var curFile = path.join(currentPath, files[i]);
      if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
        filesToReturn.push(curFile.replace(dir, ''));
      } else if (fs.statSync(curFile).isDirectory()) {  
        directories.push(files[i]);
        walkDir(curFile);
      }
    }
  };
  walkDir(dir);
  //returnObject.filesToReturn = filesToReturn;
  //returnObject.directories = directories;
  let regEx;
  if(filesToReturn.length > 0){
    returnObject = {};
    filesToReturn.forEach(function(item,index){
        directories.forEach(function(item1,index1){
            if(!returnObject[item1]){
              returnObject[item1] = [];
            }
            console.log(" item1 "+item1)
            console.log(" item "+item);
            regEx = "/"+item1+"/";
            if((item.indexOf(regEx) > -1) && (returnObject[item1].indexOf(item) == -1) ){
              returnObject[item1].push(item);
            }
        });
    });
  }
  return returnObject; 
}

module.exports = {
  signToken: signToken,
  verifyToken: verifyToken,
  uuidPlugin: uuidPlugin,
  objectToDotNotation: objectToDotNotation,
  encryptPasswordInSSh:encryptPasswordInSSh,
  matchPassword:matchPassword,
  getFilesFromDir:getFilesFromDir
};
