import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Pages from "./pages/Pages";
import Media from "./pages/Media";
import Navigation from "./pages/Navigation";
import Components from "./pages/Components";
import Templates from "./pages/Templates";
import Themes from "./pages/Themes";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Settings from "./pages/Settings";

export default createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "pages", element: <Pages /> },
      { path: "media", element: <Media /> },
      { path: "navigation", element: <Navigation /> },
      { path: "components", element: <Components /> },
      { path: "templates", element: <Templates /> },
      { path: "themes", element: <Themes /> },
      { path: "users", element: <Users /> },
      { path: "roles", element: <Roles /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
