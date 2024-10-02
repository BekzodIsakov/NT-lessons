import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Account from "./pages/account/Account";

function App() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [sortBy, setSortBy] = useState("");

  return (
    <Router>
      <Header sortBy={sortBy} setSortBy={setSortBy} />
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route
          path='/'
          element={
            <Home
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              sortBy={sortBy}
            />
          }
        />

        <Route path='/cart' element={<div>Cart</div>} />
        
        <Route element={<ProtectedRoute />}>
          <Route path='/account' element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
