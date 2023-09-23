const validationMessage = {
  INVALID_MONGO_ID: "Invalid mongo id.",
  REFRESH_TOKEN_REQUIRED: "Refresh token is required.",

  // todo
  IS_COMPLETED_REQUIRED: "Is completed is required.",
  PAGE_REQUIRED: "Page is required.",
  PAGE_MINIMUM_VALUE: "Page must be greater than or equal to 1.",
  LIMIT_REQUIRED: "Limit is required.",
  LIMIT_MINIMUM_VALUE: "Limit must be greater than or equal to 1.",
  NAME_REQUIRED: "Name is required.",
  NAME_MAX_CHARACTERS: "Name must be at most 20 characters.",
  NAME_MIN_CHARACTERS: "Name must be at least 1 character.",
  DESCRIPTION_REQUIRED: "Description is required.",
  DESCRIPTION_MAX_CHARACTERS: "Description must be at most 100 characters.",
  DESCRIPTION_MIN_CHARACTERS: "Description must be at least 3 characters.",
  DATE_REQUIRED: "Date is required.",
  DATE_MINIMUM_VALUE: "Date must be greater than or equal to today.",

  // user
  FIRST_NAME_REQUIRED: "First name is required.",
  FIRST_NAME_MAX_CHARACTERS: "First name must be at most 20 characters.",
  FIRST_NAME_MIN_CHARACTERS: "First name must be at least 1 character.",
  LAST_NAME_REQUIRED: "Last name is required.",
  LAST_NAME_MAX_CHARACTERS: "Last name must be at most 20 characters.",
  LAST_NAME_MIN_CHARACTERS: "Last name must be at least 1 character.",
  EMAIL_REQUIRED: "Email is required.",
  EMAIL_MAX_CHARACTERS: "Email must be at most 50 characters.",
  EMAIL_INVALID: "Invalid email address.",
  PASSWORD_REQUIRED: "Password is required.",
  PASSWORD_MAX_CHARACTERS: "Password must be at most 20 characters.",
  PASSWORD_INVALID:
    "Password must contain at least 8 characters, one uppercase, one number and one special case character.",
};

let MSG = validationMessage;

export default MSG;
