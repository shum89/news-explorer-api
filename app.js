const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { celebrateErrorHandler } = require('./middlewares/celebrateValidation');
const { MONGO_ADRESS, PORT } = require('./config');
const { requestLogger, errorLogger } = require('./utils/logger');
const { limiter } = require('./utils/limiter');
const { router } = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const corsOptions = {
  origin: ['http://localhost:3000', 'https://localhost:3000'],
  credentials: true,
};
const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);

mongoose.connect(MONGO_ADRESS, {
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
app.use(celebrateErrorHandler);
/**
 * error handler
 */
app.use(errorHandler);

app.listen(PORT, () => {
});
