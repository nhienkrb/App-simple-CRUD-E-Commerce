import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  // load token from localStorage on mount

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) setToken(token);
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }; 
  const logout = () => {
    setToken(""); 
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!token;
  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
