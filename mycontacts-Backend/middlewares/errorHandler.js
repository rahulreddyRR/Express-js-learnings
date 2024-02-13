const { constants } = require("../contants");

// optimaize the below code 
const errorHandler = (err, req, res, next) => {
    const statusCode = req.statusCode ?? 500;
    const errorMessages = {
      [constants.NOT_FOUND]: { title: "Not Found", message: err.message },
      [constants.VALIDATION_ERROR]: { title: "Validation failed", message: err.message },
      [constants.FORBIDDEN]: { title: "Forbidden", message: err.message },
      [constants.UNAUTHRAIZED]: { title: "Un Authraized", message: err.message },
    };
  
    res.status(statusCode).json({
      ...errorMessages[statusCode],
      stackTraces: err.stack,
    });
  };

module.exports = errorHandler