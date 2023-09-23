import { Button, FormHelperText, Grid, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { Formik } from "formik";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addTodo } from "../lib/apis/todo.api";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slice/snackbarSlice";
import { closeAddTaskDialog } from "../store/slice/todoSlice";

const AddTodoForm = () => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const closeDialog = (event, reason) => {
    if (reason && reason == "backdropClick") return;

    dispatch(closeAddTaskDialog());
  };

  //   add todo mutation
  const { mutate, isLoading } = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: (values) => addTodo(values),
    onSuccess: (res) => {
      queryClient.invalidateQueries("todos");
      dispatch(openSuccessSnackbar(res?.data?.message));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  return (
    <Formik
      initialValues={{ name: "", description: "", date: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(1, "Name must be at least 1 character.")
          .max(20, "Name must be at most 20 characters.")
          .trim()
          .required("Name is required."),

        description: Yup.string()
          .min(3, "Description must be at least 3 characters.")
          .max(100, "Description must be at most 100 characters.")
          .trim()
          .required("Description is required."),

        date: Yup.date()
          .required("Date is required.")
          .min(dayjs().toDate(), "Date cannot be past date."),
      })}
      onSubmit={(values) => {
        mutate(values);
        closeDialog();
      }}
    >
      {({ getFieldProps, touched, handleSubmit, errors, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
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
                <DemoContainer
                  components={["DateTimePicker"]}
                  sx={{ paddingTop: 0 }}
                >
                  <DateTimePicker
                    minDate={dayjs(dayjs().startOf("day"))}
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
                disabled={isLoading}
                disableRipple
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AddTodoForm;
