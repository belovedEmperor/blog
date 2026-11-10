import { useState } from "react";
import PostForm from "./PostForm";

export default function PostNew() {
  const [post, setPost] = useState({ title: "", body: "", isPublished: false });
  return <PostForm id={undefined} post={post} setPost={setPost} />;
}
