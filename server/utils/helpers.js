const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { ACCESS_TOKEN_KEY } = process.env;

const hashPassword = (password) => new Promise((resolve, reject) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      reject(err);
    } else {
      resolve(hashedPassword);
    }
  });
});

const createUserToken = (payload) => {
  const token = jwt.sign(payload, ACCESS_TOKEN_KEY);
  return token;
};

const handleError = (msg, status) => {
  const error = new Error(msg);
  error.code = status;
  throw error;
};

module.exports = { handleError, hashPassword, createUserToken };
