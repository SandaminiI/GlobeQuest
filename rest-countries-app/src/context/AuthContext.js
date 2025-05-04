import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      const favs = JSON.parse(localStorage.getItem(`favs-${storedUser.email}`)) || [];
      setFavorites(favs);
    }
  }, []);

  const login = (email, password) => {
    const userData = { email, password }; // Storing both
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  
    const favs = JSON.parse(localStorage.getItem(`favs-${email}`)) || [];
    setFavorites(favs);
  };
  
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setFavorites([]);
  };

  const toggleFavorite = (countryCode) => {
    const newFavs = favorites.includes(countryCode)
      ? favorites.filter((code) => code !== countryCode)
      : [...favorites, countryCode];

    setFavorites(newFavs);
    if (user) {
      localStorage.setItem(`favs-${user.email}`, JSON.stringify(newFavs));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, favorites, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using the context in other components
export const useAuth = () => useContext(AuthContext);
