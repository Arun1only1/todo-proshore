import React from "react";
import { Link, useNavigate } from "react-router-dom";

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
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
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slice/snackbarSlice";

import { loginUser } from "../lib/apis/user.api";
// ===========================|| FIREBASE - REGISTER ||=========================== //

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // login mutation
  const { mutate: loginMutate, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: (values) => loginUser(values),
    onSuccess: (res) => {
      localStorage.setItem("accesstoken", res?.data?.token?.accessToken);
      localStorage.setItem("refreshtoken", res?.data?.token?.refreshToken);

      localStorage.setItem("firstName", res?.data?.user?.firstName);
      localStorage.setItem("isLoggedIn", true);

      navigate("/home");

      dispatch(openSuccessSnackbar("You are logged in successfully."));
    },
    onError: (error) => {
      console.log(error);
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address.")
            .required("Email is required."),

          password: Yup.string().required("Password is required."),
        })}
        onSubmit={(values) => {
          loginMutate(values);
        }}
      >
        {({ errors, handleSubmit, touched, getFieldProps }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box
              sx={{
                minWidth: {
                  sm: "60vw",
                  md: "50vw",
                  lg: "25vw",
                },
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
                Login
              </Typography>

              <FormControl fullWidth>
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
                  Sign in
                </Button>
                <Link to="/register">{`Don't have account? Register`}</Link>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
