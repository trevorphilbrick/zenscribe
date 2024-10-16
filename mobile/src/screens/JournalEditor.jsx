import { ScrollView, View, TextInput, Pressable } from "react-native";
import { colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "../components/Text";
import { getFormattedDate } from "../utils/dateTimeUtils";
import { useAppStore } from "../state/useAppStore";
import Toast from "react-native-toast-message";

const JournalEditor = () => {
  const { goBack } = useNavigation();
  const { bottom } = useSafeAreaInsets();
  const [journalEntry, setJournalEntry] = useState("");
  const { updateSessions } = useAppStore((state) => state);

  const handleCreateSessionData = () => {
    const currentDate = new Date();
    const formattedDate = getFormattedDate(currentDate);

    const sessionData = {
      date: formattedDate,
      timestamp: currentDate.toISOString(),
      activity: "Journal",
      journalEntry,
    };

    return sessionData;
  };

  const handleSave = async () => {
    const sessionData = handleCreateSessionData();

    await updateSessions(sessionData);

    Toast.show({
      type: "success",
      text1: "Meditation session logged!",
      text2: "Going back to home screen.",
    });

    goBack();
  };
  return (
    <View style={{ padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Icon
          onPress={() => goBack()}
          name="close"
          color={colors.textPrimary}
          size={24}
          style={{ marginBottom: 16 }}
        />
        <Pressable onPress={() => handleSave()}>
          <Text style={{ fontSize: 16 }}>Save</Text>
        </Pressable>
      </View>
      <ScrollView>
        <TextInput
          style={{
            width: "100%",
            backgroundColor: colors.background,
            color: colors.textPrimary,
            fontSize: 16,
            paddingBottom: bottom + 48,
          }}
          multiline
          placeholder="Write your journal entry here..."
          placeholderTextColor={colors.textSecondary}
          value={journalEntry}
          onChangeText={(text) => setJournalEntry(text)}
        />
      </ScrollView>
    </View>
  );
};

export default JournalEditor;
