const bcrypt = require("bcrypt");
const saltrounds = process.env.BCRYPT_SALT_ROUNDS;

const hashPassword = (textPass) => {
  const hash = bcrypt.hash(textPass, saltrounds);
  return hash;
};

const cmpHash = (textPass, hashedPass) => {
  const found = bcrypt.compare(textPass, hashedPass);
  return found;
};

module.exports = {
  hashPassword,
  cmpHash,
};
