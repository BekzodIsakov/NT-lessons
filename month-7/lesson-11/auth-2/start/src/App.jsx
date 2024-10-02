import { Routes, Route, NavLink } from "react-router-dom";

import "./App.scss";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Students from "./components/students/Students";
import LogoutButton from "./components/logout-button/LogoutButton";
import About from "./components/about/About";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";

function App() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/about'>About</NavLink>
            </li>
            <li>
              <NavLink to='/dashboard'>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to='/students'>Students</NavLink>
            </li>
          </ul>

          <LogoutButton>Log out</LogoutButton>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path='/students' element={<Students />} />
          </Route>

          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
