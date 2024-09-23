const cookieResponse = (res, status, data, age) => {
  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: age,
  });
  res.status(status).send({ accessToken: data.accessToken });
};

const response = (res, status, data) => {
  res.status(status).send({ accessToken: data.accessToken });
};

module.exports = {
  response,
  cookieResponse,
};
