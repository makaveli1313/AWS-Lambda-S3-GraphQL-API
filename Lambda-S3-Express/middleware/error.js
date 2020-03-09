const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(err.stack);
  res
    .status(error.statusCode || 500)
    .json({ succes: false, error: error.message });
};

module.exports = errorHandler;