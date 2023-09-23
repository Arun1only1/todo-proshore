import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generate.token.js";
import User from "./user.entity.js";
import Lang from "../../constants/language.js";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from "../../constants/general.constant.js";

// register user
export const registerUser = async (req, res) => {
  let newUser = req.body;

  const user = await User.findOne({ email: newUser.email });

  if (user) {
    return res.status(409).send({ message: Lang.USER_ALREADY_EXISTS });
  }

  const hashedPassword = await bcrypt.hash(newUser.password, 10);

  newUser.password = hashedPassword;

  await User.create(newUser);

  return res.status(200).send({ message: Lang.USER_REGISTERED });
};

// login user
export const loginUser = async (req, res) => {
  try {
    const loginCredentials = req.body;

    const user = await User.findOne({ email: loginCredentials.email });

    if (!user) {
      return res.status(404).send({ message: Lang.INVALID_CREDENTIALS });
    }

    const passwordMatch = await bcrypt.compare(
      loginCredentials.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(404).send({ message: Lang.INVALID_CREDENTIALS });
    }

    const accessToken = generateToken(user.email, ACCESS_TOKEN);

    const refreshToken = generateToken(user.email, REFRESH_TOKEN);

    return res.status(200).send({ user, token: { accessToken, refreshToken } });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
