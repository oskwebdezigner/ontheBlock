import "react-native-gesture-handler";
import React, { useState, useEffect, useReducer, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  ActivityIndicator,
  View,
  SafeAreaView,
  Image,
  LogBox,
} from "react-native";
import ThemeReducer from "./src/context/ThemeContext/ThemeReducer";
import ThemeContext from "./src/context/ThemeContext/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";
import AppContainer from "./src/routes";
import * as Font from "expo-font";
import { ApolloProvider } from "@apollo/client";
import setupApolloClient from "./src/apollo/index";
import { AuthContext } from "./src/context/Auth/auth";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import "react-native-url-polyfill/auto";

const themeValue = "Yellow";
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default function App() {
  LogBox.ignoreAllLogs(); //Ignore all log warnings
  const [theme, themeSetter] = useReducer(ThemeReducer, themeValue);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [client, setupClient] = useState(null);
  const [token, setToken] = useState(false);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const notificationListener = useRef();
  const responseListener = useRef();
  async function permissionForPushNotificationsAsync() {
    // let token;
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    console.log("existingStatus:", existingStatus);
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      // alert('Failed to get push token for push notification!');
      return false;
    }
    if (finalStatus == "granted") {
      let token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Notification Expo Token:", token);

      return token;
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }
  useEffect(() => {
    permissionForPushNotificationsAsync().then(async (token) => {
      // setExpoPushToken(token);
      await AsyncStorage.setItem("notification_token", token);
    });
    // console.log("token:", expoPushToken);
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("notification:", notification.data);
      }
    );

    // // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("response :", response.notification.request.content.data);
        // navigate(response.notification.request.content.data?.navigate);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    try {
      AsyncStorage.getItem("theme").then((response) =>
        response != "Yellow" ? themeSetter({ type: response }) : null
      );
    } catch (error) {}
  }, [theme]);

  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[{ height: STATUSBAR_HEIGHT }, { backgroundColor }]}>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <StatusBar
          translucent={true}
          backgroundColor={backgroundColor}
          {...props}
        />
      </SafeAreaView>
    </View>
  );

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.log(e);
      }
    })();
    LoadApp();
  }, []);

  async function LoadApp() {
    const client = await setupApolloClient();

    await Font.loadAsync({
      "Poppins-Bold": require("./src/assets/font/Poppins-Bold.ttf"),
      "Poppins-Regular": require("./src/assets/font/Poppins-Regular.ttf"),
      "Poppins-Medium": require("./src/assets/font/Poppins-Medium.ttf"),
      "Poppins-Semibold": require("./src/assets/font/Poppins-Semibold.ttf"),
    });
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    setFontLoaded(true);
    setupClient(client);

    // await SplashScreen.hideAsync()
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 3000);
  }

  function updateValue(val) {
    themeSetter({ type: val });
  }

  const setTokenAsync = async (token) => {
    await AsyncStorage.setItem("token", token);
    setToken(token);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setToken(null);
    } catch (e) {
      console.log("Logout App: ", e);
    }
  };
  // console.log("fontLoaded",fontLoaded)
  // console.log("client",client)
  if (fontLoaded && client) {
    return (
      <ApolloProvider client={client}>
        <ThemeContext.Provider
          value={{
            ThemeValue: theme,
            dispatch: themeSetter,
            updateValue,
          }}
        >
          <AuthContext.Provider value={{ token, setTokenAsync, logout }}>
            {Platform.OS === "android" && (
              <MyStatusBar backgroundColor={"transparent"} style="dark" />
            )}

            {Platform.OS === "ios" && (
              <StatusBar
                style="dark"
                backgroundColor="transparent"
                translucent={true}
              />
            )}
            <AppContainer />
            <FlashMessage position="top" />
          </AuthContext.Provider>
        </ThemeContext.Provider>
      </ApolloProvider>
    );
  } else {
    console.log("else client", client);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("./assets/splash.png")}
          style={{ height: "100%", width: "100%" }}
          resizeMode="contain"
        />
        {/* <ActivityIndicator size="large" color={'black'} /> */}
      </View>
    );
  }
}
