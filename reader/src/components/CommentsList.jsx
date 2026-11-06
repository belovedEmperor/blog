import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

export default function CommentsList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [postId]);

  const commentCards = comments.map((comment) => (
    <li key={comment.id}>
      <CommentCard comment={comment} />
    </li>
  ));

  return <ul>{commentCards}</ul>;
}
