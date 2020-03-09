const express = require('express');
const router = express.Router();
const {
  getLocationNames,
  getLocationData
} = require('../controllers/locations');


router.route('/').post(getLocationNames);

router.route('/:name').post(getLocationData);


module.exports = router;
