import { use, useEffect, useState } from "react";
import PostCard from "../PostCard";
import UserContext from "../../context/UserContext";

export default function User() {
  const { user } = use(UserContext);

  const [User, setUser] = useState();
  const [UserPosts, setUserPosts] = useState();

  useEffect(() => {
    if (!user) return;

    fetch(import.meta.env.VITE_API_URL + `users/${user?.id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUser(data));
    fetch(import.meta.env.VITE_API_URL + `users/${user?.id}/posts`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUserPosts(data));
  }, [user]);

  if (!user) return <p>Please log in</p>;

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
