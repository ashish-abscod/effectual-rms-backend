const Joi = require('Joi');

exports.validatePassword = (Users) => {
    const Schema = Joi.object({
        password: Joi.string().required()
    }).options({ allowUnknown: true });
    return Schema.validate(Users);
  };

exports.validateEmail = (Users) => {
    const Schema = Joi.object({
        email: Joi.string().email().required()
    });
    return Schema.validate(Users);
  };