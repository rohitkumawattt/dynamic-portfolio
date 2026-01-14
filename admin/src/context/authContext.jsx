import React, { useEffect, useState } from "react";
import axios from "axios";

const baseApi = window.location.hostname === "localhost" ? "http://localhost:3000" : "https://dynamic-portfolio-backend-bfon.onrender.com"
const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [usertoken, setUserToken] = useState("");
  // Create a custom Axios instance
  const api = axios.create({
    baseURL: baseApi,
    withCredentials: true, // allows cookies (for refresh token)
  });
  // ✅ Automatically add token to every request
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  // ✅ Handle expired token (401)
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If token expired and not retried yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await api.post(
            `${baseApi}/api/users/refresh-access-token`,
            {},
            { withCredentials: true }
          );
          const newToken = res.data.accessToken;
          if (newToken) {
            console.log("🔄 Auto refreshed access token");
            localStorage.setItem("authToken", newToken);
            setUserToken(newToken);
            // Update header and retry the original request
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        } catch (err) {
          console.error("❌ Refresh failed, logging out... : ", err);
          logout();
        }
      }
      return Promise.reject(error);
    }
  );

  // Fetch the logged-in user's data
  const fetchUser = async (tokenOverride = usertoken) => {
    const tokenToUse = tokenOverride || localStorage.getItem("authToken");
    if (!tokenToUse) return; // Guard clause
    try {
      const response = await api.get(`${baseApi}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${tokenToUse}`,
        },
      });
      setUser(response.data);
      // console.log("User data : ", response.data);
    } catch (error) {
      // console.error("❌ Error fetching user:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  // Reference token renew function
  // This function will be called every 10 minutes to renew the access token
  const refreshAccessToken = async () => {
    try {
      const response = await api.post(
        `${baseApi}/api/users/refresh-access-token`,
        {},
        { withCredentials: true } // allows sending cookies
      );
      const newToken = response.data.accessToken;
      if (newToken) {
        console.log("🔄 Access token refreshed!");
        setUserToken(newToken);
        localStorage.setItem("authToken", newToken);
        setIsLogin(true);
        await fetchUser(newToken); // fetch user again with new token
      }
    } catch (error) {
      console.error(
        "❌ Failed to refresh token:",
        error.response?.data || error
      );
      logout();
    }
  };

  const login = (userData, authToken) => {
    setUser(userData);
    setUserToken(authToken);
    setIsLogin(true);
    localStorage.setItem("authToken", authToken);
  };

  const logout = () => {
    setUser(null);
    setUserToken("");
    setIsLogin(false);
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setUserToken(storedToken);
      setIsLogin(true);
    } else {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (usertoken) {
      fetchUser();
    }
  }, [usertoken]);

  useEffect(() => {
    if (isLogin) {
      const interval = setInterval(() => {
        refreshAccessToken();
      }, 10 * 60 * 1000); // 10 mints
      return () => clearInterval(interval);
    }
  }, [isLogin]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isLogin,
        setLoading,
        baseApi,
        usertoken,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
