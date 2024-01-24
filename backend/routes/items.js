const express = require('express');

const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  getItems,
  createItem,
  searchItem,
  getItemById,
  getItemByOwnerId,
  updateItemById,
  deleteItemById,
} = require('../controllers/items');

router.get('/', getItems);
router.post('/', createItem);
router.post('/search', searchItem);
router.get('/:id', getItemById);
router.get('/owner/:ownerId', getItemByOwnerId);
router.put('/:id', updateItemById);
router.delete('/:id', deleteItemById);

router.use(verifyToken);

module.exports = router;
