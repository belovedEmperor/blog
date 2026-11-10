import App from "./App";
import LoginForm from "./components/pages/LoginForm";
import Post from "./components/pages/Post";
import RegisterForm from "./components/pages/RegisterForm";
import User from "./components/pages/User";
import PostNew from "./components/PostNew";

const routes = [
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />
    children: [
      {
        index: true,
        element: <User />,
      },
      {
        path: "posts/:id",
        element: <Post />,
      },
      {
        path: "posts/new",
        element: <PostNew />,
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
