import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ children }) {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  function logOut() {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <button
      onClick={logOut}
      style={{ color: "red", borderColor: "currentcolor" }}
    >
      {children}
    </button>
  );
}
