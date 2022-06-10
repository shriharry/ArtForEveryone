const authRouter = require("express").Router();

const { checkIfUserExist } = require("@src/middleware/verifySignUp");
const { signIn, signUp } = require("@src/controllers/auth.controller");

authRouter.route("/sign-up").post(checkIfUserExist, signUp);

authRouter.route("/sign-in").post(signIn);

module.exports = authRouter;
