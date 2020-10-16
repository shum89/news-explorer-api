const express = require('express');
const { validateRegister, validateLogin } = require('../middlewares/requestValidation');
const { createUser, login } = require('../controllers/users');

/**
 * routes for authorisation
 * @type {Router}
 */
const authRouter = express.Router();

authRouter.post('/signup', validateRegister, createUser);
authRouter.post('/signin', validateLogin, login);

module.exports = authRouter;
