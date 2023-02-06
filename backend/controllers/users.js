const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const { errorCodes } = require('../util/constants.ts');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = async function (req, res, next) {
  try {
    const {
      name, about, avatar, email, _id,
    } = await User.findUserByCredentials(req.body.email, req.body.password);
    const token = jwt.sign({ _id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
    return res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
      .cookie('authorized', true, {
        maxAge: 3600000 * 24 * 7,
      })
      .send({
        data: {
          name, about, avatar, email, _id,
        },
      });
  } catch (err) {
    return next(err);
  }
};

module.exports.logout = (req, res, next) => {
  try {
    return res.status(200).clearCookie('jwt').clearCookie('authorized').send({
      message: 'Выход выполнен',
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.getUsers = async function (req, res, next) {
  try {
    const users = await User.find({});
    return res.send({ data: users });
  } catch (err) {
    return next(err);
  }
};

module.exports.getUser = async function (req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new DocumentNotFoundError(`Запрошенный пользователь с _id:${req.user._id} не найден`));
    }
    return res.send({ data: user });
  } catch (err) {
    return next(err);
  }
};

module.exports.getUserById = async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new DocumentNotFoundError(`Запрошенный пользователь с _id:${req.params.id} не найден`));
    }
    return res.send({ data: user });
  } catch (err) {
    return next(err);
  }
};

module.exports.createUser = async function (req, res, next) {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    const user = await User.create(req.body);
    const {
      name, about, avatar, email, _id,
    } = user;
    return res.status(201).send({
      data: {
        name, about, avatar, email, _id,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(errorCodes.HTTP_CONFLICT).send({ message: 'Пользователь с таким email уже зарегистрирован' });
    }
    return next(err);
  }
};

module.exports.updateUser = async function (req, res, next) {
  try {
    const owner = req.user._id;
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      owner,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      return next(new DocumentNotFoundError(`Запрошенный пользователь с _id:${owner} не найден`));
    }
    return res.send({ data: user });
  } catch (err) {
    return next(err);
  }
};

module.exports.updateAvatar = async function (req, res, next) {
  try {
    const owner = req.user._id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      owner,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      return next(new DocumentNotFoundError(`Запрошенный пользователь с _id:${owner} не найден`));
    }
    return res.send({ data: user });
  } catch (err) {
    return next(err);
  }
};
