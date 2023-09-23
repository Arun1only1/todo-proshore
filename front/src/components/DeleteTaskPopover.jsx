import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { deleteTodo } from "../lib/apis/todo.api";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slice/snackbarSlice";

const DeleteTodoPopover = ({ taskId }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // delete task mutation

  const { mutate: deleteTask, isLoading } = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: () => deleteTodo(taskId),
    onSuccess: (res) => {
      queryClient.invalidateQueries("todos");
      dispatch(openSuccessSnackbar(res?.data?.message));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <AiOutlineDelete
        onClick={handleClick}
        size={20}
        style={{ color: "red", cursor: "pointer" }}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          Are you sure you want to delete this task?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              deleteTask();
              handleClose();
            }}
          >
            Yes
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default DeleteTodoPopover;
