import { Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Text from "./Text";
import Button from "./Button";
import { colors } from "../constants/colors";

const MeditationTimerSection = () => {
  const { navigate } = useNavigation();
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: colors.onBackground,
        borderRadius: 4,
      }}
    >
      <Button onPress={() => navigate("MeditationTimer")}>
        <Text>Start Meditation Timer</Text>
      </Button>
    </View>
  );
};

export default MeditationTimerSection;
