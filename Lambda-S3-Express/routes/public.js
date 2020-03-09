const express = require('express');
const router = express.Router();
const { fileUpload } = require('../controllers/upload');

router.route('/').post(fileUpload);

module.exports = router;
