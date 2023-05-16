```js

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [authData, setAuthData] = useState({
    token: null,
    isLoading: false,
    error: null,
    success: false,
    user: null,
  });

  const url = "http://127.0.0.1:8090/api/auth"

  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem("authData"));

    if (storedAuthData) {
      setAuthData({ ...authData, ...storedAuthData });

    }
  }, []);

  useEffect(() => {
    console.log(authData);
    let data = { token: authData.token, user: authData.user }
    localStorage.setItem("authData", JSON.stringify(data));
  }, [authData])



  const login = async ({email, password}) => {
    setAuthData({ ...authData, isLoading: true });

    try {
      const response = await axios.post(`${url}/token/`, {
        email,
        password,
      });

      const newAuthData = {
        ...authData,
        token: response.data.access,
        isLoading: false,
        error: null,
        success: true,
      };
      
      // setAuthData(newAuthData);
      await getUserData(response.data.access);

    } catch (error) {
      setAuthData({
        ...authData,
        isLoading: false,
        error: error.response?.data?.detail || "Something went wrong",
        success: false,
      });
    }
  };


  const register = async ({email, name, password, password2}) => {
    setAuthData({ ...authData, isLoading: true });

    try {
      const response = await axios.post(`${url}/register/`, {
        email, name, password, password2
      });

      const newAuthData = {
        ...authData,
        isLoading: false,
        error: null,
        success: true,
      };
      
      setAuthData(newAuthData);
      navigate('/login')

    } catch (error) {
      setAuthData({
        ...authData,
        isLoading: false,
        error: error.response?.data?.detail || "Something went wrong",
        success: false,
      });
    }
  };

  const logout = async () => {
    await localStorage.removeItem("authData")

    setAuthData({
      token: null,
      isLoading: false,
      error: null,
      success: false,
      user: null,
    })

    // navigate(0)
        
  }

  const getUserData = async (token) => {

    try {
      const response = await axios.get(`${url}/user/`, {
        headers: {
          Authorization: `Bearer ${token}`, // use the token parameter
        },
      });

      const newAuthData = {
        ...authData,
        token,
        user: response.data,
        isLoading: false,
        error: null,
        success: true,
      };

      setAuthData(newAuthData);

    } catch (error) {
      console.error("Error fetching user data:", error);
      setAuthData({
        ...authData,
        isLoading: false,
        error: error.response?.data?.detail || "Something went wrong",
        success: false,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ authData, login, getUserData, logout ,register }}>
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside an AuthContextProvider');
  }

  return context;
};

```

