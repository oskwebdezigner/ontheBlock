import { useRef } from "react";
import {
  //   CommonActions,
  NavigationContainerRef,
  StackActions,
  CommonNavigationAction,
  NavigationAction,
} from "@react-navigation/native";
import { CommonActions } from "@react-navigation/routers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import navigationService from "../../routes/navigationService";

export const ErrorHandler = async (error) => {
  console.log("ErrorHandler :", error);
  // if (error === "Unauthenticated.") {
  if (error === "Please authenticated") {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    AsyncStorage.clear().then(() => {
      console.log("async clear from Error Handler");
    });
    // reset({ index: 0, routes: [{ name: "Auth" }] });
    navigationService.ResetNavigation();
  } else {
    alert("Something went wrong, Try again later.");
    console.log("ErrorHandler:", error?.toString());
  }
};
