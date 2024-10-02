import { useState } from "react";
import styles from "./Login.module.scss";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.login}>
      <h2>Log In</h2>
      <form>
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
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}
