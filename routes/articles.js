const express = require('express');
const { validateId, validateArticle } = require('../middlewares/requestValidation');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
/**
 *routes for article
 * @type {Router}
 */
const articleRouter = express.Router();

articleRouter.get('/articles', getArticles);
articleRouter.post('/articles', validateArticle, createArticle);

articleRouter.delete('/articles/:_id', validateId, deleteArticle);

module.exports = articleRouter;
