import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Text from "../components/Text";

const DayActivityModal = () => {
  const { goBack } = useNavigation();
  return (
    <View>
      <Text onPress={() => goBack()}>Back</Text>
      <Text>DayActivityModal</Text>
    </View>
  );
};

export default DayActivityModal;
