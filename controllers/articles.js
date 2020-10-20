const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const PermissionError = require('../errors/PermissionError');

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
    .catch((err) => {
      throw new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`);
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
  Article.findById(req.params._id).select('+owner')
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: errorMessage.ARTICLE_NOT_FOUND });
    })
    .then((article) => {
      if (req.user._id === article.owner.toString()) {
        Article.findByIdAndDelete(req.params._id)
          .then(() => res.send({ message: successMessage.ARTICLE_DELETED })).catch(next);
      } else {
        throw new PermissionError({ message: errorMessage.PERMISSION_ERROR });
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
