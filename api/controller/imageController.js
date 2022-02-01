const express = require('express');
const multer = require('multer');
const S3 = require('aws-sdk/clients/s3');
const multerS3 = require('multer-s3');
const catchAsync = require('../utils/catchAsync');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true); // first para is for error
  } else {
    cb(
      new AppError('Not an image file, Please upload only images', 400),
      false
    );
  }
};

const upload = multer({
  fileFilter: multerFilter,
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

exports.multerStream = upload.single('image');
