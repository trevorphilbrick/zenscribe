import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Text from "../components/Text";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { colors } from "../constants/colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";

const MeditationTimer = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const [currentTime, setCurrentTime] = useState(
    minutesToSeconds(params?.duration)
  );
  const [isPaused, setIsPaused] = useState(true);
  const progressOne = useSharedValue(0);
  const progressTwo = useSharedValue(0);

  useEffect(() => {
    progressOne.value = withRepeat(
      withTiming(360, { duration: 10000, easing: Easing.linear }),
      "infinite"
    );
    progressTwo.value = withRepeat(
      withTiming(-360, { duration: 12000, easing: Easing.linear }),
      "infinite"
    );
  }, []);

  const animatedStylesOne = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -90 }, { rotate: `${progressOne.value}deg` }],
    };
  });

  const animatedStylesTwo = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -90 }, { rotate: `${progressTwo.value}deg` }],
    };
  });

  function minutesToSeconds(minutes) {
    return minutes * 60;
  }

  function formatMinutesSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((currentTime) => currentTime - 1);
    }, 1000);

    if (currentTime <= 0) {
      clearInterval(interval);
    }

    if (isPaused) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [currentTime, isPaused]);

  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 16 }}>
      <View>
        <Pressable onPress={() => goBack()}>
          <Icon name="close" size={24} color={colors.textPrimary} />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: 200,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text>{formatMinutesSeconds(currentTime)}</Text>
          {currentTime === minutesToSeconds(params.duration) && (
            <Text>Press Play To Begin</Text>
          )}
        </View>
        <View style={styles.circle} />
        <Animated.View style={[styles.oval, animatedStylesOne]} />
        <Animated.View style={[styles.oval, animatedStylesTwo]} />
      </View>
      <View
        style={{
          padding: 16,
          marginBottom: 24,
          backgroundColor: colors.onBackground,
          borderRadius: 4,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Pressable onPress={() => setIsPaused(!isPaused)}>
          {isPaused ? (
            <Icon name="play" size={24} color={colors.textPrimary} />
          ) : (
            <Icon name="pause" size={24} color={colors.textPrimary} />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  oval: {
    width: 180,
    height: 200,
    position: "absolute",
    left: "50%",
    borderColor: colors.textPrimary,
    borderWidth: 1,
    borderRadius: 100,
  },
  circle: {
    width: 180,
    height: 180,
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: -90 }, { translateY: -90 }, { rotate: "90deg" }],
    borderColor: colors.textPrimary,
    borderWidth: 1,
    borderRadius: 100,
  },
});

export default MeditationTimer;
