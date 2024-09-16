import { View, Text as RnText } from "react-native";
import React from "react";
import { colors } from "../constants/colors";

const Text = (props) => {
  return (
    <RnText {...props} style={{ color: colors.textPrimary, ...props.style }}>
      {props.children}
    </RnText>
  );
};

export default Text;
