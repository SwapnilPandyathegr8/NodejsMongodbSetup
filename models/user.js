"use strict";

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const uuidv4 = require("uuid/v4");
const crypto = require('crypto'); 

const utils = require("../utils/utils");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique:true,
    required:true,
  },
  user_id: {
    type: String,
    unique:true,
    required:true,
  },
  username: {
    type: String,
    unique:true,
    required:true,
  },
  password: {
    type: String,
    unique:true,
    required:true,
  },  
}, { strict: true, timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

UserSchema.plugin(utils.uuidPlugin);
module.exports = mongoose.model("users", UserSchema);
