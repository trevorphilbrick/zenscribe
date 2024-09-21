import { View, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import Text from "./Text";
import React from "react";
import notifee, { TriggerType, RepeatFrequency } from "@notifee/react-native";
import Button from "./Button";
import { randomUUID } from "expo-crypto";

export default function RemindersSection() {
  async function onCreateTriggerNotification() {
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    const date = new Date(Date.now());
    date.setHours(13);
    date.setMinutes(1);

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
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
      <Button onPress={() => onCreateTriggerNotification()}>
        <Text>Notify</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  reminders: { backgroundColor: colors.onBackground, padding: 24, marginBottom: 16, borderRadius: 4 },
  text: { fontSize: 24 },
});
