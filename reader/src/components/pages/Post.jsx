import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentsList from "../CommentsList";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `posts/${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setPost(data));
    fetch(import.meta.env.VITE_API_URL + `posts/${id}/comments`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [id]);

  console.log(post);
  console.log(comments);

  return (
    <>
      <div>
        <h1>
          {post.title}
          {post.isPublished === false && " (Unpublished)"}
        </h1>
        <address>
          Written by:&nbsp;
          <a href={"/users/" + post.userId}>{post.author?.username}</a>
        </address>
        <small>
          Created at: {post.createdAt}
          {post.updatedAt !== post.createdAt &&
            `, Updated at: ${post.updatedAt}`}
        </small>
        <p>{post.body}</p>
      </div>
      <div>
        <h2>Comments</h2>
        {post.id && <CommentsList postId={post.id} />}
      </div>
    </>
  );
}
