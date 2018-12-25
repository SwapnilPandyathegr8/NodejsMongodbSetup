"use strict";

const router = require("express-promise-router")();
const Bluebird = require("bluebird");
const authentication = require("../middleware/authentication");
const fs = require("fs");
const path = require('path');
const AWS = require('aws-sdk');
//configuring the AWS environment
AWS.config.update({
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_KEY
  });

const constants = require("../utils/constants");
const utils = require("../utils/utils");

const baseImageUploadPath = constants.BASE_IMAGE_UPLOAD_PATH;

/* Images routes ends */
router.get("/unprocessed-images", [authentication.authenticate] ,function (req, res, next) {
    return Bluebird.try(async() => {        
        let unProcessedImages = utils.getFilesFromDir(baseImageUploadPath,[".png",".jpg",".jpeg"]);
        if(unProcessedImages){
            res.json({unProcessedImages:unProcessedImages});
        }else{
            res.json({unProcessedImages:false});
        }
    });
});

router.get("/sample-upload-image" ,function (req, res, next) {
    let s3 = new AWS.S3();
    let filePath = "./public/images/folder1/download.png";

    //configuring parameters
    var params = {
    Bucket: 'imagetotextprocessing',
    Body : fs.createReadStream(filePath),
    Key : "folder/"+Date.now()+"_"+path.basename(filePath)
    };

    s3.upload(params, function (err, data) {
    //handle error
    if (err) {
        res.json(err);
        //console.log("Error", err);
    }

    //success
    if (data) {
        console.log("Uploaded in:", data.Location);
        res.json(data);
    }
    });

});

/* Images routes ends */

module.exports = router;