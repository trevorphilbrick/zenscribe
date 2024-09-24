import { View, StyleSheet } from "react-native";
import Text from "../components/Text";
import { useStytch } from "@stytch/react-native";
import Button from "../components/Button";
import { clearData } from "../utils/asyncStorageUtils";

const Account = () => {
  const stytchClient = useStytch();

  return (
    <View style={styles.screen}>
      <Text>Account</Text>
      <Button
        onPress={() => stytchClient.session.revoke()}
        style={{ marginBottom: 16 }}
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
