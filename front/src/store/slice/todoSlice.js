import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    open: false,
    mode: "",
    todoId: "",
    page: 1,
    tab: 0,
  },
  reducers: {
    openAddTaskDialog: (state) => {
      state.open = true;
    },
    closeAddTaskDialog: (state) => {
      state.open = false;
    },
    setDialogMode: (state, action) => {
      state.mode = action.payload;
      state.open = true;
    },
    setTodoId: (state, action) => {
      state.todoId = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const {
  openAddTaskDialog,
  closeAddTaskDialog,
  setDialogMode,
  setTodoId,
  setPage,
  setTab,
} = todoSlice.actions;

export default todoSlice.reducer;
