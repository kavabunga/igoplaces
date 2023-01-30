const { celebrate, Joi } = require('celebrate');

module.exports.validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri().regex(/^https?:\/\/(www\.)?[\w\-_~]+\.[\w\-_~]+[\w\-.~:/?#[\]@!$&'()*+,;=]*#?/i),
  }),
});

module.exports.validateUserCredentials = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().regex(/^https?:\/\/(www\.)?[\w\-_~]+\.[\w\-_~]+[\w\-.~:/?#[\]@!$&'()*+,;=]*#?/i),
  }),
});

module.exports.validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri().regex(/^https?:\/\/(www\.)?[\w\-_~]+\.[\w\-_~]+[\w\-.~:/?#[\]@!$&'()*+,;=]*#?/i),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});
