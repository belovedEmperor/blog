import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

export default function CommentsList({ postId, reload, setReload }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `posts/${postId}/comments`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [postId, reload]);

  const commentCards = comments.map((comment) => (
    <li key={comment.id}>
      <CommentCard comment={comment} reload={reload} setReload={setReload} />
    </li>
  ));

  return <ul>{commentCards}</ul>;
}
