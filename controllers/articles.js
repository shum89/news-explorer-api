const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const PermissionError = require('../errors/PermissionError');

const { errorMessage } = require('../constants/messages');
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
  Article.findById(req.params._id)
    .select('+owner')
    .orFail()
    .catch(() => {
      throw new NotFoundError(errorMessage.ARTICLE_NOT_FOUND);
    })
    .then((article) => {
      if (req.user._id === article.owner.toString()) {
        Article.findByIdAndDelete(req.params._id).then((articleData) => {
          const {
            keyword, title, text, date, source, link, image,
          } = articleData;
          res.send({
            keyword, title, text, date, source, link, image,
          });
        }).catch(next);
      } else {
        throw new PermissionError(errorMessage.ARTICLE_REMOVE_DENIED);
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
