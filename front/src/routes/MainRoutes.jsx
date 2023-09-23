import Home from "../pages/Home";
import AuthGuard from "../guard/AuthGuard";
import MainLayout from "../layout/MainLayout";

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
        path: "home",
        element: <Home />,
      },
    ],
  },
];
