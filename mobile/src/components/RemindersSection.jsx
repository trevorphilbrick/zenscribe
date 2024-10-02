import { View, StyleSheet, FlatList, Modal } from "react-native";
import { colors } from "../constants/colors";
import Text from "./Text";
import React, { useState, useEffect } from "react";
import notifee, { TriggerType, RepeatFrequency } from "@notifee/react-native";
import Button from "./Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/AntDesign";

export default function RemindersSection() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [notis, setNotis] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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

  async function fetchReminders() {
    const notifications = await notifee.getTriggerNotifications();
    setNotis(notifications);
  }

  async function onCreateTriggerNotification(date, hours, minutes) {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    date.setHours(hours);
    date.setMinutes(minutes);

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
      alarmManager: {
        allowWhileIdle: true,
      },
    };
    try {
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
    } catch (e) {
      Toast.show({
        type: "info",
        text1: "Uh oh!",
        text2: "Make sure to schedule a reminder for the future.",
      });
    }

    setModalVisible(!modalVisible);
    fetchReminders();
  }

  async function cancel(notificationId) {
    await notifee.cancelNotification(notificationId);
    fetchReminders();
  }

  useEffect(() => {
    fetchReminders();
  }, []);

  const renderNotificationItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 8,
        marginTop: 8,
        backgroundColor: colors.secondary,
        borderRadius: 4,
      }}
    >
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Reminder</Text>
        <Text style={{ fontSize: 16 }}>5 minute meditation.</Text>
        <Text style={{ fontSize: 16 }}>
          {`${new Date(item.trigger.timestamp).toLocaleDateString()}`}
          {", "}
          {`${new Date(item.trigger.timestamp).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}`}
        </Text>
      </View>
      <View style={{ justifyContent: "center", marginRight: 12 }}>
        <Button onPress={() => cancel(item.notification.id)}>
          <Text>Delete</Text>
        </Button>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={notis}
        keyExtractor={(item) => item.notification.id}
        renderItem={renderNotificationItem}
        ListHeaderComponent={
          <Button onPress={() => setModalVisible(true)}>
            <Text>New reminder</Text>
          </Button>
        }
        ListEmptyComponent={
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 48,
            }}
          >
            <Icon
              name="message1"
              size={24}
              color={colors.textSecondary}
              style={{ marginBottom: 8 }}
            />
            <Text style={{ color: colors.textSecondary }}>
              Set up reminders to create a daily meditation schedule.
            </Text>
          </View>
        }
        stickyHeaderIndices={[0]}
      />
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20, marginBottom: 24 }}>
              Set Daily Reminder
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <Button onPress={showDatepicker}>
                <Text>Date: {date.toLocaleDateString()}</Text>
              </Button>
              <Button onPress={showTimepicker}>
                <Text>
                  Time:{" "}
                  {date.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </Text>
              </Button>
            </View>

            {show && (
              <DateTimePicker value={date} mode={mode} onChange={onChange} />
            )}
            <View style={styles.modalButtons}>
              <Button
                style={{
                  backgroundColor: "none",
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: "gray",
                }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text>Cancel</Text>
              </Button>
              <Button
                onPress={() =>
                  onCreateTriggerNotification(
                    new Date(date),
                    `${date.getHours().toString().padStart(2, "0")}`,
                    `${date.getMinutes().toString().padStart(2, "0")}`
                  )
                }
              >
                <Text>Confirm</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  reminders: {
    backgroundColor: colors.onBackground,
    padding: 24,
    marginBottom: 16,
    borderRadius: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 24,
    backgroundColor: colors.onBackground,
    borderRadius: 4,
    paddingBottom: 32,
    paddingHorizontal: 32,
    paddingTop: 24,
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
});
