import { View, Pressable } from "react-native";
import Text from "../components/Text";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const { navigate } = useNavigation();
  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={() => navigate("JournalEditor")}>
        <Text>Journal Page</Text>
      </Pressable>
      <Pressable onPress={() => navigate("MeditationTimer")}>
        <Text>Meditation Timer</Text>
      </Pressable>
      <Pressable onPress={() => navigate("DayActivityModal")}>
        <Text>Day Activity Modal</Text>
      </Pressable>
    </View>
  );
};

export default Home;
