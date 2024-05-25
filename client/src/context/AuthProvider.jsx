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
  const [userEmail, setUserEmail] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [role, setRole] = useState(null);
  const [userNumber, setUserNumber] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [screensize, setScreensize] = useState(undefined);
  const [menuActive, setMenuActive] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedAuthToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");
    const storedUserEmail = sessionStorage.getItem("email");
    const storedAvatar = sessionStorage.getItem("avatar");
    const storedUserNumber = sessionStorage.getItem("number");
    const storedUserId = sessionStorage.getItem("userId");
    const storedRole = sessionStorage.getItem("role");
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
      setCurrentUser(storedUser);
      setUserEmail(storedUserEmail);
      setAvatar(storedAvatar);
      setUserNumber(storedUserNumber);
      setUserId(storedUserId);
      setRole(storedRole);
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
    setAvatar(user.avatar.url);
    sessionStorage.setItem("user", user.username);
    sessionStorage.setItem("role", user.role);
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("avatar", user.avatar.url);
    sessionStorage.setItem("number", user.phone);
    sessionStorage.setItem("userId", user._id);
  };

  const removeToken = () => {
    setAuthToken(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("avatar");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("number");
    sessionStorage.removeItem("userId");
    setAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{
        setToken,
        setUser,
        currentUser,
        userEmail,
        userNumber,
        role,
        avatar,
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
