import App from "./App";
import Post from "./components/pages/Post";
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
    ],
  },
];

export default routes;
