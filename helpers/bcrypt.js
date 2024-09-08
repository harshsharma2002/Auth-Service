const bcrypt = require("bcrypt");
const saltrounds = 10;

const hashPassword = async (textPass) => {
  const hash = await bcrypt.hash(textPass, saltrounds);
  return hash;
};

const cmpHash = async (textPass, hashedPass) => {
  const found = await bcrypt.compare(textPass, hashedPass);
  return found;
};

module.exports = {
  hashPassword,
  cmpHash,
};
