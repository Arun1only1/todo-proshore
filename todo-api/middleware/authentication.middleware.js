import jwt from "jsonwebtoken";

import User from "../modules/user/user.entity.js";
import Lang from "../constants/language.js";

// is user middleware
export const isUser = async (req, res, next) => {
  // extract token from headers
  const authorization = req?.headers?.authorization;
  const splittedArray = authorization?.split(" ");

  const token = splittedArray?.length === 2 && splittedArray[1];

  // if not token, terminate
  if (!token) {
    return res.status(401).send({ message: Lang.UNAUTHORIZED });
  }

  // decrypt token and extract email
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

    // find user by email
    const user = await User.findOne({ email: userData.email });

    // if not user, terminate
    if (!user) {
      return res.status(401).send({ message: Lang.UNAUTHORIZED });
    }

    // add user to req
    req.loggedInUser = user;

    next();
  } catch (error) {
    // if something goes wrong while  decrypting, terminate
    return res.status(401).send({ message: Lang.UNAUTHORIZED });
  }
};
