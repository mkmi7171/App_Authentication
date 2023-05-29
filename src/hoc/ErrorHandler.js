import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../store/auth.context';
import {View, ActivityIndicator} from 'react-native';

const withAuthAndErrorHandling = WrappedComponent => {
  const WithAuthAndErrorHandling = props => {
    const {saveTokenToStorage} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const axiosInstance = axios.create();
      axiosInstance.interceptors.request.use(
        async config => {
          setLoading(true);

          const authToken = await AsyncStorage.getItem('token');
          if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
          }
          return config;
        },
        error => {
          setLoading(false);
          return Promise.reject(error);
        },
      );

      axiosInstance.interceptors.response.use(
        response => {
          setLoading(false);
          return response;
        },
        async error => {
          setLoading(false);
          console.log('Request failed:', error);

          if (error.response && error.response.status === 401) {
            try {
              const RefreshedToken = error.response.data.object;
              const newToken = RefreshedToken.access_token;

              saveTokenToStorage(newToken);

              const originalRequest = error.config;
              originalRequest.headers.Authorization = `Bearer ${newToken}`;

              return axiosInstance(originalRequest);
            } catch (refreshError) {
              console.log('Token refresh failed:', refreshError);

              Toast.show({
                type: 'error',
                text1: 'Token Refresh Failed',
                text2: refreshError.message,
                position: 'bottom',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
              });
              return Promise.reject(refreshError);
            }
          }

          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error.message,
            position: 'bottom',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });

          return Promise.reject(error);
        },
      );

      return () => {
        axiosInstance.interceptors.request.eject();
        axiosInstance.interceptors.response.eject();
      };
    }, []);

    return (
      <>
        {loading && (
          <View>
            <ActivityIndicator size="large" />
          </View>
        )}
        <WrappedComponent axios={axios} {...props} />
      </>
    );
  };

  return WithAuthAndErrorHandling;
};

export default withAuthAndErrorHandling;
