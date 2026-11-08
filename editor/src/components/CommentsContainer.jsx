import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";

export default function CommentsContainer({ postId, reload, setReload }) {
  return (
    <div>
      <CommentForm postId={postId} reload={reload} setReload={setReload} />
      {postId && <CommentsList postId={postId} reload={reload} />}
    </div>
  );
}
