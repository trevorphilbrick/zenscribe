import { Calendar } from "react-native-calendars";
import { colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { getData } from "../utils/asyncStorageUtils";
import { useFocusEffect } from "@react-navigation/native";

const HomeCalendar = () => {
  const { navigate } = useNavigation();
  const [calendarData, setCalendarData] = useState({});

  useFocusEffect(
    useCallback(() => {
      getData("sessions").then((data) => {
        setCalendarData(data);
      });
    }, [])
  );

  return (
    <Calendar
      onDayPress={(day) => {
        navigate("DayActivityModal", { data: calendarData[day.dateString] });
        console.log("selected day", day);
      }}
      theme={{
        calendarBackground: colors.background,
        textSectionTitleColor: colors.textPrimary,
        selectedDayBackgroundColor: "#00adf5",
        selectedDayTextColor: "#ffffff",
        todayTextColor: colors.secondary,
        dayTextColor: colors.textPrimary,
        textDisabledColor: colors.textDisabled,
        dotColor: "#00adf5",
        selectedDotColor: "#ffffff",
        arrowColor: colors.primary,
        monthTextColor: colors.textPrimary,
        textDayFontFamily: "monospace",
        textMonthFontFamily: "monospace",
        textDayHeaderFontFamily: "monospace",
        textDayFontWeight: "300",
        textMonthFontWeight: "bold",
        textDayHeaderFontWeight: "300",
        textDayFontSize: 16,
        textMonthFontSize: 24,
        textDayHeaderFontSize: 16,
      }}
      markedDates={calendarData}
    />
  );
};

export default HomeCalendar;
