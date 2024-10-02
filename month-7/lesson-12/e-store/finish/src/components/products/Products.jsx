import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Products.module.scss";
import { addProducts } from "../../store/productsSlice";
import Card from "../card/Card";

const baseURL = import.meta.env.VITE_BASE_URL;

const Products = () => {
  const products = useSelector((store) => store.productsReducer.products);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    async function fetchBrands() {
      const response = await fetch(`${baseURL}/brands`);
      const data = await response.json();
      setBrands(data);
    }

    async function fetchColors() {
      const response = await fetch(`${baseURL}/colors`);
      const data = await response.json();
      setColors(data);
    }

    fetchBrands();
    fetchColors();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      let query = `${baseURL}/products`;

      // https://headphones-server.onrender.com/products?color_options_like=%23FFD700&brand_name=AudioTech&brand_name=GameAudio

      // "https://headphones-server.onrender.com/products?color_options_like=#ff0000&brand_name=SoundMax"

      const params = [];
      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }
      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }

      if (params.length > 0) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await fetch(query);
        const data = await response.json();
        dispatch(addProducts(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedBrand, selectedColor]);

  return (
    <div className={styles.container}>
      <aside>
        <div>
          <h3>BRANDS</h3>
          <ul>
            {brands.map((brand, index) => (
              <li key={index}>
                <input
                  type='radio'
                  name='brand'
                  value={brand}
                  id={brand}
                  checked={brand === selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                />
                <label htmlFor={brand}>{brand}</label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>COLORS</h3>
          <ul className={styles.colorsContainer}>
            {colors.map((color, index) => (
              <li key={index}>
                <div
                  className={styles.color}
                  style={{
                    background: color,
                    outline: selectedColor === color ? "3px solid red" : "",
                  }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : products.length ? (
          <div className={styles.grid}>
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p>No products</p>
        )}
      </main>
    </div>
  );
};

export default Products;
