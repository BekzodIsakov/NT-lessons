import { useNavigate } from "react-router-dom";

export default function LogoutButton({ children }) {
  const navigate = useNavigate();

  function logOut() {
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
