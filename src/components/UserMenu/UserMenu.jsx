import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import s from "../../App.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={s.userMenu}>
      <p className={s.greeting}>Welcome, {user.name}</p>
      <button className={s.logoutButton} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}
