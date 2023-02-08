const winston = require('winston');

const consoleLoggingFormat = winston.format.printf(
  ({ level, message, label, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
  }
);

const loggingFormat = winston.format.printf(
  ({ level, message, label, timestamp }) => {
    return `${timestamp} (${level}): ${message}`;
  }
);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    loggingFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        consoleLoggingFormat
      ),
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'combined.log',
    }),
  ],
});

module.exports = {
  logger: logger,
};
