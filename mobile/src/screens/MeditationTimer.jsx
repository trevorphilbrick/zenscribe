import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Text from "../components/Text";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { colors } from "../constants/colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { sound } from "../data/sound";
import { formatMinutesSeconds, minutesToSeconds } from "../utils/timingUtils";
import { updateData } from "../utils/asyncStorageUtils";
import { getFormattedDate } from "../utils/dateTimeUtils";

const MeditationTimer = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  // state
  const [currentTime, setCurrentTime] = useState(
    minutesToSeconds(params?.duration)
  );
  const [isPaused, setIsPaused] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [hintText, setHintText] = useState("Press play to begin");

  // animations
  const progressOne = useSharedValue(0);
  const progressTwo = useSharedValue(0);
  const hintTextAnimatedStyle = useSharedValue(1);
  const timerAnimatedStyle = useSharedValue(1);

  // functions
  const handleQueueTracks = async () => {
    await TrackPlayer.add([sound.trackOne]);
    TrackPlayer.setRepeatMode(RepeatMode.Track);
  };

  const handleMusicPlaying = async () => {
    if (isMusicPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleSkipToEnd = () => {
    setCurrentTime(0);
  };

  const handleGoBack = () => {
    TrackPlayer.stop();
    goBack();
  };

  const handleCreateSessionData = () => {
    const currentDate = new Date();

    const sessionData = {
      date: getFormattedDate(currentDate),
      marked: true,
      timestamp: currentDate,
      duration: params?.duration,
      activity: "Meditation",
    };

    return { [sessionData["date"]]: sessionData };
  };

  const handleEndSession = () => {
    timerAnimatedStyle.value = withTiming(0);
    hintTextAnimatedStyle.value = withTiming(0);
    setTimeout(() => {
      setHintText("Logging your session...");
      hintTextAnimatedStyle.value = withTiming(1);
    }, 1000);

    const sessionData = handleCreateSessionData();

    updateData("sessions", sessionData);
  };

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

  // effects
  useEffect(() => {
    progressOne.value = withRepeat(
      withTiming(360, { duration: 10000, easing: Easing.linear }),
      "infinite"
    );
    progressTwo.value = withRepeat(
      withTiming(-360, { duration: 12000, easing: Easing.linear }),
      "infinite"
    );

    handleQueueTracks();

    TrackPlayer.play();
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (currentTime === minutesToSeconds(params?.duration)) {
        setHintText("Press play to begin");
      } else {
        setHintText("Press play to resume");
      }
      hintTextAnimatedStyle.value = withTiming(1);
    } else {
      hintTextAnimatedStyle.value = withTiming(0);
    }
  }, [isPaused]);

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

  useEffect(() => {
    if (currentTime === 0) {
      handleEndSession();
    }
  }, [currentTime]);

  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 16 }}>
      <View>
        <Pressable onPress={() => handleGoBack()}>
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
          <Text style={{ fontSize: 32, opacity: timerAnimatedStyle }}>
            {formatMinutesSeconds(currentTime)}
          </Text>

          <Animated.Text
            style={{
              opacity: hintTextAnimatedStyle,
              color: colors.textPrimary,
            }}
          >
            {hintText}
          </Animated.Text>
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
          justifyContent: "space-around",
        }}
      >
        <Pressable onPress={() => handleSkipToEnd()}>
          <Icon name="fastforward" size={24} color={colors.textPrimary} />
        </Pressable>
        <Pressable
          onPress={() => setIsPaused(!isPaused)}
          disabled={currentTime === 0}
        >
          {isPaused ? (
            <Icon name="play" size={24} color={colors.textPrimary} />
          ) : (
            <Icon name="pause" size={24} color={colors.textPrimary} />
          )}
        </Pressable>
        <Pressable onPress={() => handleMusicPlaying()}>
          {isMusicPlaying ? (
            <EntypoIcon name="sound" size={24} color={colors.textPrimary} />
          ) : (
            <EntypoIcon
              name="sound-mute"
              size={24}
              color={colors.textPrimary}
            />
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
