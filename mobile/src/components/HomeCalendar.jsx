import { Calendar } from "react-native-calendars";
import { colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const HomeCalendar = () => {
  const { navigate } = useNavigation();
  return (
    <Calendar
      onDayPress={(day) => {
        navigate("DayActivityModal", { date: day });
      }}
      onPressArrowLeft={(substractMonth, time) => {
        substractMonth();
        console.log("month", month);
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
    />
  );
};

export default HomeCalendar;
