import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentsContainer from "../CommentsContainer";

// TODO: NEED TO SEPARATE POST FORM AND REWRITE IT
export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [reload, setReload] = useState(0);
  const [errors, setErrors] = useState();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `posts/${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  async function onSubmit(event) {
    event.preventDefault();

    const res = await fetch(
      import.meta.env.VITE_API_URL + `posts/${id}/update`,
      {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(new FormData(event.currentTarget)),
        ),
      },
    );

    if (res.ok) {
      setReload(reload + 1);
    } else {
      setErrors((await res.json()).message ?? "Edit failed");
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1>
          <label>
            Title: <input type="text" value={post.title} />
          </label>
          {post.isPublished === false && " (Unpublished)"}
        </h1>
        <small>
          Created at: {post.createdAt}
          {post.updatedAt !== post.createdAt &&
            `, Updated at: ${post.updatedAt}`}
        </small>
        <textarea name="body" id="body" cols="60" rows="20">
          {post.body}
        </textarea>
        {errors && <p>{errors}</p>}
        <button type="submit">Edit</button>
      </form>
      <div>
        <h2>Comments</h2>
        <CommentsContainer
          postId={post.id}
          reload={reload}
          setReload={setReload}
        />
      </div>
    </>
  );
}
