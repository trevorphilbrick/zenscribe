import { View, StyleSheet } from "react-native";
import Text from "../components/Text";
import { useStytch, useStytchUser } from "@stytch/react-native";
import Button from "../components/Button";
import RemindersSection from "../components/RemindersSection";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/colors";
import { getData } from "../utils/asyncStorageUtils";
import { DateTime } from "luxon";
import { insertToDatabase } from "../utils/supabase";
import Toast from "react-native-toast-message";

const Account = () => {
  const stytchClient = useStytch();
  const {
    user: { user_id },
  } = useStytchUser();
  const { navigate } = useNavigation();
  const [signoutDisabled, setSignoutDisabled] = useState(false);
  const [backupDataDisabled, setBackupDataDisabled] = useState(false);

  const handleSignout = async () => {
    setSignoutDisabled(true);
    await stytchClient.session.revoke();
    navigate("SignInWall");
    setSignoutDisabled(false);
  };

  const handleBackupData = async () => {
    setBackupDataDisabled(true);
    const data = await getData("sessions");

    if (data && user_id) {
      try {
        const response = await insertToDatabase("backups", [
          {
            user_id,
            backup_date: DateTime.now(), // JS Date object for timestamp
            data: JSON.stringify(data),
            status: "success",
          },
        ]);
        if (response.error) {
          throw new Error(response.error.message);
        }
        console.log("response", response);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "There was an error backing up your data.",
        });
      }
    }
    setBackupDataDisabled(false);
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
          onPress={() => handleBackupData()}
          style={{ marginBottom: 16 }}
          disabled={backupDataDisabled}
        >
          <Text>Backup Data</Text>
        </Button>
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
