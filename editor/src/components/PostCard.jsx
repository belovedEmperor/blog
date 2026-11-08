export default function PostCard({ post }) {
  return (
    <div>
      <a href={"/posts/" + post.id}>
        <h2>{post.title}</h2>
      </a>
      <address>
        <a href={"/users/" + post.userId}>{post.author?.username}</a>
      </address>
    </div>
  );
}
