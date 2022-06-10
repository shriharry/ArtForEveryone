const drawingRouter = require("express").Router();
const {
  createDrawing,
  getAllDrawings,
  getDrawingById,
  deleteDrawingById,
} = require("@src/controllers/drawing.controller");
const { verifyToken } = require("@src/middleware/authJwt");

drawingRouter.use(verifyToken);
drawingRouter.route("/").get(getAllDrawings).post(createDrawing);

drawingRouter.route("/:id").get(getDrawingById).delete(deleteDrawingById);

module.exports = drawingRouter;
