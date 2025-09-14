const AppError = require('./error-handler');
const { StatusCodes } = require('http-status-codes');

class ClientError extends AppError {
    constructor(name, meessage, explanation, statusCode) {
        super(
            name,
            meessage,
            explanation,
            statusCode
        )
    }
}

module.exports = ClientError;