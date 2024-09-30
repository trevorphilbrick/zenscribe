import { ScrollView, View, TextInput, Pressable } from "react-native";
import { colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "../components/Text";
import { getData, saveData } from "../utils/asyncStorageUtils";
import { getFormattedDate } from "../utils/dateTimeUtils";

const JournalEditor = () => {
  const { goBack } = useNavigation();
  const { bottom } = useSafeAreaInsets();
  const [journalEntry, setJournalEntry] = useState("");

  const handleCreateSessionData = () => {
    const currentDate = new Date();

    const sessionData = {
      date: getFormattedDate(currentDate),
      timestamp: currentDate,
      activity: "Journal",
      journalEntry,
    };

    return sessionData;
  };

  const handleSave = async () => {
    const sessionData = handleCreateSessionData();

    const existingData = await getData("sessions");

    if (!existingData) {
      await saveData("sessions", {
        [sessionData.date]: {
          sessions: [sessionData],
          marked: true,
        },
      });
    }
    if (existingData && existingData[sessionData.date]) {
      await saveData("sessions", {
        ...existingData,
        [sessionData.date]: {
          sessions: [...existingData[sessionData.date].sessions, sessionData],
          marked: true,
        },
      });
    }
    if (existingData && !existingData[sessionData.date]) {
      await saveData("sessions", {
        ...existingData,
        [sessionData.date]: {
          sessions: [sessionData],
          marked: true,
        },
      });
    }

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
