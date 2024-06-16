
const jwt = require("jsonwebtoken")
const createToken = (id) => {
  console.log(id)
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

module.exports = { createToken };