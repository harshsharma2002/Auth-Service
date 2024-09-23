const {
  isValidForLogin,
  isValidForSignup,
  isValidForLogout,
} = require("../validators/auth.validator");
const {
  signupService,
  loginService,
  logoutService,
} = require("../services/auth.service");
const { response, cookieResponse } = require("../helpers/response");

const signup = async (req, res) => {
  try {
    const validData = await isValidForSignup(req.body);
    if (validData) {
      const serviceResponse = await signupService(validData);
      cookieResponse(res, 201, serviceResponse, process.env.REFRESH_TOKEN_AGE);
    } else {
      response(res, 400, json(validData?.details[0]?.message));
    }
  } catch (err) {
    response(res, 500, err.message);
  }
};

const login = async (req, res) => {
  try {
    const validData = await isValidForLogin(req.body);
    if (validData) {
      const serviceResponse = await loginService(validData);
      cookieResponse(res, 200, serviceResponse, process.env.REFRESH_TOKEN_AGE);
    } else {
      response(res, 400, json(validData?.details[0]?.message));
    }
  } catch (err) {
    response(res, 500, err.message);
  }
};

const logout = async (req, res) => {
  try {
    const validData = await isValidForLogout(req.cookies);
    if (validData) {
      const serviceResponse = await logoutService();
      cookieResponse(res, 200, serviceResponse, 1);
    } else {
      response(res, 400, json(validData?.details[0]?.message));
    }
  } catch (err) {
    response(res, 500, err.message);
  }
};

module.exports = {
  signup,
  login,
  logout,
};
