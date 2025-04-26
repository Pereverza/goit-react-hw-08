import LoginForm from "../../components/LoginForm/LoginForm";
import s from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={s.wrapper}>
      <h2>Log In</h2>
      <LoginForm />
    </div>
  );
}
