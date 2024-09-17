import Icon from "react-native-vector-icons/AntDesign";
import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const JournalEntryButton = () => {
  const { navigate } = useNavigation();
  return (
    <Pressable style={styles.button} onPress={() => navigate("JournalEditor")}>
      <Icon name="plus" size={24} color={colors.primary} style={styles.icon} />
      <Text style={styles.text}>Add Journal Entry</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    paddingVertical: 8,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 24,
    color: colors.primary,
  },
});

export default JournalEntryButton;
