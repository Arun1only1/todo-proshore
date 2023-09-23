import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAddTaskDialog,
  openAddTaskDialog,
  setDialogMode,
} from "../store/slice/todoSlice";
import AddTodoForm from "./AddTodoForm";
import EditTodoForm from "./EditTodoForm";
import { ADD_TASK } from "../constants/general.constant";

const AddTodoDialog = () => {
  const dispatch = useDispatch();
  const { open, mode } = useSelector((state) => state.todo);

  const openDialog = () => {
    dispatch(openAddTaskDialog());
  };

  const closeDialog = (event, reason) => {
    if (reason && reason == "backdropClick") return;

    dispatch(closeAddTaskDialog());
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          openDialog();
          dispatch(setDialogMode(ADD_TASK));
        }}
        sx={{ mt: "2rem", width: { xs: "90vw", sm: "30%", md: "15%" } }}
      >
        Add todo
      </Button>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            alignSelf: "center",
            fontSize: "1.5rem",
          }}
        >
          {mode === ADD_TASK ? "Add task" : "Edit task"}
        </DialogTitle>
        <DialogContent>
          {mode === ADD_TASK ? <AddTodoForm /> : <EditTodoForm />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTodoDialog;
