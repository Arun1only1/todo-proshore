import React from "react";
import { Outlet } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";
import Appbar from "../components/Appbar";

const MainLayout = () => {
  return (
    <>
      <Appbar />
      <CustomSnackbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
