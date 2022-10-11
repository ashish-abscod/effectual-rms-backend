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


exports.validateUser = (Users)=>{
  const Schema = Joi.object({
    name : Joi.string().required(),
    email: Joi.string().email().required(),
    password : Joi.string().min(4).max(15).required(),
    confirmPassword :  Joi.any().equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' })
  });
  return Schema.validate(Users);
}