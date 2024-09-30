import React from "react";
import { colors } from "../constants/colors";
import Animated from "react-native-reanimated";

const Text = (props) => {
  return (
    <Animated.Text
      {...props}
      style={{ color: colors.textPrimary, ...props.style }}
    >
      {props.children}
    </Animated.Text>
  );
};

export default Text;
