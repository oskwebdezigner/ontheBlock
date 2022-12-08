import React, { useContext } from "react";
import {Text, TouchableOpacity } from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../../screen/styles";

export default function ThemeButton({
  onPress,
  Title,
  Style,
  StyleText,
  withoutBg,
 
}) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles(currentTheme).justifyCenter,
        styles(currentTheme).alignCenter,
        styles().h60px,
        styles().overflowH,
        styles().ph25,
        styles().br50,
        styles().bw1,
        {backgroundColor : withoutBg ? currentTheme.cE5E5E5 : currentTheme.themeBackground,
          borderColor:withoutBg ? currentTheme.cE5E5E5 : currentTheme.themeBackground },
        Style,
      ]}
    >
      <Text
          style={[
            { color: withoutBg ? currentTheme.borderColor : currentTheme.black },
            styles(currentTheme).fs16,
            styles().fw600,
            styles().fontSemibold,
            StyleText,
          ]}
        >
          {Title}
        </Text>
    </TouchableOpacity>
  );
}
