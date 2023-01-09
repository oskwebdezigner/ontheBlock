import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { SimpleLineIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import fontStyles from "../utils/fonts/fontStyles";

// }
const tabIcon = (route, currentTheme) => ({
  // eslint-disable-next-line react/display-name
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    let icon;

    // if (route.name === 'noDrawer') {
    if (route.name === "Home") {
      icon = (
        <MaterialIcons
          name="perm-phone-msg"
          size={size}
          color={focused ? currentTheme.themeBackground : currentTheme.F9A2B7}
        />
      );
    } else if (route.name === "Profile") {
      icon = (
        <Ionicons
          name="person-outline"
          size={size}
          color={focused ? currentTheme.themeBackground : currentTheme.F9A2B7}
        />
      );
    } else if (route.name === "Wallet") {
      icon = (
        <Ionicons
          name="wallet-outline"
          size={size}
          color={focused ? currentTheme.themeBackground : currentTheme.F9A2B7}
        />
      );
    } else if (route.name === "SocialMedia") {
      icon = (
        <MaterialIcons
          name="groups"
          size={size}
          color={focused ? currentTheme.themeBackground : currentTheme.F9A2B7}
        />
      );
    }
    return <View>{icon}</View>;
  },
});

const tabOptions = () => ({
  keyboardHidesTabBar: true,
  tabStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  style: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderTopRadius: 20,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    // width : '70%'
  },
  labelStyle: {
    fontFamily: fontStyles.PoppinsRegular,
  },
});
export { tabIcon, tabOptions };
