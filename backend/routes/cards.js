const router = require('express').Router();
const {
  validateId,
  validateCard,
} = require('../middlewares/requestValidation');
const {
  getCards,
  createCard,
  deleteCardById,
  addLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:id', validateId, deleteCardById);
router.put('/:id/likes', validateId, addLikeCard);
router.delete('/:id/likes', validateId, deleteLikeCard);

module.exports = router;
