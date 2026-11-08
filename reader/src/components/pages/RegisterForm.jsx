import { use, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../context/UserContext";

export default function RegisterForm() {
  const { user } = use(UserContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState();

  if (user !== undefined) navigate("/");

  async function onSubmit(event) {
    event.preventDefault();

    const res = await fetch(import.meta.env.VITE_API_URL + "auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        Object.fromEntries(new FormData(event.currentTarget)),
      ),
    });

    if (res.ok) {
      navigate("/login");
    } else {
      setErrors((await res.json()).message ?? "Registration failed");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Username:
        <input type="text" name="username" id="username" required />
      </label>
      <label>
        Email:
        <input type="email" name="email" id="email" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" id="password" required />
      </label>
      {errors && <p>{errors}</p>}
      <button type="submit">Register</button>
    </form>
  );
}
