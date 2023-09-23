import jwt from "jsonwebtoken";

export const generateToken = (email, purpose) => {
  let secret = "";

  let expiryTime = "";

  if (purpose === "access_token") {
    secret = process.env.JWT_ACCESS_TOKEN_SECRET;
    expiryTime = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
  }

  if (purpose === "refresh_token") {
    secret = process.env.JWT_REFRESH_TOKEN_SECRET;
    expiryTime = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;
  }

  return jwt.sign({ email }, secret, {
    expiresIn: expiryTime,
  });
};
