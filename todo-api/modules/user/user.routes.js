import express from "express";
import validateRequest from "../../middleware/validation.middleware.js";
import {
  loginUserValidationSchema,
  registerUserValidationSchema,
} from "./user.validation.js";
import { loginUser, registerUser } from "./user.service.js";

const router = express.Router();

// register user
router.post(
  "/register",
  validateRequest(registerUserValidationSchema),
  registerUser
);

// login user
router.post("/login", validateRequest(loginUserValidationSchema), loginUser);

export default router;
