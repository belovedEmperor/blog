import { use } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router";

export default function Header() {
  const { user } = use(UserContext);
  const navigate = useNavigate();

  const EDIT_URL = import.meta.env.VITE_EDIT_URL;

  async function onSubmit(event) {
    event.preventDefault();

    await fetch(import.meta.env.VITE_API_URL + "auth/logout", {
      credentials: "include",
      method: "POST",
    });

    navigate("/");
  }

  return (
    <div id="header">
      <nav>
        <a href="/">Home</a>
        {EDIT_URL && <a href={EDIT_URL}>Editor</a>}
        {user ? (
          <form onSubmit={onSubmit}>
            <button type="submit">Logout</button>
          </form>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </nav>
    </div>
  );
}
