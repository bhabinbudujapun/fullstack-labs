import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import Signup from "./pages/signup/Signup";
import AuthLayout from "./layout/AuthLayout";
import NotFound from "./pages/notfound/NotFound";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Signup />,
      },
      {
        path: 'chat',
        element: <Chat />
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
