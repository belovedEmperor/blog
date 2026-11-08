import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PostCard from "../PostCard";

export default function User() {
  const { id } = useParams();
  const [User, setUser] = useState();
  const [UserPosts, setUserPosts] = useState();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `users/${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUser(data));
    fetch(import.meta.env.VITE_API_URL + `users/${id}/posts`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUserPosts(data));
  }, [id]);

  const posts = UserPosts?.map((post) => (
    <li key={post.id}>
      <PostCard post={post} />
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
