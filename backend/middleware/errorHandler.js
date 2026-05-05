const { constants } = require('../constants');

const errorHandler = (error, req, res, next) => {

    if (res.headersSent) {
        return next(error); 
    }

    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            return res.status(statusCode).json({
                title: "Validation Failed",
                message: error.message,
                stackTrace: error.stack
            });

        case constants.NOT_FOUND:
            return res.status(statusCode).json({
                title: "Not Found",
                message: error.message,
                stackTrace: error.stack
            });

        case constants.UNAUTHORIZED:
            return res.status(statusCode).json({
                title: "Unauthorized",
                message: error.message,
                stackTrace: error.stack
            });

        case constants.FORBIDDEN:
            return res.status(statusCode).json({
                title: "Forbidden",
                message: error.message,
                stackTrace: error.stack
            });

        case constants.SERVER_ERROR:
            return res.status(statusCode).json({
                title: "Server Error",
                message: error.message,
                stackTrace: error.stack
            });

        default:
            return res.status(500).json({
                title: "Unknown Error",
                message: error.message
            });
    }
};

module.exports = errorHandler;