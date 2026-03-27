import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import HomeStackNavigation from './home-stack.navigation';
import SplashScreen from '../features/splash/splash.screen';
import LoginScreen from '../features/login/login.screen';

import { useAuthStore } from '../features/login/store/auth.store';
import { baseApi } from '../api/base.api';

const Stack = createStackNavigator();

const RootStackNavigation = () => {
  const { isAuthenticated, isLoading, logout, restoreToken } = useAuthStore();

  useEffect(() => {
    // Restore session on startup
    restoreToken();
  }, [restoreToken]);

  useEffect(() => {
    // Register global 401 handler
    baseApi.setOnUnauthorizedCallback(() => {
      logout();
    });
  }, [logout]);

  return (
    <React.Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoading ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : !isAuthenticated ? (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        ) : (
          <Stack.Screen
            name="HomeStackNavigation"
            component={HomeStackNavigation}
          />
        )}
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default RootStackNavigation;
