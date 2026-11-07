import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "posts", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  console.log(posts);

  return (
    <>
      <Header />
      <Outlet context={{ posts, setPosts }} />
    </>
  );
}

export default App;
