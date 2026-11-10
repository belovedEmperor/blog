import { useState } from "react";
import { useNavigate } from "react-router";

export default function PostForm({ id, post, setPost }) {
  const isNew = id === undefined;
  const [errors, setErrors] = useState();
  const [editSuccess, setEditSuccess] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const navigate = useNavigate();

  async function onEditSubmit(event) {
    event.preventDefault();

    const res = await fetch(
      import.meta.env.VITE_API_URL + (!isNew ? `posts/${id}` : "posts"),
      {
        credentials: "include",
        method: !isNew ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(new FormData(event.currentTarget)),
        ),
      },
    );

    if (res.ok) {
      if (!isNew) {
        setEditSuccess(true);
      } else {
        const postId = (await res.json()).id;
        navigate(`/posts/${postId}`);
      }
    } else {
      setEditSuccess(false);
      setErrors((await res.json()).message ?? "Save failed");
    }
  }

  function onTitleChange(event) {
    setPost({ ...post, title: event.currentTarget.value });
  }

  function onBodyChange(event) {
    setPost({ ...post, body: event.currentTarget.value });
  }

  async function onPublishSubmit(event) {
    event.preventDefault();

    const res = await fetch(import.meta.env.VITE_API_URL + `posts/${id}`, {
      credentials: "include",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !post.isPublished }),
    });

    if (res.ok) {
      setPublishSuccess(true);
      setPost({ ...post, isPublished: !post.isPublished });
    } else {
      setPublishSuccess(false);
      setErrors((await res.json()).message ?? "Publish failed");
    }
  }

  async function onDeleteSubmit(event) {
    event.preventDefault();

    const res = await fetch(import.meta.env.VITE_API_URL + `posts/${id}`, {
      credentials: "include",
      method: "DELETE",
    });

    if (res.ok) {
      navigate("/");
    } else {
      setErrors((await res.json()).message ?? "Delete failed");
    }
  }

  const existingPostActions = (
    <>
      <form onSubmit={onPublishSubmit}>
        <button type="submit">
          {post?.isPublished === true ? "Unpublish" : "Publish"}
        </button>
      </form>
      {editSuccess && <p>Save successful!</p>}
      {publishSuccess && <p>Publish successful!</p>}
      <form onSubmit={onDeleteSubmit}>
        <button type="submit">Delete Post</button>
      </form>
    </>
  );

  return (
    <div>
      <form onSubmit={onEditSubmit}>
        <h1>
          <label>
            Title:
            <input
              name="title"
              id="title"
              type="text"
              value={post?.title}
              onChange={onTitleChange}
            />
          </label>
          {post?.isPublished === false ? " (Not published)" : ""}
        </h1>
        <textarea
          name="body"
          id="body"
          cols="60"
          rows="20"
          value={post?.body}
          onChange={onBodyChange}
        ></textarea>
        {errors && <p>{errors}</p>}
        <button type="submit">Save</button>
      </form>
      {!isNew && existingPostActions}
    </div>
  );
}
