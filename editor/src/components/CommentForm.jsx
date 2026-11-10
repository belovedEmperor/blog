import { useState } from "react";

export default function CommentForm({
  id,
  postId,
  comment,
  setComment,
  setIsEdit,
  reload,
  setReload,
}) {
  const isNew = id === undefined;
  const [errors, setErrors] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    const res = await fetch(
      import.meta.env.VITE_API_URL +
        (!isNew
          ? `posts/${postId}/comments/${id}`
          : `posts/${postId}/comments`),
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
      if (setIsEdit) setIsEdit(false);
      if (setReload) setReload(reload + 1);
      setComment({ ...comment, body: "" });
    } else {
      setErrors((await res.json()).message ?? "Comment failed");
    }
  }

  function onChange(event) {
    setComment({ ...comment, body: event.currentTarget.value });
  }

  return (
    <form onSubmit={onSubmit}>
      <textarea
        name="body"
        id="body"
        cols="60"
        rows="10"
        value={comment.body}
        onChange={onChange}
      ></textarea>
      {errors && <p>{errors}</p>}
      <button type="submit">{!isNew ? "Edit" : "Comment"}</button>
    </form>
  );
}
