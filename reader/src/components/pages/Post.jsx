import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentsContainer from "../CommentsContainer";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `posts/${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  return (
    <>
      <div>
        <h1>
          {post.title}
          {post.isPublished === false && " (Not published)"}
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
        <CommentsContainer postId={post.id} />
      </div>
    </>
  );
}
