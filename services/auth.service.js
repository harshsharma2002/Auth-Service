const { Users } = require("../models/user.model");
const { hashPassword, cmpHash } = require("../helpers/bcrypt");
const { generateRefreshToken, generateAccessToken } = require("../helpers/jwt");

const signupService = async (data) => {
  data.password = await hashPassword(data.password);
  const DBResponse = await Users.query().insert({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  });
  return {
    accessToken: generateAccessToken({
      userId: DBResponse.id,
      email: DBResponse.email,
    }),
    refreshToken: generateRefreshToken({
      userId: DBResponse.id,
      email: DBResponse.email,
    }),
  };
};

const loginService = async (data) => {
  const DBResponse = await Users.query().findOne({
    email: data.email,
  });
  if (await cmpHash(data.password, DBResponse.password)) {
    return {
      accessToken: generateAccessToken({
        userId: DBResponse.id,
        email: DBResponse.email,
      }),
      refreshToken: generateRefreshToken({
        userId: DBResponse.id,
        email: DBResponse.email,
      }),
    };
  }
};

const logoutService = () => {
  return {
    accessToken: null,
    refreshToken: null,
  };
};

module.exports = {
  signupService,
  loginService,
  logoutService,
};
