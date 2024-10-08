import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeNavigator from "./Home";
import SignInWall from "../screens/SignInWall";
import { useStytch } from "@stytch/react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RootStack = createStackNavigator();

const Root = () => {
  const stytchClient = useStytch();
  const { navigate } = useNavigation();
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    stytchClient.session.onChange((session) => {
      if (!session) {
        navigate("SignInWall");
      }
    });
  }, []);

  return (
    <>
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={stytchClient.session ? "HomeNavigator" : "SignInWall"}
      >
        <RootStack.Screen name="SignInWall" component={SignInWall} />
        <RootStack.Screen name="HomeNavigator" component={HomeNavigator} />
      </RootStack.Navigator>
      <Toast topOffset={top + 16} />
    </>
  );
};

export default Root;
