const { Op } = require("sequelize");
const { Drawing } = require("@src/models/");
const { User } = require("@src/models/");

const { DatabaseError } = require("@src/helpers/ErrorHandler");
const { PUBLIC, PRIVATE } = require("@src/helpers/constants");

const createDrawing = async (body) => {
  const { drawingData, timeTaken, status, userId } = body;
  try {
    const user = Drawing.create({
      drawingData,
      timeTaken,
      status,
      userId,
    });
    return user;
  } catch (error) {
    throw new DatabaseError(error);
  }
};

const getDrawingById = async (id) => {
  try {
    const drawing = await Drawing.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    return drawing;
  } catch (error) {
    throw new DatabaseError(error);
  }
};

const deleteDrawingById = async ({ id, userId }) => {
  try {
    const drawing = await Drawing.destroy({
      where: {
        id,
        userId,
      },
    });
    return drawing;
  } catch (error) {
    throw new DatabaseError(error);
  }
};

const getAllDrawings = ({ userId }) => {
  try {
    const drawings = Drawing.findAll({
      where: {
        [Op.or]: [
          {
            status: {
              [Op.eq]: PUBLIC,
            },
          },
          {
            status: {
              [Op.eq]: PRIVATE,
            },
            userId,
          },
        ],
      },
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return drawings;
  } catch (error) {
    throw new DatabaseError(error);
  }
};

module.exports = {
  createDrawing,
  getDrawingById,
  deleteDrawingById,
  getAllDrawings,
};
