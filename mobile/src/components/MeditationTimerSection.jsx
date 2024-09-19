import { View, StyleSheet, Pressable, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Text from "./Text";
import Button from "./Button";
import { colors } from "../constants/colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/AntDesign";

const quickTimes = [3, 5, 10];
const times = Array.from({ length: 60 }, (_, i) => i + 1);

const MeditationTimerSection = () => {
  const [selectedTime, setSelectedTime] = React.useState(3);
  const [timeModalVisible, setTimeModalVisible] = React.useState(false);
  const { navigate } = useNavigation();
  const progressOne = useSharedValue(0);
  const progressTwo = useSharedValue(0);

  React.useEffect(() => {
    progressOne.value = withRepeat(
      withTiming(360, { duration: 8000, easing: Easing.linear }),
      "infinite"
    );
    progressTwo.value = withRepeat(
      withTiming(-360, { duration: 7000, easing: Easing.linear }),
      "infinite"
    );
  }, []);

  const animatedStylesOne = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -45 }, { rotate: `${progressOne.value}deg` }],
    };
  });

  const animatedStylesTwo = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -45 }, { rotate: `${progressTwo.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <Animated.View style={[styles.oval, animatedStylesOne]} />
        <Animated.View style={[styles.oval, animatedStylesTwo]} />
        <View style={styles.circle} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        {quickTimes.map((time) => (
          <Pressable
            key={time}
            style={{
              padding: 8,
              backgroundColor:
                time === selectedTime ? colors.selected : colors.onBackground,
              borderRadius: 2,
            }}
            onPress={() => setSelectedTime(time)}
          >
            <Text>{time} min</Text>
          </Pressable>
        ))}

        <Pressable
          style={{
            padding: 8,
            borderRadius: 2,
            backgroundColor: quickTimes.includes(selectedTime)
              ? colors.onBackground
              : colors.selected,
          }}
          onPress={() => setTimeModalVisible(true)}
        >
          <Text>Custom</Text>
        </Pressable>
      </View>
      <Button
        onPress={() => navigate("MeditationTimer", { duration: selectedTime })}
      >
        <Text>Start Meditation Timer</Text>
      </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={timeModalVisible}
        onRequestClose={() => {
          setTimeModalVisible(false);
        }}
      >
        <View
          style={{
            backgroundColor: colors.backgroundTransparent,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: colors.onBackground,
              padding: 16,
              margin: 16,
              borderRadius: 4,
            }}
          >
            <Icon
              name="close"
              size={24}
              color={colors.textPrimary}
              style={{ alignSelf: "flex-end", marginBottom: 16 }}
              onPress={() => setTimeModalVisible(false)}
            />
            <Picker
              selectedValue={selectedTime}
              onValueChange={(itemValue) => setSelectedTime(itemValue)}
              itemStyle={{ color: colors.textPrimary }}
              style={{ marginBottom: 16 }}
            >
              {times.map((time) => (
                <Picker.Item
                  key={time}
                  label={`${time} ${time === 1 ? "minute" : "minutes"}`}
                  value={time}
                />
              ))}
            </Picker>
            <Button
              onPress={() => {
                navigate("MeditationTimer", { duration: selectedTime });
                setTimeModalVisible(false);
              }}
            >
              <Text>Done</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.onBackground,
    borderRadius: 4,
    marginTop: 16,
  },
  animationContainer: {
    width: "100%",
    height: 100,
    marginBottom: 16,
  },
  oval: {
    width: 90,
    height: 100,
    position: "absolute",
    left: "50%",
    borderColor: colors.textPrimary,
    borderWidth: 1,
    borderRadius: 100,
  },
  circle: {
    width: 90,
    height: 90,
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: -45 }, { translateY: -45 }, { rotate: "90deg" }],
    borderColor: colors.textPrimary,
    borderWidth: 1,
    borderRadius: 100,
  },
});

export default MeditationTimerSection;
