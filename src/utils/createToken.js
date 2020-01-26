import jwt from "jsonwebtoken";

export default (data, secret, expiresIn) => {
  return jwt.sign(data, secret, { expiresIn });
};
