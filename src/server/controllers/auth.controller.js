const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("@src/configs/auth.config");
const userService = require("@src/services/user.service");
const { CREATED, OK } = require("@src/utils/httpStatusCodes");
const {
  NotFoundError,
  UnauthorizedRequestError,
} = require("@src/helpers/ErrorHandler");

exports.signUp = async (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;
  try {
    const user = await userService.createUser({
      firstName,
      lastName,
      username,
      email,
      password: bcrypt.hashSync(password, 8),
    });
    return res
      .status(CREATED)
      .json({ message: "User is registered successfully." });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await userService.findUserBy({
      username,
    });

    if (!user) {
      throw new NotFoundError({ message: "User not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      throw new UnauthorizedRequestError({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    return res.status(OK).json({ ...user, accessToken: token });
  } catch (error) {
    next(error);
  }
};
