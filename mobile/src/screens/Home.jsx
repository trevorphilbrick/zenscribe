import { ScrollView, StyleSheet } from "react-native";
import HomeCalendar from "../components/HomeCalendar";
import JournalEntryButton from "../components/JournalEntryButton";
import MeditationTimerSection from "../components/MeditationTimerSection";

const Home = () => {
  return (
    <ScrollView style={styles.screen}>
      <HomeCalendar />
      <MeditationTimerSection />
      <JournalEntryButton />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 16,
  },
});

export default Home;
