import { View, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import Text from "./Text";
import React, { useState } from "react";
import notifee, { TriggerType, RepeatFrequency } from "@notifee/react-native";
import Button from "./Button";
import { randomUUID } from "expo-crypto";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function RemindersSection() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  async function onCreateTriggerNotification(hours, minutes) {
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    const date = new Date(Date.now());
    date.setHours(hours);
    date.setMinutes(minutes);

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.HOURLY,
      alarmManager: {
        allowWhileIdle: true,
      },
    };

    await notifee.createTriggerNotification(
      {
        id: randomUUID(),
        title: "Don't forget to breath.",
        body: "It's time to meditate.",
        android: {
          channelId,
        },
      },
      trigger
    );
  }

  return (
    <View style={styles.reminders}>
      <Button onPress={() => onCreateTriggerNotification(`${date.getHours().toString().padStart(2, "0")}`, `${date.getMinutes().toString().padStart(2, "0")}`)}>
        <Text>Notify</Text>
      </Button>
      <Button onPress={showDatepicker}>
        <Text>Show Date Picker</Text>
      </Button>
      <Button onPress={showTimepicker}>
        <Text>Show Time Picker</Text>
      </Button>
      <Text>selected: {date.getHours()}</Text>
      {show && <DateTimePicker testID="dateTimePicker" value={date} mode={mode} onChange={onChange} />}
    </View>
  );
}

const styles = StyleSheet.create({
  reminders: { backgroundColor: colors.onBackground, padding: 24, marginBottom: 16, borderRadius: 4 },
  text: { fontSize: 24 },
});
