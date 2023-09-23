import Yup from "yup";
import dayjs from "dayjs";
import MSG from "../../constants/validation.message.js";

export const todoValidationSchema = Yup.object({
  name: Yup.string()
    .min(1, MSG.NAME_MIN_CHARACTERS)
    .max(20, MSG.NAME_MAX_CHARACTERS)
    .trim()
    .required(MSG.NAME_REQUIRED),

  description: Yup.string()
    .min(3, MSG.DESCRIPTION_MIN_CHARACTERS)
    .max(100, MSG.DESCRIPTION_MAX_CHARACTERS)
    .trim()
    .required(MSG.DESCRIPTION_REQUIRED),

  date: Yup.date()
    .required(MSG.DATE_REQUIRED)
    .min(dayjs().toDate(), MSG.DATE_MINIMUM_VALUE),
});

export const listTodoValidationSchema = Yup.object({
  page: Yup.number().min(1, MSG.PAGE_MINIMUM_VALUE).required(MSG.PAGE_REQUIRED),
  limit: Yup.number()
    .min(1, MSG.LIMIT_MINIMUM_VALUE)
    .required(MSG.LIMIT_REQUIRED),
  isCompleted: Yup.boolean(),
});

export const taskCompletionValidationSchema = Yup.object({
  isCompleted: Yup.boolean().required(MSG.IS_COMPLETED_REQUIRED),
});
