import * as Yup from "yup";
import MSG from "../../constants/validation.message.js";

export const refreshTokenValidationSchema = Yup.object({
  refreshToken: Yup.string().required(MSG.REFRESH_TOKEN_REQUIRED),
});
