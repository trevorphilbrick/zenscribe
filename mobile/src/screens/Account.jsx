import { View, StyleSheet } from "react-native";
import Text from "../components/Text";
import { useStytch } from "@stytch/react-native";
import Button from "../components/Button";
import RemindersSection from "../components/RemindersSection";
import { useState } from "react";
import { clearData } from "../utils/asyncStorageUtils";
import { useNavigation } from "@react-navigation/native";

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
      <Button
        style={styles.signOutButton}
        onPress={() => stytchClient.session.revoke()}
      >
        <Text>Account</Text>
      </Button>
      <Button
        onPress={() => handleSignout()}
        style={{ marginBottom: 16 }}
        disabled={signoutDisabled}
      >
        <Text>Sign Out</Text>
      </Button>
      <Button onPress={() => clearData()}>
        <Text>Clear Local Storage</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 16,
  },
});

export default Account;
