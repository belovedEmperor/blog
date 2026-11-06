import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentsList from "../CommentsList";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
    fetch(import.meta.env.VITE_API_URL + `posts/${id}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [id]);

  console.log(post);
  console.log(comments);

  return (
    <>
      <div>
        <h1>{post.title}</h1>
        <p>
          <address>
            Written by:&nbsp;
            <a href={"/users/" + post.userId}>{post.author?.username}</a>
          </address>
        </p>
        <small>
          Created at: {post.createdAt}
          {post.updatedAt !== post.createdAt &&
            `, Updated at: ${post.updatedAt}`}
        </small>
        <p>{post.body}</p>
      </div>
      <div>
        <h2>Comments</h2>
        <CommentsList postId={post.id} />
      </div>
    </>
  );
}
