import { Pressable, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import React from "react";
import Text from "./Text";

const Button = ({ onPress, children, style, disabled }) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? colors.primaryPressed : colors.primary,
          ...style,
        },
      ]}
    >
      {children}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Button;
