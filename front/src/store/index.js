import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/todoSlice";
import snackbarReducer from "./slice/snackbarSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    snackbar: snackbarReducer,
  },
});
