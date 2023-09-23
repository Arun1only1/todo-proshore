import {
  Button,
  FormHelperText,
  Grid,
  LinearProgress,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { Formik } from "formik";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { editTask, getTodoTask } from "../lib/apis/todo.api";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slice/snackbarSlice";
import { closeAddTaskDialog } from "../store/slice/todoSlice";

const EditTodoForm = () => {
  const dispatch = useDispatch();

  const { todoId } = useSelector((state) => state.todo);

  const queryClient = useQueryClient();

  const closeDialog = (event, reason) => {
    if (reason && reason == "backdropClick") return;

    dispatch(closeAddTaskDialog());
  };

  // edit task mutation
  const { mutate: editTaskMutate, isLoading: editingTask } = useMutation({
    mutationKey: ["editTask"],
    mutationFn: (values) => editTask(todoId, values),
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
      queryClient.invalidateQueries("todos");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  // get task details
  const {
    data,
    isError: getTodoTaskError,
    isLoading: gettingTaskData,
  } = useQuery({
    queryKey: ["getTodo"],
    queryFn: () => getTodoTask(todoId),
  });

  const todoTask = data?.data?.task;

  if (getTodoTaskError) {
    dispatch(openErrorSnackbar("Task cannot be fetched."));
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: todoTask?.name || "Cycling",
        description: todoTask?.description || "Cycling in the morning",
        date: todoTask?.date || dayjs().toISOString(),
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(1, "Name must be at least 1 character.")
          .max(20, "Name must be at most 20 characters.")
          .trim()
          .required("Name is required."),

        description: Yup.string()
          .min(3, "Description must be at least 3 characters.")
          .max(40, "Description must be at most 40 characters.")
          .trim()
          .required("Description is required."),

        date: Yup.date()
          .required("Date is required.")
          .min(dayjs().toDate(), "Date cannot be past date."),
      })}
      onSubmit={(values) => {
        editTaskMutate(values);
        closeDialog();
      }}
    >
      {({
        getFieldProps,
        touched,
        handleSubmit,
        errors,
        values,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          {gettingTaskData && <LinearProgress />}
          <Grid
            container
            spacing={2}
            flexDirection="column"
            sx={{
              mt: "1rem",
              minWidth: "30vw",
            }}
          >
            <Grid item>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                {...getFieldProps("name")}
              />
              {touched.name && errors.name && (
                <FormHelperText error>{errors.name}</FormHelperText>
              )}
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                {...getFieldProps("description")}
              />
              {touched.description && errors.description && (
                <FormHelperText error>{errors.description}</FormHelperText>
              )}
            </Grid>

            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    minDate={dayjs(dayjs().startOf("day"))}
                    value={dayjs(todoTask?.date)}
                    label="Date"
                    onChange={(event) => {
                      setFieldValue("date", dayjs(event).toISOString());
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              {touched.date && errors.date && (
                <FormHelperText error>{errors.date}</FormHelperText>
              )}
            </Grid>

            <Grid
              item
              sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
            >
              <Button variant="contained" onClick={closeDialog}>
                Cancel
              </Button>
              <Button
                autoFocus
                type="submit"
                variant="contained"
                disabled={editingTask}
                disableRipple
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default EditTodoForm;
