import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedAuthor = jwt_decode(token);

      setAuthor(decodedAuthor.fullName);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ author,setAuthor }}>{children}</AuthContext.Provider>
  );
};
