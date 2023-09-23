import express from "express";

import { checkMongoIdValidity } from "../../middleware/mongo.id.validity.middleware.js";
import validateRequest from "../../middleware/validation.middleware.js";
import {
  addTodo,
  deleteTodo,
  getTaskDetails,
  listTodo,
  setTaskCompletionStatus,
  updateTodo,
} from "./todo.service.js";
import {
  listTodoValidationSchema,
  taskCompletionValidationSchema,
  todoValidationSchema,
} from "./todo.validation.js";
import { isUser } from "../../middleware/authentication.middleware.js";

const router = express.Router();

// add todo task
router.post("/add", isUser, validateRequest(todoValidationSchema), addTodo);

// update todo task
router.put(
  "/update/:id",
  isUser,
  checkMongoIdValidity,
  validateRequest(todoValidationSchema),
  updateTodo
);

// delete todo task
router.delete("/delete/:id", isUser, checkMongoIdValidity, deleteTodo);

// list todo tasks
router.post(
  "/list",
  isUser,
  validateRequest(listTodoValidationSchema),
  listTodo
);

// get task details
router.get("/details/:id", isUser, checkMongoIdValidity, getTaskDetails);

// update task completion status
router.put(
  "/update/status/:id",
  isUser,
  checkMongoIdValidity,
  validateRequest(taskCompletionValidationSchema),
  setTaskCompletionStatus
);

export default router;
