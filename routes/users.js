const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users');

router.route('/')
  .get(usersControllers.getAllUsers)
  .post(usersControllers.createUser)
  .put(usersControllers.updateUser)
  .delete(usersControllers.deleteUser);

router.route('/:id')
  .get(usersControllers.getUser);  

module.exports = router;