var express = require('express');
const { signup, login, getAllUsers } = require('../controllers/rentUsers.controller');
var usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', getAllUsers)

usersRouter.post('/signup', signup)
usersRouter.post('/login', login)


module.exports = usersRouter;
