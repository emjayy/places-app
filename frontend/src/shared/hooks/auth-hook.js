import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [expiration, setExpiration] = useState();

  const login = useCallback(({ userId, token, expiration }) => {
    // set token expiration to current, or 1hr from now
    expiration = expiration || Date.now() + 1000 * 60 * 60; // 1h
    setToken(token);
    setUserId(userId);
    setExpiration(expiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({ token, userId, expiration })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setExpiration(null);
    localStorage.removeItem("userData");
  }, []);

  // handle token expiry time remaining
  useEffect(() => {
    expiration
      ? setTimeout(logout, expiration - Date.now())
      : clearTimeout(logoutTimer);
  }, [token, logout, expiration]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));

    // On refresh, if token is still valid, then auto login
    if (user && user.expiration > Date.now()) {
      login(user);
    }
  }, [login]);

  return { token, login, logout, userId };
};
