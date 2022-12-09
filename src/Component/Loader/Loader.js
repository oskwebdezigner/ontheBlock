import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
export default function Loader(props) {
  if (!props.loading) {
    return null;
  }
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        // backgroundColor: "red",
        alignSelf: "center",
        elevation: 10,
        zIndex: 190000,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(17, 17, 17, 0.6)",
        }}
      />
      <ActivityIndicator size="large" color={currentTheme.themeBackground} />
    </View>
  );
}
