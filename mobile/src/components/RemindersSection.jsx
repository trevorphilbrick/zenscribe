import { View, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import Text from "./Text";
import React from "react";

export default function RemindersSection() {
  return (
    <View style={styles.reminders}>
      <Text style={styles.text}>+</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  reminders: { backgroundColor: colors.onBackground, alignItems: "center", padding: 24, marginBottom: 16, borderRadius: 4 },
  text: { fontSize: 24 },
});
