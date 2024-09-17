import { View, StyleSheet } from "react-native";
import Text from "../components/Text";
import { useStytch } from "@stytch/react-native";
import Button from "../components/Button";

const Account = () => {
  const stytchClient = useStytch();

  return (
    <View style={styles.screen}>
      <Text>Account</Text>
      <Button onPress={() => stytchClient.session.revoke()}>
        <Text>Sign Out</Text>
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
