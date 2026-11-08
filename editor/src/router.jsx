import App from "./App";
import LoginForm from "./components/pages/LoginForm";
import Post from "./components/pages/Post";
import RegisterForm from "./components/pages/RegisterForm";
import User from "./components/pages/User";
import PostsList from "./components/PostsList";

const routes = [
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />
    children: [
      {
        index: true,
        element: <PostsList />,
      },
      {
        path: "posts/:id",
        element: <Post />,
      },
      {
        path: "users/:id",
        element: <User />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
    ],
  },
];

export default routes;
