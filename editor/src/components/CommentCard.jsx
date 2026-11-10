export default function CommentCard({ comment }) {
  return (
    <div>
      <address>
        <a href={"/users/" + comment.userId}>{comment.author?.username}</a>
      </address>
      <small>
        Created at: {comment.createdAt}
        {comment.updatedAt !== comment.createdAt && " (Edited)"}
      </small>
      <p>{comment.body}</p>
    </div>
  );
}
