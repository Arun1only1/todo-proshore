import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../constants/routes";

const GuestGuard = (props) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  const { pathname } = useLocation();

  console.log(isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(HOME_ROUTE, { replace: true });
    }

    if (!isLoggedIn && pathname === "/") {
      navigate(LOGIN_ROUTE, { replace: true });
    }
  }, [isLoggedIn, navigate, pathname]);

  return props.children;
};

export default GuestGuard;
