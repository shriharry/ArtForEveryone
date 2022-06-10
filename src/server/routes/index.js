const router = require("express").Router();
const authRouter = require("./auth.routes");
const drawingRouter = require("./drawing.routes");

router.use("/auth/", authRouter);
router.use("/drawing", drawingRouter);

module.exports = router;
