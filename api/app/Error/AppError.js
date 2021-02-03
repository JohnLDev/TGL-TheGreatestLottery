class AppError {
  constructor (message, statusCode = 400) {
    this.message = message
    this.status = statusCode
  }
}

module.exports = AppError
