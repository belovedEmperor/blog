import { useState } from "react";
import CommentForm from "./CommentForm.jsx";

export default function CommentCard({ comment, reload, setReload }) {
  const [isEdit, setIsEdit] = useState(false);
  const [newComment, setNewComment] = useState(comment);

  async function onDelete(event) {
    event.preventDefault();

    const res = await fetch(
      import.meta.env.VITE_API_URL +
        `posts/${comment.postId}/comments/${comment.id}`,
      { credentials: "include", method: "DELETE" },
    );

    if (res.ok) {
      if (setReload) setReload(reload + 1);
    }
  }

  const card = (
    <div>
      <address>
        <a href={"/users/" + comment.userId}>{comment.author?.username}</a>
      </address>
      <small>
        Created at: {comment.createdAt}
        {comment.updatedAt !== comment.createdAt && " (Edited)"}
      </small>
      <p>{comment.body}</p>
      <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
      <form onSubmit={onDelete}>
        <button type="submit">Delete</button>
      </form>
    </div>
  );

  return isEdit ? (
    <CommentForm
      id={comment.id}
      postId={comment.postId}
      comment={newComment}
      setComment={setNewComment}
      setIsEdit={setIsEdit}
      reload={reload}
      setReload={setReload}
    />
  ) : (
    card
  );
}
