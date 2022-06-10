const userService = require("@src/services/user.service");
const { ResourceConflictError } = require("@src/helpers/ErrorHandler");

exports.checkIfUserExist = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const user = await userService.findUserBy({ username, email });
    if (user) {
      throw new ResourceConflictError({ message: "User is already in use" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
