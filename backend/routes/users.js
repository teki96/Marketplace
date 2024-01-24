const express = require('express');

const router = express.Router();
const {
  getUsers, getUserById, loginUser, signUpUser,
} = require('../controllers/users');
const verifyToken = require('../middleware/verifyToken');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/signup', signUpUser);
router.post('/login', loginUser);

router.use(verifyToken);

module.exports = router;
