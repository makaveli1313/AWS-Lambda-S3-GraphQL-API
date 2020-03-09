const dotenv = require('dotenv').config();
const aws = require('aws-sdk');

const s3 = new aws.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.ID_SECRET
});

// @desc Uploads a file to S3 bucket
// @route POST /file/upload
// @access Public
exports.fileUpload = async (req, res, next) => {
  const params = {
    Bucket: process.env.BUCKET,
    Key: req.files.file.name,
    Body: req.files.file.data
  };
  try {
    await s3.upload(params, function(s3Err, data) {
      if (s3Err) throw s3Err;
      res.send(`File uploaded successfully at ${data.Location}`);
    });
  } catch (err) {
    console.log(err);
  }
};
