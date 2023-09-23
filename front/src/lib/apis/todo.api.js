import $axios from "../axios";

export const getTodos = async (values) => {
  return await $axios.post("/todo/list", values);
};

export const addTodo = async (values) => {
  return await $axios.post("/todo/add", values);
};

export const deleteTodo = async (id) => {
  return await $axios.delete(`/todo/delete/${id}`);
};

export const getTodoTask = async (taskId) => {
  return await $axios.get(`/todo/details/${taskId}`);
};

export const editTask = async (taskId, values) => {
  return await $axios.put(`/todo/update/${taskId}`, values);
};

export const setTaskStatus = async (taskId, status) => {
  return await $axios.put(`/todo/update/status/${taskId}`, {
    isCompleted: status,
  });
};
