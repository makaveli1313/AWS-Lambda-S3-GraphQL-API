const aws = require('aws-sdk');
const dotenv = require('dotenv').config();
const s3 = new aws.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.ID_SECRET
});

//@desc Listing all keys (filenames) from a S3 bucket
exports.listAllKeys = (params, out = []) =>
  new Promise((resolve, reject) => {
    s3.listObjectsV2(params)
      .promise()
      .then(({ Contents, IsTruncated, NextContinuationToken }) => {
        out.push(...Contents);
        !IsTruncated
          ? resolve(out)
          : resolve(
              listAllKeys(
                Object.assign(params, {
                  ContinuationToken: NextContinuationToken
                }),
                out
              )
            );
      })
      .catch(reject);
  });
