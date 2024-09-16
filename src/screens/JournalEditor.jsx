import { View } from "react-native";
import Text from "../components/Text";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const JournalEditor = () => {
  const { goBack } = useNavigation();
  return (
    <View>
      <Text onPress={() => goBack()}>Back</Text>
      <Text>JournalEditor</Text>
    </View>
  );
};

export default JournalEditor;
