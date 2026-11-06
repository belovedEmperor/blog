import App from "./App";
import Post from "./components/pages/Post";
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
    ],
  },
];

export default routes;
