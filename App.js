import React, { useState } from 'react';
import Login from './src/screens/login'
import Code from './src/screens/confirmCode'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Charges from './src/screens/charges';
import SplashScreen from './src/screens/splashScreen';
import { AuthContextProvider } from './src/store/AuthContext'
import Profile from './src/screens/profile'

export const UserData = React.createContext()
const Stack = createNativeStackNavigator();

function App() {

  const MyStack = () => {

    return (
      <Stack.Navigator >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Code" component={Code} options={{ title: 'Verify phone' }} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Charges" component={Charges} />
      </Stack.Navigator>
    )
  }
  return (
    <AuthContextProvider>
      <NavigationContainer style={{ height: '100%' }}>
        <MyStack />
      </NavigationContainer>
    </AuthContextProvider>
  );
}


export default App;
