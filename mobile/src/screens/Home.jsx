import { View, Pressable, StyleSheet } from "react-native";
import Text from "../components/Text";
import { useNavigation } from "@react-navigation/native";
import HomeCalendar from "../components/HomeCalendar";
import { colors } from "../constants/colors";
import JournalEntryButton from "../components/JournalEntryButton";
import MeditationTimerSection from "../components/MeditationTimerSection";

const Home = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.screen}>
      <HomeCalendar />
      <MeditationTimerSection />
      <JournalEntryButton />
      <Pressable onPress={() => navigate("DayActivityModal")}>
        <Text>Day Activity Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 16,
  },
});

export default Home;
