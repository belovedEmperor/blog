import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  console.log(posts);

  const postCards = posts.map((post) => (
    <li key={post.id}>
      <PostCard post={post} />
    </li>
  ));

  return (
    <>
      <ul>{postCards}</ul>
    </>
  );
}

export default App;
