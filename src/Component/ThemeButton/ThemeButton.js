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
        styles().h50px,
        styles().overflowH,
        styles().ph25,
        styles().br5,
        styles().bw1,
        {backgroundColor : withoutBg ? 'transparent' : currentTheme.themeBackground,
          borderColor:withoutBg ? currentTheme.borderColor : currentTheme.themeBackground },
        Style,
      ]}
    >
      <Text
          style={[
            { color: withoutBg ? currentTheme.borderColor : currentTheme.white },
            styles(currentTheme).fs14,
            styles().fontMedium,
            StyleText,
          ]}
        >
          {Title}
        </Text>
    </TouchableOpacity>
  );
}
