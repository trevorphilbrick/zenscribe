import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Account from "../screens/Account";
import JournalEditor from "../screens/JournalEditor";
import MeditationTimer from "../screens/MeditationTimer";
import DayActivityModal from "../screens/DayActivityModal";
import JournalViewer from "../screens/JournalViewer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../constants/colors";
import Icon from "react-native-vector-icons/AntDesign";

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
        headerShown: false,
      }}
    >
      <HomeTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={24} color={color} />
          ),
        }}
      />
      <HomeTab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={24} color={color} />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeTabNavigator" component={HomeTabNavigator} />
      <HomeStack.Screen name="JournalEditor" component={JournalEditor} />
      <HomeStack.Screen name="JournalViewer" component={JournalViewer} />
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
