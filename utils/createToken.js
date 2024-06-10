// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require("jsonwebtoken");

const createToken = (payload) =>
  jwt.sign({ userId: payload }, "this-is-JWT_SECRET_KEY-in", {
    expiresIn: "1d",
  });

module.exports = createToken;
