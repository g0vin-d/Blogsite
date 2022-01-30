const express = require('express');
const multer = require('multer');
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
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

const multerStorage = multer.memoryStorage();

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
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.multerStream = upload.single('image');

exports.uploadBlogImage = (req) => {
  if (!req.file) return;
  console.log(req.file);

  req.file.filename = `${Date.now()}_${req.file.originalname}`;

  const uploadParams = {
    Bucket: bucketName,
    Body: req.file.buffer,
    Key: req.file.filename,
  };

  return s3.upload(uploadParams).promise();
};

// exports.uploadImage = catchAsync(async (req, res, next) => {
//   const result = await uploadBlogImage(req);

//   console.log(result);

//   res.status(200).json({
//     status: 'success',
//     result,
//   });
// });

const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
};

exports.getImage = (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
};
