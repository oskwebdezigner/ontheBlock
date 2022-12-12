import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";

export default function Spinner() {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  return <ActivityIndicator size={40} color={currentTheme.themeBackground} />;
}
