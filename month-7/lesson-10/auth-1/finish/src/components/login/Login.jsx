import { useState } from "react";
import styles from "./Login.module.scss";

export default function Login({ setToken }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (!response.ok) {
        throw new Error("Network was not ok!");
      }
      const result = await response.json();
      setToken(result.token);
    } catch (error) {
      console.error(error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.login}>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-control"]}>
          <label htmlFor='userName'>Username</label>
          <input
            type='text'
            value={userName}
            id='userName'
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={styles["form-control"]}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            value={password}
            id='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className={styles.error}>Error: {error.message}</p>}
        <div>
          <button type='submit' disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
