import { createContext, useState, useEffect } from "react";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // ✅ done loading
  }, []);

  return (
    <UserDataContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </UserDataContext.Provider>
  );
};
