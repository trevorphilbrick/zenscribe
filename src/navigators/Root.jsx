import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeNavigator from "./Home";
import SignInWall from "../screens/SignInWall";

const RootStack = createStackNavigator();

const Root = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="HomeNavigator" component={HomeNavigator} />
      <RootStack.Screen name="SignInWall" component={SignInWall} />
    </RootStack.Navigator>
  );
};

export default Root;
