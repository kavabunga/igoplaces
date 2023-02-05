const Card = require('../models/card');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = async function (req, res, next) {
  try {
    const cards = await Card.find({}).sort({ createdAt: 'desc' });
    res.send({ data: cards });
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async function (req, res, next) {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner });
    res.send({ data: card });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCardById = async function (req, res, next) {
  try {
    const owner = req.user._id;
    const card = await Card.findById(req.params.id);
    if (!card) {
      throw new DocumentNotFoundError(`Запрошенная карточка с id:${req.params.id} не найдена`);
    }
    if (card.owner.toString() !== owner) {
      throw new ForbiddenError('Нет прав на удаление карточки');
    }
    await card.remove();
    res.send({ data: card });
  } catch (err) {
    next(err);
  }
};

module.exports.addLikeCard = async function (req, res, next) {
  try {
    const owner = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: owner } },
      { new: true },
    );
    if (!card) {
      throw new DocumentNotFoundError(`Запрошенная карточка с id:${req.params.id} не найдена`);
    }
    res.send({ data: card });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteLikeCard = async function (req, res, next) {
  try {
    const owner = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: owner } },
      { new: true },
    );
    if (!card) {
      throw new DocumentNotFoundError(`Запрошенная карточка с id:${req.params.id} не найдена`);
    }
    res.send({ data: card });
  } catch (err) {
    next(err);
  }
};
