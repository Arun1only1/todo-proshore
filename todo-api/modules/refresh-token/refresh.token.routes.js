import express from "express";

import validateRequest from "../../middleware/validation.middleware.js";
import { getNewAccessToken } from "./refresh.token.service.js";
import { refreshTokenValidationSchema } from "./refresh.token.validation.js";

const router = express.Router();

// get new access token
router.post(
  "/new-token",
  validateRequest(refreshTokenValidationSchema),
  getNewAccessToken
);

export default router;
