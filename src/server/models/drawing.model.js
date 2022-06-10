const { PUBLIC, PRIVATE } = require("@src/helpers/constants");

module.exports = (sequelize, Sequelize) => {
  const Drawing = sequelize.define("drawings", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    drawingData: {
      type: Sequelize.TEXT,
    },
    timeTaken: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM(PUBLIC, PRIVATE),
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  });

  return Drawing;
};
