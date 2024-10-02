import { createContext, useState } from "react";

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(getUser());

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
