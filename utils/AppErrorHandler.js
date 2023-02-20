class AppErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "Fail!" : "Error!!";

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppErrorHandler;
