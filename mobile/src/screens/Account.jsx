import { View, StyleSheet } from "react-native";
import Text from "../components/Text";
import { useStytch } from "@stytch/react-native";
import Button from "../components/Button";
import RemindersSection from "../components/RemindersSection";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/colors";

const Account = () => {
  const stytchClient = useStytch();
  const { navigate } = useNavigation();
  const [signoutDisabled, setSignoutDisabled] = useState(false);

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
});

export default Account;
