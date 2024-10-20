const express = require('express');
const Router = express.Router();
const {
    handleUserSignUp,
    handleUserSingIn
} = require('../controllers/user_controller');

Router.route('/sign-up')
.post(handleUserSignUp)

Router.route('/sign-in')
.post(handleUserSingIn)

module.exports = Router;