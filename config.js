require('dotenv').config();

module.exports = {
  PORT: 3000,
  MONGO_ADRESS: (process.env.NODE_ENV === 'production') ? process.env.MONGO_ADRESS : 'mongodb://localhost:27017/newsdbDev',
  JWT_SECRET: (process.env.NODE_ENV === 'production') ? process.env.JWT_SECRET : 'dev-secret',
};
