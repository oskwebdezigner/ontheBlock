import React from "react";
import { Platform } from "react-native";
import { showMessage } from "react-native-flash-message";

export default function FlashMessage({ msg, type }) {
  return showMessage({
    message: msg,
    type: type,
    position: "top",
    style: Platform.OS === "android" && {
      position: "absolute",
      top: 40,
      left: 15,
      right: 15,
      borderRadius: 10,
      zIndex: 9999999,
      justifyContent: "center",
      alignContent: "center",
    },
    height: Platform.OS === "android" ? 0.2 : 0.025,
    duration: 4000,
  });
}
