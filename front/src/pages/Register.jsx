import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

// third party
import { Formik } from "formik";
import * as Yup from "yup";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { registerUser } from "../lib/apis/user.api";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slice/snackbarSlice";

// ===========================|| FIREBASE - REGISTER ||=========================== //

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // register user mutation
  const { mutate: registerMutate, isLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: (values) => registerUser(values),
    onSuccess: (res) => {
      navigate("/login");
      dispatch(openSuccessSnackbar(res?.data?.message));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "90vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .min(1, "First name must be at least 1 character.")
            .max(20, "First name must be at most 20 characters.")
            .required("First name is required."),

          lastName: Yup.string()
            .min(1, "Last name must be at least 1 character.")
            .max(20, "Last name must be at most 20 characters.")
            .required("Last name is required."),

          email: Yup.string()
            .email("Invalid email address.")
            .max(50, "Email must be at most 50 characters.")
            .required("Email is required."),

          password: Yup.string()
            .min(
              8,
              "Minimum 8 characters with 1 uppercase,1 lowercase, 1 number and 1 special character."
            )
            .max(20, "Must be shorter than 20 characters.")
            .matches(
              /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
              "Minimum 8 characters with 1 uppercase,1 lowercase, 1 number and 1 special character."
            )
            .required("Password is required"),
        })}
        onSubmit={(values) => {
          registerMutate(values);
        }}
      >
        {({ errors, handleSubmit, touched, getFieldProps }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                padding: "1rem",
                borderRadius: "10px",

                boxShadow:
                  " rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            >
              <Typography variant="h4" sx={{ color: "grey" }}>
                Register
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    margin="normal"
                    type="text"
                    {...getFieldProps("firstName")}
                  />
                  {touched.firstName && errors.firstName && (
                    <FormHelperText error>{errors.firstName}</FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    margin="normal"
                    type="text"
                    {...getFieldProps("lastName")}
                  />
                  {touched.lastName && errors.lastName && (
                    <FormHelperText error>{errors.lastName}</FormHelperText>
                  )}
                </Grid>
              </Grid>
              <FormControl
                fullWidth
                error={Boolean(touched.email && errors.email)}
              >
                <TextField
                  type="email"
                  variant="outlined"
                  label="Email Address"
                  {...getFieldProps("email")}
                />
                {touched.email && errors.email && (
                  <FormHelperText error>{errors.email}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.password && errors.password)}
              >
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  {...getFieldProps("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  inputProps={{}}
                />
                {touched.password && errors.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
              </FormControl>

              <Box sx={{ mt: 2, width: "100%" }}>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ mb: 2 }}
                  disabled={isLoading}
                >
                  Sign up
                </Button>
                <Link to="/login">Already registered? Login</Link>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
