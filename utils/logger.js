const winston = require('winston');

const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
    level: 'info', // Log only if the level is set to 'info' or more severe. Change to 'debug', 'warn', 'error' based on your need
    format: logFormat,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                logFormat
            )
        }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

module.exports = logger;