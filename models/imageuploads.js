"use strict";

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const uuidv4 = require("uuid/v4");
const crypto = require('crypto'); 

const utils = require("../utils/utils");

const Schema = mongoose.Schema;

const ImageUploadsSchema = new Schema({
  uploaded_by: {
    type: String,
    ref:"users",
    required:true,
  },
  image_url: [{
    type: String,
    required:true,
  }],
  image_url_cropped: [{
    type: String,
    required:true,
  }],
  content: [{
    type: String,
    required:true,
  }],
  folder: {
    type: String,
    required:true,
  },
  is_processed:{
    type: String,
    enum:["pending","completed","failed"],
    default:"pending"
  }  
}, { strict: true, timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

ImageUploadsSchema.plugin(utils.uuidPlugin);
module.exports = mongoose.model("imageuploads", ImageUploadsSchema);
