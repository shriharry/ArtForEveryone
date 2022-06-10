const { Op } = require("sequelize");
const { User } = require("@src/models/");

const { DatabaseError } = require("@src/helpers/ErrorHandler");

const createUser = async (body) => {
  try {
    const user = User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.username,
      email: body.email,
      password: body.password,
    });
    return user;
  } catch (error) {
    throw new DatabaseError(error);
  }
};

const findUserBy = ({ username, email }) => {
  return User.findOne({
    where: {
      [Op.or]: [
        {
          username: {
            [Op.eq]: username,
          },
        },
        {
          email: {
            [Op.eq]: email,
          },
        },
      ],
    },
  });
};

module.exports = {
  findUserBy,
  createUser,
};
