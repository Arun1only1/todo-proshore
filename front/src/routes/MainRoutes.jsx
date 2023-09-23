import Home from "../pages/Home";
import AuthGuard from "../guard/AuthGuard";
import MainLayout from "../layout/MainLayout";
import { HOME } from "../constants/routes";

export const mainRoutes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: HOME,
        element: <Home />,
      },
    ],
  },
];
