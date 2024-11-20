import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import "./index.css";
import { App } from "./App";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Dashboard } from "./components/Dashboard";
import { Send } from "./components/Send";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UpdateProfile } from "./components/UpdateProfile";

const checkForToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return redirect("/dashboard");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: checkForToken,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/send",
    element: (
      <ProtectedRoute>
        <Send />
      </ProtectedRoute>
    ),
  },
  {
    path: "/update",
    element: (
      <ProtectedRoute>
        <UpdateProfile />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
