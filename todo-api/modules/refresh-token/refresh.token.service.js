import jwt from "jsonwebtoken";

import User from "../user/user.entity.js";
import { generateToken } from "../../utils/generate.token.js";
import { ACCESS_TOKEN } from "../../constants/general.constant.js";

export const getNewAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const userData = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    const user = await User.findOne({ email: userData.email });

    if (!user) {
      return res.status(401).send({ message: Lang.UNAUTHORIZED });
    }

    const accessToken = generateToken(user.email, ACCESS_TOKEN);

    return res.status(200).send({ token: { accessToken } });
  } catch (error) {
    return res.status(401).send({ message: Lang.UNAUTHORIZED });
  }
};
