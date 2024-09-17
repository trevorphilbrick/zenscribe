import { Pressable, View, TextInput, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import Text from "../components/Text";
import { colors } from "../constants/colors";
import { useStytch, useStytchSession } from "@stytch/react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const SignInWallTab = createBottomTabNavigator();

const CreateAccount = () => {
  const navigate = useNavigation();
  const [createAccountEmail, setCreateAccountEmail] = useState("");
  const [createAccountPassword, setCreateAccountPassword] = useState("");
  const stytchClient = useStytch();
  const { session } = useStytchSession();

  useEffect(() => {
    if (session) {
      navigate.navigate("HomeNavigator");
    }
  }, [session]);

  useEffect(() => {
    console.log({ createAccountEmail, createAccountPassword });
  }, [createAccountEmail, createAccountPassword]);

  const createPassword = () => {
    console.log({ createAccountEmail, createAccountPassword });
    stytchClient.passwords.create({
      email: createAccountEmail,
      password: createAccountPassword,
      session_duration_minutes: 60,
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <TextInput
          value={createAccountEmail}
          onChangeText={setCreateAccountEmail}
          placeholder="email"
          style={styles.input}
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
        />
        <TextInput
          value={createAccountPassword}
          onChangeText={setCreateAccountPassword}
          placeholder="password"
          style={styles.input}
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          // secureTextEntry
        />
        <Pressable
          onPress={createPassword}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? colors.primaryPressed : colors.primary,
            },
          ]}
        >
          <Text>Create Account</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignIn = () => {
  const navigate = useNavigation();
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const stytchClient = useStytch();
  const { session } = useStytchSession();

  useEffect(() => {
    if (session) {
      navigate.navigate("HomeNavigator");
    }
  }, [session]);

  const authenticatePassword = useCallback(() => {
    stytchClient.passwords.authenticate({
      email: signInEmail,
      password: signInPassword,
      session_duration_minutes: 60,
    });
  }, [stytchClient, signInEmail, signInPassword]);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <TextInput
          value={signInEmail}
          onChangeText={setSignInEmail}
          placeholder="email"
          style={styles.input}
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
        />
        <TextInput
          value={signInPassword}
          onChangeText={setSignInPassword}
          placeholder="password"
          style={styles.input}
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          secureTextEntry
        />
        <Pressable
          onPress={authenticatePassword}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? colors.primaryPressed : colors.primary,
            },
          ]}
        >
          <Text>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignInWall = () => {
  return (
    <SignInWallTab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: colors.onBackground,
        tabBarInactiveBackgroundColor: colors.background,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <SignInWallTab.Screen
        name="SignIn"
        component={SignIn}
        options={{ tabBarLabel: "Sign In" }}
      />
      <SignInWallTab.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{ tabBarLabel: "Create Account" }}
      />
    </SignInWallTab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    backgroundColor: colors.onBackground,
    justifyContent: "center",
    padding: 24,
    marginHorizontal: 24,
    borderRadius: 4,
  },
  input: {
    color: colors.textPrimary,
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 2,
    marginBottom: 12,
  },
  button: {
    padding: 12,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignInWall;
