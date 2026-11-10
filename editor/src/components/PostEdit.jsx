import { useEffect, useState } from "react";
import PostForm from "./PostForm";

export default function PostEdit({ id }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `posts/${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return null;

  return <PostForm id={id} post={post} setPost={setPost} />;
}
