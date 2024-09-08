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

const signup = async (req, res) => {
  try {
    const validData = await isValidForSignup(req.body);
    if (validData) {
      const serviceResponse = await signupService(validData);
      res.cookie("refreshToken", serviceResponse.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: process.env.REFRESH_TOKEN_EXPIRY,
      });
      res.status(201).send({ accessToken: serviceResponse.accessToken });
    } else {
      res.status(400).json(validData?.details[0]?.message);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const validData = await isValidForLogin(req.body);
    if (validData) {
      const serviceResponse = await loginService(validData);
      res.cookie("refreshToken", serviceResponse.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: process.env.REFRESH_TOKEN_EXPIRY,
      });
      res.status(200).send({ accessToken: serviceResponse.accessToken });
    } else {
      res.status(400).json(validData?.details[0]?.message);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const logout = async (req, res) => {
  try {
    const validData = await isValidForLogout(req.cookies);
    if (validData) {
      const serviceResponse = await logoutService(validData);
      res.cookie("refreshToken", serviceResponse.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1,
      });
      res.status(200).send({ accessToken: serviceResponse.accessToken });
    } else {
      res.status(400).json(validData?.details[0]?.message);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  signup,
  login,
  logout,
};
