const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const { errorMessage, successMessage } = require('../constants/messages');
/**
 * get articles from a authorised user
 * @param req
 * @param res
 * @param next
 */
const getArticles = (req, res, next) => {
  const user = req.user._id;
  Article.find({ owner: user }).populate('user')
    .then((articles) => {
      res.send({ articles });
    }).catch(next);
};

/**
 * create article
 * @param req
 * @param res
 * @param next
 */
const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .catch(() => {
      throw new BadRequestError(errorMessage.INCORRECT_ARTICLE_DATA);
    })
    .then((article) => res.send(
      {
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      },
    ))
    .catch(next);
};
/**
 * delete article
 * @param req
 * @param res
 * @param next
 */
const deleteArticle = (req, res, next) => {
  Article.findOneAndDelete({ _id: req.params._id, owner: req.user._id }).orFail().catch(() => {
    throw new NotFoundError(errorMessage.ARTICLE_NOT_FOUND);
  }).then(() => {
    res.send({
      message: successMessage.ARTICLE_DELETED,
    });
  })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
