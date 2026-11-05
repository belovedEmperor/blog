export default function PostCard({ post }) {
  return (
    <div>
      <a href={"/posts/" + post.id}>
        <h3>{post.title}</h3>
      </a>
      <a href={"/users/" + post.userId}>
        <p>{post.author.username}</p>
      </a>
    </div>
  );
}
