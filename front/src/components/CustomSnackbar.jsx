import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../store/slice/snackbarSlice";

const CustomSnackbar = () => {
  const snackbarData = useSelector((state) => state.snackbar);

  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={snackbarData.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarData.severity}
        sx={{ width: "100%" }}
      >
        {snackbarData.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
