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
  origin: process.env.WEB_URI || "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
server.use(cors(corsOptions));
server.use(express.json());
server.use("/api", routes);

server.use(logError);
server.use(returnError);
server.use(logErrorMiddleware);

const port = process.env.API_PORT || 8080;
server.listen(port, () => {
  logger.info(`Server is running on port ${port}.`);
});

db.sequelize
  .sync()
  .then(() => {
    logger.info("Drop and Resync Db");
  })
  .catch((error) => {
    logger.warn("error", error);
  });
