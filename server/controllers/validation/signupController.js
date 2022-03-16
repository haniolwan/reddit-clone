const Joi = require('joi');
const { findUser, registerUser } = require('../../database/queries/user/userQuery');
const { hashPassword, createUserToken } = require('../../utils/helpers');

const signupController = (req, res) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({ tlds: { allow: true } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });
  const { name, email, password } = req.body;
  schema.validateAsync({ email, password }).then(() =>
    findUser(email)
      .catch('User already exists')
      .then(() =>
        hashPassword(password)
          .then((hashedPassword) => {
            registerUser(name, email, hashedPassword)
              .then((user) => {
                res.cookie('token', createUserToken(user.rows[0]));
                res.json({
                  msg: `Welcome ${name}`,
                  status: 200,
                });
              })
              .catch('User Already exists');
          })
          .catch('Password Couldnt be hashed')
      )
  );
};

module.exports = signupController;
