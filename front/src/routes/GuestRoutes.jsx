import { LOGIN, REGISTER } from "../constants/routes";
import GuestGuard from "../guard/GuestGuard";
import MinimumLayout from "../layout/MinimumLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const guestRoutes = [
  {
    path: "/",
    element: (
      <GuestGuard>
        <MinimumLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: LOGIN,
        element: <Login />,
      },
      {
        path: REGISTER,
        element: <Register />,
      },
    ],
  },
];
