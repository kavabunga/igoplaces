const Card = require('../models/card');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = async function (req, res, next) {
  try {
    const cards = await Card.find({})
      .populate(['owner', 'likes'])
      .sort({ createdAt: 'desc' });
    return res.send({ data: cards });
  } catch (err) {
    return next(err);
  }
};

module.exports.createCard = async function (req, res, next) {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner });
    await card.populate('owner');
    return res.status(201).send({ data: card });
  } catch (err) {
    return next(err);
  }
};

module.exports.deleteCardById = async function (req, res, next) {
  try {
    const owner = req.user._id;
    const card = await Card.findById(req.params.id).populate('owner');
    if (!card) {
      return next(
        new DocumentNotFoundError(
          `Requested card with id:${req.params.id} not found`,
        ),
      );
    }
    if (card.owner._id.toString() !== owner) {
      return next(
        new ForbiddenError('You have no permission to delete this card'),
      );
    }
    await card.remove();
    return res.send({ data: card });
  } catch (err) {
    return next(err);
  }
};

module.exports.addLikeCard = async function (req, res, next) {
  try {
    const owner = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: owner } },
      { new: true },
    )
      .populate('owner')
      .populate('likes');
    if (!card) {
      return next(
        new DocumentNotFoundError(
          `Requested card with id:${req.params.id} not found`,
        ),
      );
    }
    return res.send({ data: card });
  } catch (err) {
    return next(err);
  }
};

module.exports.deleteLikeCard = async function (req, res, next) {
  try {
    const owner = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: owner } },
      { new: true },
    )
      .populate('owner')
      .populate('likes');
    if (!card) {
      return next(
        new DocumentNotFoundError(
          `Requested card with id:${req.params.id} not found`,
        ),
      );
    }
    return res.send({ data: card });
  } catch (err) {
    return next(err);
  }
};
