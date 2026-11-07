import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    const res = await fetch(import.meta.env.VITE_API_URL + "auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        Object.fromEntries(new FormData(event.currentTarget)),
      ),
    });

    if (res.ok) {
      navigate("/");
    } else {
      setErrors((await res.json()).message ?? "Login failed");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Email:
        <input type="email" name="email" id="email" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" id="password" required />
      </label>
      {errors && <p>{errors}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
