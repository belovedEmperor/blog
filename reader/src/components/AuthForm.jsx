import { useState } from "react";

export default function AuthForm({
  endpoint,
  onSuccess,
  buttonLabel,
  children,
}) {
  const [errors, setErrors] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    const res = await fetch(import.meta.env.VITE_API_URL + endpoint, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        Object.fromEntries(new FormData(event.currentTarget)),
      ),
    });

    if (res.ok) {
      onSuccess();
    } else {
      setErrors((await res.json()).message ?? `${buttonLabel} failed`);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {children}
      {errors && <p>{errors}</p>}
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}
