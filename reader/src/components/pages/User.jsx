import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function User() {
  const { id } = useParams();
  const [User, setUser] = useState();
  const [UserPosts, setUserPosts] = useState();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
    fetch(import.meta.env.VITE_API_URL + `users/${id}/posts`)
      .then((response) => response.json())
      .then((data) => setUserPosts(data));
  }, [id]);

  const posts = UserPosts?.map((post) => (
    <li>
      <a href={"/posts/" + post.id}>
        <h2>{post.title}</h2>
      </a>
    </li>
  ));

  return (
    <div>
      <h1>{User?.username}</h1>
      <h2>Posts</h2>
      <ul>{posts}</ul>
    </div>
  );
}
