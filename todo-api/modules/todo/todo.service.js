import relativeTime from "dayjs/plugin/relativeTime.js";
import dayjs from "dayjs";
import Lang from "../../constants/language.js";
import Todo from "./todo.entity.js";
import {
  calculatePaginationData,
  calculateSkip,
} from "../../utils/pagination.data.js";
import { isEqualMongoId } from "../../utils/mongoose.id.equality.js";

// day js using relative time library
dayjs.extend(relativeTime);

// add todo
export const addTodo = async (req, res) => {
  const todo = req.body;

  const loggedInUser = req.loggedInUser;

  todo.isCompleted = false;

  // set user id on todo
  todo.userId = loggedInUser._id;

  await Todo.create(todo);

  return res.status(200).send({ message: Lang.TASK_CREATED });
};

// update todo
export const updateTodo = async (req, res) => {
  const todoId = req.params.id;

  const newTodoValues = req.body;

  // logged in user
  const loggedInUserId = req.loggedInUser._id;

  const todo = await Todo.findById(todoId);

  if (!todo) {
    return res.status(404).send({ message: Lang.TASK_NOT_FOUND });
  }

  // check if logged in user is owner of todo
  const isOwnerOfTodo = isEqualMongoId(loggedInUserId, todo.userId);

  if (!isOwnerOfTodo) {
    return res.status(403).send({ message: Lang.NOT_TASK_OWNER });
  }

  await Todo.findByIdAndUpdate(todoId, newTodoValues);

  return res.status(200).send({ message: Lang.TASK_UPDATED });
};

// delete todo
export const deleteTodo = async (req, res) => {
  const todoId = req.params.id;

  const loggedInUserId = req.loggedInUser._id;

  const todo = await Todo.findById(todoId);

  if (!todo) {
    return res.status(404).send({ message: Lang.TASK_NOT_FOUND });
  }

  // check if logged in user is owner of todo
  const isOwnerOfTodo = isEqualMongoId(loggedInUserId, todo.userId);

  if (!isOwnerOfTodo) {
    return res.status(403).send({ message: Lang.NOT_TASK_OWNER });
  }

  await Todo.findByIdAndDelete(todoId);

  return res.status(200).send({ message: Lang.TASK_DELETED });
};

// list todo
export const listTodo = async (req, res) => {
  const { page, limit, isCompleted } = req.body;

  const skip = calculateSkip(page, limit);

  // loggedInUser
  const loggedInUserId = req.loggedInUser._id;

  // aggregation stage for todos
  const stages = [];

  // match stage
  const match = {};

  match.userId = loggedInUserId;

  if (isCompleted !== undefined) {
    match.isCompleted = isCompleted;
  }

  stages.push({
    $match: match,
  });
  // project stage

  stages.push({
    $sort: {
      createdAt: -1,
    },
  });

  stages.push({
    $project: {
      name: 1,
      description: 1,
      date: 1,
      isCompleted: 1,
    },
  });

  // facet stage
  stages.push({
    $facet: {
      items: [{ $skip: skip }, { $limit: limit }],
      total: [{ $group: { _id: null, count: { $sum: 1 } } }],
    },
  });

  const todos = await Todo.aggregate(stages);

  let { items, total } = todos[0];

  // calculate relative time
  items = items.map((item) => {
    item.relativeTime = dayjs(item.date).from(dayjs());
    return item;
  });

  // pagination info
  const paginationData = calculatePaginationData(items, total, page, limit);

  return res.status(200).send({
    items,
    meta: paginationData,
  });
};

// task details
export const getTaskDetails = async (req, res) => {
  const taskId = req.params.id;

  // loggedInUser
  const loggedInUserId = req.loggedInUser._id;

  const task = await Todo.findById(taskId);

  if (!task) {
    return res.status(404).send({ message: Lang.TASK_NOT_FOUND });
  }

  // check if logged in user is owner of todo
  const isOwnerOfTodo = isEqualMongoId(loggedInUserId, task.userId);

  if (!isOwnerOfTodo) {
    return res.status(403).send({ message: Lang.NOT_TASK_OWNER });
  }

  return res.status(200).send({ task });
};

// set todo as complete or incomplete
export const setTaskCompletionStatus = async (req, res) => {
  const taskId = req.params.id;

  // loggedInUser
  const loggedInUserId = req.loggedInUser._id;

  const { isCompleted } = req.body;

  const task = await Todo.findById(taskId);

  if (!task) {
    return res.status(404).send({ message: Lang.TASK_NOT_FOUND });
  }

  // check if logged in user is owner of todo
  const isOwnerOfTodo = isEqualMongoId(loggedInUserId, task.userId);

  if (!isOwnerOfTodo) {
    return res.status(403).send({ message: Lang.NOT_TASK_OWNER });
  }

  await Todo.findByIdAndUpdate(taskId, { isCompleted });

  return res.status(200).send({
    message: isCompleted ? Lang.TASK_COMPLETED : Lang.TASK_SET_INCOMPLETE,
  });
};
