const jwt = require("jsonwebtoken");
require("../envloader").initializeENV();
const _refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const _accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const generateRefreshToken = (user) => {
  return jwt.sign(user, _refreshTokenSecret, {
    expiresIn: process.env.REFRESH_TOKEN_EXPTIME,
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(user, _accessTokenSecret, {
    expiresIn: process.env.ACCESS_TOKEN_EXPTIME,
  });
};

module.exports = {
  generateRefreshToken,
  generateAccessToken,
};
