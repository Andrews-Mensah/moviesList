var express = require('express');
const { signup, login } = require('../controllers/rentUsers.controller');
var usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


usersRouter.post('/signup', signup)
usersRouter.post('/login', login)

module.exports = usersRouter;
