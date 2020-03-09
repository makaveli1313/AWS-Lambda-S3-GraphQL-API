const express = require('express');
const cors = require('cors');
const private = require('./routes/private');
const public = require('./routes/public');
const dotenv = require('dotenv').config();
const fileUpload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const server = express();

//middleware
server.use(
  fileUpload({
    createParentPath: true
  })
);
server.use(cors());
server.use(express.urlencoded({ extended: true, strict: false }));
server.use(express.json());

//Routes
server.use('/v1/api', private);
server.use('/file/upload', public);

server.use(errorHandler);

module.exports = server;
