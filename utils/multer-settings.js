const multer = require("multer");
const path = require("path");
const constants = require("./constants");
const govDocUploadDirPath = path.join(__dirname, "..", constants.UPLOAD_DIR_PATH.GOV_DOC_UPLOAD);

let govDocStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("\ndestination: >>>>>>>>>>", govDocUploadDirPath);
    cb(null, govDocUploadDirPath);
  },
  filename: function (req, file, cb) {
    // console.log("\nfileName: >>>>>>>>>>", file.originalname);
    let ext = "";
    if (file.originalname) {
      ext = file.originalname.split(".");
      ext = ext[ext.length - 1];
    }
    cb(null, file.fieldname + "@" + req.user._id + "@" + Date.now() + "." + ext);
  }
});

let uploadGovDocConfig = multer({
  storage: govDocStorage,
  limits: {
    fileSize: 5000000 // 5MB
  },
  fileFilter: function (req, file, cb) {
    // console.log("\nfileFilter >>>>>>>>>> ", file);
    // /\.(jpg|jpeg|png|gif)$/
    if (!file.originalname.match(/\.(pdf|jpg|jpeg|png|gif)$/)) {
      return cb(CustomError._400(errors.ERROR_CODES.BAD_REQUEST.GOV_DOC_PDF_UPLOAD, errors.SCHEMA_VALIDATION_ERROR_MESSAGES.UPLOAD_FILE_ERROR.GOV_DOC_PDF_UPLOAD), false);
    } else {
      return cb(null, true);
    }
  }
}).fields([
  { name: "government_proof", maxCount: 1 },
  { name: "address_proof", maxCount: 1 }
]);

/** code to configure user upload profile image starts */


const userUploadDirPath = path.join(__dirname, "..", constants.UPLOAD_DIR_PATH.USER_IMAGE);

let userImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, userUploadDirPath);
  },
  filename: function (req, file, cb) {
    let exploded_name = file.originalname.split(".");
    let ext = exploded_name[exploded_name.length - 1];
    cb(null, file.fieldname + "@" + req.user._id + "@" + Date.now() + "." + ext);
  }
});

let uploadUserImageConfig = multer({
  storage: userImageStorage,
  limits: {
    fileSize: 15000000 // 5MB
  },
  fileFilter: function (req, file, cb) {
    // console.log("\nfileFilter >>>>>>>>>> ", file);
    // /\.(jpg|jpeg|png|gif)$/
    /* if (!file.originalname.match(/\.(pdf)$/)) {
              return cb(CustomError._400(errors.ERROR_CODES.BAD_REQUEST.GOV_DOC_PDF_UPLOAD, errors.SCHEMA_VALIDATION_ERROR_MESSAGES.UPLOAD_FILE_ERROR.GOV_DOC_PDF_UPLOAD), false);
            } else {
            */
    return cb(null, true);
    /* } */
  }
}).fields([
  { name: "user_image", maxCount: 1 }
]);

/** code to configure user upload profile image ends */


module.exports = {
  uploadGovDocConfig: uploadGovDocConfig,
  uploadUserImageConfig: uploadUserImageConfig
};