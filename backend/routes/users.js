const router = require('express').Router();
const { validateId, validateUserInfo, validateUserAvatar } = require('../middlewares/requestValidation');

const {
  getUsers, getUser, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:id', validateId, getUserById);
router.patch('/me', validateUserInfo, updateUser);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
