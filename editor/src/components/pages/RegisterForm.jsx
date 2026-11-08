import { use } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../context/UserContext";
import AuthForm from "../AuthForm";

export default function RegisterForm() {
  const { user } = use(UserContext);
  const navigate = useNavigate();

  if (user !== undefined) navigate("/");

  const onSuccess = () => {
    navigate("/login");
  };

  return (
    <AuthForm
      endpoint="auth/register"
      onSuccess={onSuccess}
      buttonLabel="Register"
    >
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
    </AuthForm>
  );
}
