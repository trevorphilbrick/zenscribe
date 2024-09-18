import { View, StyleSheet } from "react-native";
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

const MeditationTimerSection = () => {
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
      <Button onPress={() => navigate("MeditationTimer")}>
        <Text>Start Meditation Timer</Text>
      </Button>
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
