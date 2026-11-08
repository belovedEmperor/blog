export default function CommentCard({ comment }) {
  return (
    <div>
      <h2>
        <address>
          <a href={"/users/" + comment.userId}>{comment.author?.username}</a>
        </address>
      </h2>
      <small>
        Created at: {comment.createdAt}
        {comment.updatedAt !== comment.createdAt && " (Edited)"}
      </small>
      <p>{comment.body}</p>
    </div>
  );
}
