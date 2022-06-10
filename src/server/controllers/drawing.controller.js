const drawingService = require("@src/services/drawing.service");
const { CREATED, OK } = require("@src/utils/httpStatusCodes");
const { NotFoundError } = require("@src/helpers/ErrorHandler");

exports.createDrawing = async (req, res, next) => {
  const { drawingData, timeTaken, status, userId } = req.body;
  try {
    const user = await drawingService.createDrawing({
      drawingData,
      timeTaken,
      status,
      userId,
    });
    return res.status(CREATED).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getDrawingById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const drawing = await drawingService.getDrawingById(id);
    if (!drawing) {
      throw new NotFoundError({ message: `Drawing not found for #${id}` });
    }
    return res.status(OK).json(drawing);
  } catch (error) {
    next(error);
  }
};

exports.deleteDrawingById = async (req, res, next) => {
  const {
    params: { id },
    userId,
  } = req;
  try {
    const drawing = await drawingService.deleteDrawingById({ id, userId });
    if (!drawing) {
      throw new NotFoundError({ message: `Drawing not found for #${id}` });
    }
    return res.status(OK).json({ success: true });
  } catch (error) {
    next(error);
  }
};

exports.getAllDrawings = async (req, res, next) => {
  try {
    const { userId } = req;
    const drawings = await drawingService.getAllDrawings({ userId });
    return res.status(OK).json(drawings);
  } catch (error) {
    next(error);
  }
};
