import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";

function saveToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

function App() {
  const [token, setToken] = useState(getToken());

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (token) {
      saveToken(token);
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
      </Routes>
    </div>
  );
}

export default App;
