import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeStackNavigation from "./home-stack.navigation";
import SplashScreen from "../features/splash/splash.screen";
import LoginScreen from "../features/login/login.screen";

const Stack = createStackNavigator();

const RootStackNavigation = () => {
  const token = false;
  const isLoading = false;

  return (
    <React.Fragment>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoading ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : token ? (
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
