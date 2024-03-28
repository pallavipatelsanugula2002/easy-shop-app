import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Retrieve user data from local storage, if available
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : {};//to take previously login values
  });

  useEffect(() => {
    // Save user data to local storage whenever it's updated
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const handleLogin = (userInfo) => {
    localStorage.setItem("userData", JSON.stringify(userInfo));
    setUserData(userInfo);
  };

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("userData");
    // Reset user data state
    setUserData(null);
  };

  return (
    <DataContext.Provider value={{ userData, handleLogin, handleLogout }}>
      {children}
    </DataContext.Provider>
  );
};