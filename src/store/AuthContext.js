import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();

export const AuthContextProvider = ({children}) => {
  const BaseUrl = '';
  const [authToken, setAuthToken] = useState(null);

  const saveTokenToStorage = async newToken => {
    try {
      await AsyncStorage.setItem('token', newToken);
    } catch (error) {
      console.log('Error saving token to AsyncStorage:', error);
    }
  };

  const login = phone => {
    axios
      .post(`${BaseUrl}/login`, {
        phone: phone,
      })
      .then(res => {
        setAuthToken(res.data.data.access_token);
        AsyncStorage.setItem('token', res.data.data.access_token);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const logout = () => {
    AsyncStorage.removeItem('token');
    setAuthToken(null);
  };

  const isLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem('token');
      if (userToken) {
        setAuthToken(userToken);
        console.log(userToken);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{authToken, login, logout, saveTokenToStorage}}>
      {children}
    </AuthContext.Provider>
  );
};
