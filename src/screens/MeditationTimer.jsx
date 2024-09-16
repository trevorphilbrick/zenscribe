import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Text from "../components/Text";

const MeditationTimer = () => {
  const { goBack } = useNavigation();
  return (
    <View>
      <Text onPress={() => goBack()}>Back</Text>
      <Text>MeditationTimer</Text>
    </View>
  );
};

export default MeditationTimer;
