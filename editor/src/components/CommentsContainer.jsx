import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";
import { useState } from "react";

export default function CommentsContainer({ postId }) {
  const [reload, setReload] = useState();

  return (
    <div>
      <CommentForm postId={postId} reload={reload} setReload={setReload} />
      {postId && <CommentsList postId={postId} reload={reload} />}
    </div>
  );
}
