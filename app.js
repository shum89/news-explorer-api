require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errorHandling } = require('./middlewares/celebrateValidation');
const { requestLogger, errorLogger } = require('./utils/logger');
const { limiter } = require('./utils/limiter');
const { router } = require('./routes');
const { statusCode } = require('./constants/statusConstants');
const { errorMessage } = require('./constants/messages');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(requestLogger);
app.use(router);
app.use(errorLogger);

/**
 * custom celebrate error handler
 */
app.use(errorHandling);
/**
 * error handler
 */
app.use((err, req, res, next) => {
  if (err.status !== statusCode.SERVER_ERROR) {
    res.status(err.status).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: `${errorMessage.SERVER_ERROR}: ${err.message}` });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
