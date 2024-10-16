import { View, StyleSheet, Switch } from "react-native";
import Text from "../components/Text";
import { useStytch } from "@stytch/react-native";
import Button from "../components/Button";
import RemindersSection from "../components/RemindersSection";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/colors";
import { useAppStore } from "../state/useAppStore";

const Account = () => {
  const stytchClient = useStytch();
  const { navigate } = useNavigation();
  const [signoutDisabled, setSignoutDisabled] = useState(false);
  const { playSoundOnStart, setPlaySoundOnStart } = useAppStore(
    (state) => state
  );

  const handleSignout = async () => {
    setSignoutDisabled(true);
    await stytchClient.session.revoke();
    navigate("SignInWall");
    setSignoutDisabled(false);
  };

  return (
    <View style={styles.screen}>
      <RemindersSection />
      <View
        style={{
          borderTopColor: colors.onBackground,
          borderTopWidth: 1,
          paddingTop: 16,
        }}
      >
        <Button
          onPress={() => handleSignout()}
          style={{ marginBottom: 16 }}
          disabled={signoutDisabled}
        >
          <Text>Sign Out</Text>
        </Button>
        <View style={styles.switchRow}>
          <Text>Auto-play sound</Text>
          <Switch
            value={playSoundOnStart}
            onValueChange={setPlaySoundOnStart}
            trackColor={{ false: colors.onBackground, true: colors.secondary }}
            thumbColor={colors.textPrimary}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 16,
    height: "100%",
    paddingBottom: 16,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
});

export default Account;
