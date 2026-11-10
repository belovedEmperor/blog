import { useState } from "react";
import { useParams } from "react-router";
import CommentsContainer from "../CommentsContainer";
import PostEdit from "../PostEdit";

export default function Post() {
  const { id } = useParams();
  const [reload, setReload] = useState(0);

  return (
    <>
      <div>
        <PostEdit id={id} />
        <h2>Comments</h2>
        <CommentsContainer postId={id} reload={reload} setReload={setReload} />
      </div>
    </>
  );
}
