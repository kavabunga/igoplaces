const bcrypt = require('bcryptjs');
const User = require('../models/user');
const errorHandler = require('../util/errorHandler');

module.exports.getUsers = async function (req, res) {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.getUserById = async function (req, res) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      const err = new Error(`Запрошенный пользователь с _id:${req.params.userId} не найден`);
      err.name = 'DocumentNotFound';
      throw err;
    }
    res.send({ data: user });
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.createUser = async function (req, res) {
  try {
    const {
      name = 'Жак-Ив Кусто', about = 'Исследователь', avatar = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png', email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });
    res.send({ data: user });
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.updateUser = async function (req, res) {
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
      const err = new Error(`Запрошенный пользователь с _id:${owner} не найден`);
      err.name = 'DocumentNotFound';
      throw err;
    }
    res.send({ data: user });
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.updateAvatar = async function (req, res) {
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
      const err = new Error(`Запрошенный пользователь с _id:${owner} не найден`);
      err.name = 'DocumentNotFound';
      throw err;
    }
    res.send({ data: user });
  } catch (err) {
    errorHandler(err, res);
  }
};
