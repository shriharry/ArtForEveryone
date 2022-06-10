const Sequelize = require("sequelize");
const config = require("@src/configs/db.config");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model.js")(sequelize, Sequelize);
db.Drawing = require("./drawing.model.js")(sequelize, Sequelize);

db.User.hasMany(db.Drawing, { as: "User", foreignKey: "userId" });
db.Drawing.belongsTo(db.User, { foreignKey: "userId" });

module.exports = db;
