import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('luxury_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return user?.role === 'admin';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('luxury_user', JSON.stringify(user));
      setIsAdmin(user.role === 'admin');
    } else {
      localStorage.removeItem('luxury_user');
      setIsAdmin(false);
    }
  }, [user]);

  const login = (email, password) => {
    // Mock login
    if (email === 'admin@luxury.com' && password === 'admin123') {
      const adminUser = { email, role: 'admin', name: 'Luxury Admin' };
      setUser(adminUser);
      return true;
    } else if (email === 'user@luxury.com' && password === 'user123') {
      const normalUser = { email, role: 'user', name: 'Valued Client' };
      setUser(normalUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
