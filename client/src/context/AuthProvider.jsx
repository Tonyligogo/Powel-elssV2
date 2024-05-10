import React, { useContext, useState, useEffect } from "react";

export const AuthContext = React.createContext({
  authToken: null,
  setToken: () => {},
  setUser: () => {},
  removeToken: () => {},
  loading: true,
  authenticated: false,
  currentUser: null,
});

export default function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [screensize, setScreensize] = useState(undefined);
  const [menuActive, setMenuActive] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedAuthToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");
    const storedUserId = sessionStorage.getItem("userId");
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
      setCurrentUser(storedUser);
      setUserId(storedUserId);
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const setToken = (token) => {
    setAuthToken(token);
    sessionStorage.setItem("token", token);
    setAuthenticated(true);
  };
  const setUser = (user) => {
    setCurrentUser(user.username);
    sessionStorage.setItem("user", user.username);
    sessionStorage.setItem("userId", user._id);
  };

  const removeToken = () => {
    setAuthToken(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userId");
    setAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{
        setToken,
        setUser,
        currentUser,
        userId,
        authToken,
        removeToken,
        authenticated,
        loading,
        setLoading,
        screensize,
        setScreensize,
        menuActive, 
        setMenuActive
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};
