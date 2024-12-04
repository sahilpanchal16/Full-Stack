const { signup, login } = require('../Controllers/User');
const { signupValidation, loginValidation } = require('../Middlewares/UserValidation');

const user_router = require("express").Router();
user_router.post("/login", loginValidation, login);
user_router.post("/signup", signupValidation, signup);

module.exports = {user_router};