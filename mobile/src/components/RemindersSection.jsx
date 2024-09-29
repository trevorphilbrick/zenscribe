import { View, StyleSheet, FlatList, Modal } from "react-native";
import { colors } from "../constants/colors";
import Text from "./Text";
import React, { useState, useEffect } from "react";
import notifee, { TriggerType, RepeatFrequency } from "@notifee/react-native";
import Button from "./Button";
// import { randomUUID } from "expo-crypto";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function RemindersSection() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [notis, setNotis] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(date.toISOString());
  }, [date]);

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

  async function onCreateTriggerNotification(date, hours, minutes) {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    console.log(date);
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

    await notifee.createTriggerNotification(
      {
        // id: randomUUID(),
        title: "Don't forget to breath.",
        body: "It's time to meditate.",
        android: {
          channelId,
        },
      },
      trigger
    );
  }

  useEffect(() => {
    notifee.getTriggerNotifications().then((n) => {
      setNotis(n);
      console.log(n);
    });
  }, []);

  const renderNotificationItem = ({ item }) => (
    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", padding: 8, marginTop: 8, backgroundColor: colors.secondary, borderRadius: 4 }}>
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
        <Button>
          <Text>Delete</Text>
        </Button>
      </View>
    </View>
  );

  return (
    <View style={styles.reminders}>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Button style={styles.btnMargin} onPress={showDatepicker}>
                <Text>Set date for reminder</Text>
              </Button>
              <Button style={styles.btnMargin} onPress={showTimepicker}>
                <Text>Set time for reminder</Text>
              </Button>
            </View>
            <Text style={styles.date}>
              Set for{" "}
              {`${date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
              })}, ${date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}`}
              ?
            </Text>
            {show && <DateTimePicker value={date} mode={mode} onChange={onChange} />}
            <View style={styles.modalButtons}>
              <Button style={{ backgroundColor: "none", borderWidth: 1, borderRadius: 4, borderColor: "gray" }} onPress={() => setModalVisible(!modalVisible)}>
                <Text>Cancel</Text>
              </Button>
              <Button onPress={() => onCreateTriggerNotification(new Date(date), `${date.getHours().toString().padStart(2, "0")}`, `${date.getMinutes().toString().padStart(2, "0")}`)}>
                <Text>Confirm</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <Button onPress={() => setModalVisible(true)}>
        <Text>New reminder</Text>
      </Button>
      <View>
        <FlatList data={notis} keyExtractor={(item) => item.notification.id} renderItem={renderNotificationItem} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reminders: { backgroundColor: colors.onBackground, padding: 24, marginBottom: 16, borderRadius: 4 },
  centeredView: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalView: {
    margin: 24,
    backgroundColor: colors.onBackground,
    borderRadius: 4,
    padding: 35,
  },
  btnMargin: { marginBottom: 16 },
  date: { marginBottom: 16, fontSize: 18 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
});
