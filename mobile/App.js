import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StatusBar } from "react-native";
import Root from "./src/navigators/Root";
import { colors } from "./src/constants/colors.js";
import { StytchClient, StytchProvider } from "@stytch/react-native";
import { PlaybackService } from "./src/utils/PlaybackService";
import TrackPlayer from "react-native-track-player";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export const stytch = new StytchClient(
  "public-token-test-d281d93b-a84f-4c6b-bf8e-eaa21cacf5cc"
);

TrackPlayer.registerPlaybackService(() => PlaybackService);

TrackPlayer.setupPlayer();

const theme = {
  colors: {
    background: colors.background,
  },
};

export default function App() {
  return (
    <StytchProvider stytch={stytch}>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <NavigationContainer theme={theme}>
            <Root />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </StytchProvider>
  );
}
