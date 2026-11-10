import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";
import { useState } from "react";

export default function CommentsContainer({ postId, reload, setReload }) {
  const [newComment, setNewComment] = useState("");

  return (
    <div>
      <CommentForm
        id={undefined}
        postId={postId}
        comment={newComment}
        setComment={setNewComment}
        reload={reload}
        setReload={setReload}
      />
      {postId && (
        <CommentsList postId={postId} reload={reload} setReload={setReload} />
      )}
    </div>
  );
}
