const express = require('express');
const { getUser } = require('../controllers/users');

/**
 * routes for user
 * @type {Router}
 */
const userRouter = express.Router();
userRouter.get('/users/me', getUser);

module.exports = userRouter;
