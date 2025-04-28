import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    // Initialize state from localStorage
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update localStorage whenever currentUser changes
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
    setLoading(false);
  }, [currentUser]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object with role
      const user = {
        name: credentials.username,
        role: credentials.role,
        email: `${credentials.username}@example.com`, // Example email
        id: Date.now(), // Example unique ID
        // Add other user properties as needed
      };
      
      setCurrentUser(user);
      console.log('User logged in as:', credentials.role);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
