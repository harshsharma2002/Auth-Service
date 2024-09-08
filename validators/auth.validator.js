const joi = require("joi");

const isValidForLogin = (data) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  return schema.validateAsync(data);
};

const isValidForSignup = (data) => {
  const schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    repeatPassword: joi.ref("password"),
  });

  return schema.validateAsync(data);
};

const isValidForLogout = (data) => {
  const schema = joi.object({
    refreshToken: joi.string().required(),
  });

  return schema.validateAsync(data);
};

module.exports = {
  isValidForLogin,
  isValidForSignup,
  isValidForLogout,
};
