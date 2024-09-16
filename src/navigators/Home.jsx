import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Account from "../screens/Account";
import JournalEditor from "../screens/JournalEditor";
import MeditationTimer from "../screens/MeditationTimer";
import DayActivityModal from "../screens/DayActivityModal";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../constants/colors";

const HomeStack = createStackNavigator();

const HomeTab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <HomeTab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: colors.onBackground,
        tabBarInactiveBackgroundColor: colors.background,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <HomeTab.Screen name="Home" component={Home} />
      <HomeTab.Screen name="Account" component={Account} />
    </HomeTab.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeTabNavigator" component={HomeTabNavigator} />
      <HomeStack.Screen name="JournalEditor" component={JournalEditor} />
      <HomeStack.Screen name="MeditationTimer" component={MeditationTimer} />
      <HomeStack.Group screenOptions={{ presentation: "modal" }}>
        <HomeStack.Screen
          name="DayActivityModal"
          component={DayActivityModal}
        />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
