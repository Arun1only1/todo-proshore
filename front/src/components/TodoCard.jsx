import { Checkbox, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { FiEdit } from "react-icons/fi";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { EDIT_TASK } from "../constants/general.constant";
import { setTaskStatus } from "../lib/apis/todo.api";
import { openSuccessSnackbar } from "../store/slice/snackbarSlice";
import { setDialogMode, setTodoId } from "../store/slice/todoSlice";
import DeleteTodoPopover from "./DeleteTaskPopover";
import Loader from "./Loader";

const TodoCard = ({ _id, name, description, isCompleted, relativeTime }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: setTaskStatusMutate, isLoading } = useMutation({
    mutationKey: ["set-task-status"],
    mutationFn: (status) => setTaskStatus(_id, status),
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
      queryClient.invalidateQueries("todos");
    },

    onError: (error) => {
      dispatch(openSuccessSnackbar(error?.response?.data?.message));
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Card
      variant="outlined"
      sx={{
        width: {
          xs: "90vw",
          sm: "35vw",
          md: "30vw",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "25vh",
        padding: "1rem",
        boxShadow:
          " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      <CardContent>
        <Typography
          color="text.secondary"
          sx={{ fontWeight: 600, fontSize: "1.2rem", mb: "1rem" }}
        >
          {name}
        </Typography>

        <Typography sx={{ mb: 2 }} color="text.secondary">
          {description}
        </Typography>

        <Typography color="text.secondary" sx={{ color: "grey" }}>
          {relativeTime}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}
      >
        <Stack
          direction="row"
          sx={{ justifyContent: "flex-start", alignItems: "center" }}
        >
          <Typography sx={{ color: "green" }}>Status</Typography>
          <Checkbox
            checked={isCompleted}
            color="success"
            onChange={() => {
              setTaskStatusMutate(!isCompleted);
            }}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <FiEdit
            size={20}
            style={{ color: "green", cursor: "pointer" }}
            onClick={() => {
              dispatch(setDialogMode(EDIT_TASK));
              dispatch(setTodoId(_id));
            }}
          />

          <DeleteTodoPopover taskId={_id} />
        </Stack>
      </CardActions>
    </Card>
  );
};

export default TodoCard;
