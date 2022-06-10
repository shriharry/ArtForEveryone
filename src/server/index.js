require("module-alias/register");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("@src/routes");
const {
  logError,
  returnError,
  logErrorMiddleware,
} = require("@src/helpers/ErrorLogger");
const logger = require("@src/loggers/logger");
const db = require("@src/models");

const server = express();
const corsOptions = {
  origin: process.env.WEB_URL || "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
server.use(cors(corsOptions));
server.use(express.json());
server.use("/api", routes);

server.use(logError);
server.use(returnError);
server.use(logErrorMiddleware);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});

db.sequelize
  .sync()
  .then(() => {
    logger.info("Drop and Resync Db");
  })
  .catch((error) => {
    logger.warn("error", error);
  });
