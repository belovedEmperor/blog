import { use } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../context/UserContext";
import AuthForm from "../AuthForm";

export default function LoginForm() {
  const { user, setUser } = use(UserContext);
  const navigate = useNavigate();

  if (user !== undefined) navigate("/");

  const onSuccess = () => {
    fetch(import.meta.env.VITE_API_URL + "auth/me", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) return undefined;
        return response.json();
      })
      .then((data) => setUser(data));

    navigate("/");
  };

  return (
    <AuthForm endpoint="auth/login" onSuccess={onSuccess} buttonLabel="Login">
      <label>
        Email:
        <input type="email" name="email" id="email" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" id="password" required />
      </label>
    </AuthForm>
  );
}
