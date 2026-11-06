import { useOutletContext } from "react-router";
import PostCard from "./PostCard";

export default function PostsList() {
  const { posts } = useOutletContext();

  const postCards = posts.map((post) => (
    <li key={post.id}>
      <PostCard post={post} />
    </li>
  ));

  return <ul>{postCards}</ul>;
}
