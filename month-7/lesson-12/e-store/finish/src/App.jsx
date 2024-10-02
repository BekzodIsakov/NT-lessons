import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import "./App.scss";
import Home from "./components/Home";
import Products from "./components/products/Products";
import Product from "./components/Product";

function App() {
  return (
    <div>
      <Router>
        <header>
          <nav className='navbar'>
            <ul>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) => (isActive ? "activeLink" : "")}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to='/products'
                  className={({ isActive }) => (isActive ? "activeLink" : "")}
                >
                  Products
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:productId' element={<Product />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
