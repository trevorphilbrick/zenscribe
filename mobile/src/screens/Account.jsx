import { View, StyleSheet } from "react-native";
import Text from "../components/Text";
import { useStytch } from "@stytch/react-native";
import Button from "../components/Button";
import RemindersSection from "../components/RemindersSection";
import notifee from "@notifee/react-native";
import { useState, useEffect } from "react";

const Account = () => {
  const stytchClient = useStytch();

  return (
    <View style={styles.screen}>
      <RemindersSection />
      <Button style={styles.signOutButton} onPress={() => stytchClient.session.revoke()}>
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
