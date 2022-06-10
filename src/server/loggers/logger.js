const winston = require("winston");

const options = {
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "all.log" }),
  ],
  exitOnError: false,
});

module.exports = logger;
