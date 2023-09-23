import Yup from "yup";
import MSG from "../../constants/validation.message.js";

// register user validation schema
export const registerUserValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(1, MSG.FIRST_NAME_MIN_CHARACTERS)
    .max(20, MSG.FIRST_NAME_MAX_CHARACTERS)
    .required(MSG.FIRST_NAME_REQUIRED),

  lastName: Yup.string()
    .min(1, MSG.LAST_NAME_MIN_CHARACTERS)
    .max(20, MSG.LAST_NAME_MAX_CHARACTERS)
    .required(MSG.LAST_NAME_REQUIRED),

  email: Yup.string()
    .email(MSG.EMAIL_INVALID)
    .max(50, MSG.EMAIL_MAX_CHARACTERS)
    .required(MSG.EMAIL_REQUIRED),

  password: Yup.string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      MSG.PASSWORD_INVALID
    )
    .max(20, MSG.PASSWORD_MAX_CHARACTERS)
    .required(MSG.PAGE_REQUIRED),
});

// login user validation schema
export const loginUserValidationSchema = Yup.object({
  email: Yup.string().required(MSG.EMAIL_REQUIRED),

  password: Yup.string().required(MSG.PASSWORD_REQUIRED),
});
