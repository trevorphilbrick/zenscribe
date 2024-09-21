import { View, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import Text from "./Text";
import React from "react";
import notifee, { TimetampTrigger, TriggerType } from "@notifee/react-native";
import Button from "./Button";

export default function RemindersSection() {
  // async function onDisplayNotification() {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();

  // Create a channel (required for Android)
  // const channelId = await notifee.createChannel({
  //   id: "default",
  //   name: "Default Channel",
  // });

  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: "Meditation Reminder",
  //     body: "It's time to meditate.",
  //     android: {
  //       channelId,
  //       // pressAction is needed if you want the notification to open the app when pressed
  //       pressAction: {
  //         id: "default",
  //       },
  //     },
  //   });
  // }
  async function onCreateTriggerNotification() {
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    const date = new Date(Date.now());
    date.setHours(11);
    date.setMinutes(56);

    // Create a time-based trigger
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
      repeatFrequency: RepeatFrequency.DAILY,
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
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
