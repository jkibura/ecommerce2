// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext({
  user: null,
  login: async (email: string, password: string) => {},
  logout: async () => {},
  register: async (email: string, password: string) => {},
});

// AuthProvider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null); // Replace `any` with a more specific user type if available
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on initial load
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/me'); // Adjust the endpoint as needed
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
      localStorage.removeItem('token');
    } catch (error) {
      throw new Error('Logout failed');
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/register', { email, password });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
