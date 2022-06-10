const jwt = require("jsonwebtoken");
const config = require("@src/configs/auth.config");
const {
  ForbiddenRequestError,
  UnauthorizedRequestError,
} = require("@src/helpers/ErrorHandler");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  try {
    if (!token) {
      throw new ForbiddenRequestError({
        message: "No token provided!",
      });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        throw new UnauthorizedRequestError({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    next(error);
  }
};
