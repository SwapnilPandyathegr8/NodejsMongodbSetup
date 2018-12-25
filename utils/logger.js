/**
 * Created by vinay on 8/10/2016.
 */

const winston = require("winston");
winston.transports.DailyRotateFile = require("winston-daily-rotate-file");

let ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";
ENV = (ENV == "dev" || ENV == "development") ? "dev" : ENV;
ENV = (ENV == "stag" || ENV == "staging") ? "stag" : ENV;
ENV = (ENV == "prod" || ENV == "production") ? "prod" : ENV;

let config = {
  levels: {
    error: 0,
    verbose: 1,
    warn: 2,
    silly: 3,
    info: 4,
    debug: 5,
    data: 6
  },
  colors: {
    error: "red",
    debug: "blue",
    warn: "yellow",
    data: "grey",
    info: "green",
    verbose: "cyan",
    silly: "magenta"
  }
};

let transport;
if (ENV === "dev" || ENV === "stag" || !ENV) {
  transport = [
    new winston.transports.Console({
      level: "data",
      handleExceptions: true,
      json: false,
      colorize: true
    }),
    new winston.transports.DailyRotateFile({
      name: "verbose-logs",
      filename: "./logs/application.log",
      handleExceptions: true,
      level: "info",
      colorize: true,
      datePattern: "yyyy-MM-dd.",
      prepend: true
    }),
    new winston.transports.DailyRotateFile({
      name: "error-logs",
      filename: "./logs/error.log",
      level: "error",
      handleExceptions: true,
      colorize: true,
      datePattern: "yyyy-MM-dd.",
      prepend: true
    })
  ];
} else if (ENV === "prod") {
  transport = [
    new winston.transports.DailyRotateFile({
      name: "verbose-logs",
      filename: "./logs/application.log",
      handleExceptions: true,
      level: "info",
      colorize: true,
      datePattern: "yyyy-MM-dd.",
      prepend: true
    }),
    new winston.transports.DailyRotateFile({
      name: "error-logs",
      filename: "./logs/error.log",
      level: "error",
      handleExceptions: true,
      colorize: true,
      datePattern: "yyyy-MM-dd.",
      prepend: true
    }),
    new winston.transports.Console({
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ];
}

let logger = new (winston.Logger)({
  exitOnError: false,
  transports: transport,
  exceptionHandlers: [
    new winston.transports.DailyRotateFile({
      filename: "./logs/exceptions.log",
      handleExceptions: true,
      humanReadableUnhandledException: true,
      datePattern: "yyyy-MM-dd.",
      prepend: true
    })
  ],
  levels: config.levels,
  colors: config.colors
});

module.exports = logger;
module.exports.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};