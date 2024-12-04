const Joi = require("joi");
const jwt = require("jsonwebtoken");

// Your secret key should be stored securely, not hardcoded in production
const JWT_SECRET = "your_secret_key"; // Change this to your actual secret

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

// Middleware to validate auth token
const authToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Assuming Bearer token format

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Attach the verified user to the request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = {
  signupValidation,
  loginValidation,
  authToken,
};
