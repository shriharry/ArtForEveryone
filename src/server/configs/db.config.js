module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USERNAME || "postgres",
  PASSWORD: process.env.DB_PASSWORD || "root",
  DB: process.env.DB_NAME || "drawings",
  dialect: process.env.DB_DIALECT || "postgres",
  pool: {
    max: parseInt(process.env.DB_POOL_MAX || 5),
    min: parseInt(process.env.DB_POOL_MIN || 0),
    acquire: parseInt(process.env.DB_ACQUIRE || 30000),
    idle: parseInt(process.env.DB_IDLE || 10000),
  },
};
