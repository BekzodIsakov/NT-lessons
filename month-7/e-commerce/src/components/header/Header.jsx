import "./Header.css";
import Cart from "../cart/Cart";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromLocalStorage } from "../../utils/helper";
import { removeUser } from "../../store/userSlice";

export default function Header({ sortBy, setSortBy }) {
  const { userData } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(removeUser());

    removeFromLocalStorage("user");
    removeFromLocalStorage("token");
    navigate("/login");
  }

  return (
    <header className='header'>
      <nav>
        <Link to='/'>LOGO</Link>
        <Link to='/account'>Account</Link>
      </nav>

      <div className='flex-row'>
        <select
          name='price'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value=''>none</option>
          <option value='cheap'>cheap</option>
          <option value='expensive'>expensive</option>
        </select>

        <Cart />

        {userData && (
          <div className='profile'>
            <img src={userData.img} alt='User avatar' />
            <p>{userData.name}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}
