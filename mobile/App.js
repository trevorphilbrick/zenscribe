import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet } from "react-native";
import Root from "./src/navigators/Root";
import { colors } from "./src/constants/colors.js";
import { StytchClient, StytchProvider } from "@stytch/react-native";

export const stytch = new StytchClient(
  "public-token-test-d281d93b-a84f-4c6b-bf8e-eaa21cacf5cc"
);

const theme = {
  colors: {
    background: colors.background,
  },
};

export default function App() {
  return (
    <StytchProvider stytch={stytch}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <NavigationContainer theme={theme}>
          <Root />
        </NavigationContainer>
      </SafeAreaView>
    </StytchProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
