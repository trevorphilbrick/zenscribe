import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import Text from "../components/Text";
import { colors } from "../constants/colors";

const JournalViewer = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();

  const { journalEntry } = params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          onPress={() => goBack()}
          name="close"
          color={colors.textPrimary}
          size={24}
          style={styles.closeIcon}
        />
      </View>
      <ScrollView>
        <Text style={styles.journalText}>{journalEntry}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeIcon: {
    marginBottom: 16,
  },
  journalText: {
    fontSize: 16,
  },
});

export default JournalViewer;
