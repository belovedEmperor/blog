import { useState } from "react";

export default function CommentForm({ postId, reload, setReload }) {
  const [errors, setErrors] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    const res = await fetch(
      import.meta.env.VITE_API_URL + `posts/${postId}/comments`,
      {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(new FormData(event.currentTarget)),
        ),
      },
    );

    if (res.ok) {
      event.target.reset();
      setReload(reload + 1);
    } else {
      setErrors((await res.json()).message ?? "Login failed");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <textarea name="body" id="body" cols="60" rows="10"></textarea>
      {errors && <p>{errors}</p>}
      <button type="submit">Comment</button>
    </form>
  );
}
