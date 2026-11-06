import { useEffect, useState } from "react";
import { Outlet } from "react-router";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  console.log(posts);

  return (
    <>
      <Outlet context={{ posts, setPosts }} />
    </>
  );
}

export default App;
