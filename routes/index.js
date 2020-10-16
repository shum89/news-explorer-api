const router = require('express').Router();
const userRouter = require('./users.js');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');
const articleRouter = require('./articles');
const NotFoundError = require('../errors/NotFoundError');
const { errorMessage } = require('../constants/messages');

router.use('/', authRouter);

/**
 * authorisation middleware
 */
router.use(auth);

router.use('/', userRouter);
router.use('/', articleRouter);

router.use(() => {
  throw new NotFoundError({ message: errorMessage.NOT_FOUND });
});

module.exports = {
  router,
};
