const dotenv = require('dotenv').config();
const aws = require('aws-sdk');
const { listAllKeys } = require('../helpers/listAllKeys');
const { distance } = require('../helpers/distance');

const s3 = new aws.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.ID_SECRET
});

// @desc Get single location data
// @route POST /api/v1/:location
// @access Private
exports.getLocationData = async (req, res, next) => {
  const { secret, name } = req.body;

  //Checking client "seacret" against .env secret. In real case scenario I would 
  //use some kind of Auth.
  if (secret === process.env.SECRET) {
    const params = {
      Bucket: process.env.BUCKET,
      Key: `${name}.json`
    };
    try {
      const response = await s3.getObject(params).promise();
      const location = JSON.parse(response.Body);
      const distanceOffice = await distance(
        location.latitude,
        location.longitude
      );
      const message = 'Success';

      res.json({ ...location, name, distanceOffice, message });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.json({ message: 'Authentication Required' });
  }
};

// @desc Get location names
// @route POST /api/v1/
// @access Private
exports.getLocationNames = async (req, res, next) => {
  const { secret } = req.body;

  if (secret === process.env.SECRET) {
    const params = {
      Bucket: process.env.BUCKET
    };

    try {
      const names = await listAllKeys(params)
        .then(locations => {
          const locationNames = locations.map(e => e.Key.slice(0, -5));
          return locationNames;
        })
        .catch(console.log);

      const message = 'Success';

      res.json({ names, message });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.json({ message: 'Authentication Required' });
  }
};
