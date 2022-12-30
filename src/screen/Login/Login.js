import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  Animated,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import { CommonActions } from "@react-navigation/native";
import {
  Ionicons,
  Foundation,
  FontAwesome5,
  Feather,
  Octicons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";

// import TextField from '../../Component/TextField/TextField';
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import AuthLayout from "../../Component/AuthLayout/AuthLayout";
import TextField from "../../Component/FloatTextField/FloatTextField";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { login } from "../../apollo/server";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import Spinner from "../../Component/Spinner/Spinner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import getEnvVars from "../../../environment";
import * as Google from "expo-google-app-auth";

const { width, height } = Dimensions.get("window");

const { ANDROID_CLIENT_ID_GOOGLE, IOS_CLIENT_ID_GOOGLE } = getEnvVars();
export default function Login(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [UserName, SetUserName] = useState("");
  const [UserError, setUserError] = useState(false);
  const [Password, SetPassword] = useState("");
  const [passError, setPasswordError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [notificationToken, setNotificationToken] = useState("");

  const LOGIN = gql`
    ${login}
  `;

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
      await AsyncStorage.setItem("notification_token", token);
      console.log("Notification Expo Token:", token);
      setNotificationToken(token);
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
  const [ConfirmiconEye, setConfirmIconEye] = useState("eye-slash");
  function onChangeIconConfirm() {
    if (ConfirmiconEye === "eye") {
      setConfirmIconEye("eye-slash");
    } else {
      setConfirmIconEye("eye");
    }
  }
  const [mutate, { client }] = useMutation(LOGIN, {
    onCompleted,
    onError,
  });

  async function onCompleted(data) {
    try {
      console.log("login res :", data.login);
      FlashMessage({ msg: "Login Successfully", type: "success" });
      await AsyncStorage.setItem("token", data.login?.token?.toString());
      // props.navigation.navigate("noDrawer", { user: data });
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "noDrawer" }],
        })
      );
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function onError(error) {
    FlashMessage({ msg: error.message?.toString(), type: "danger" });
    setLoading(false);
    console.log("login error  :", error);
  }

  function Login() {
    let status = true;
    if (UserName === "") {
      FlashMessage({ msg: "Enter Your Email Address!", type: "warning" });
      setUserError(true);
      status = false;
    }
    if (Password === "") {
      FlashMessage({ msg: "Enter Your Password!", type: "warning" });
      setPasswordError(true);
      status = false;
    }
    if (status) {
      setLoading(true);
      mutate({
        variables: {
          email: UserName.trim().toLowerCase(),
          password: Password.trim(),
          notificationToken: notificationToken,
        },
      });
    }
  }

  async function GoogleSignup() {
    try {
      console.log("ANDROID_CLIENT_ID_GOOGLE", ANDROID_CLIENT_ID_GOOGLE);
      console.log("IOS_CLIENT_ID_GOOGLE", IOS_CLIENT_ID_GOOGLE);
      const { type, accessToken, user } = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID_GOOGLE,
        androidClientId: ANDROID_CLIENT_ID_GOOGLE,
        iosStandaloneAppClientId: IOS_CLIENT_ID_GOOGLE,
        androidStandaloneAppClientId: ANDROID_CLIENT_ID_GOOGLE,
      });
      // console.log("accessToken",accessToken);
      console.log("user", user);

      if (type === "success") {
        console.log("TYPE:", type, "ACCESS_TOKEN:", accessToken, "USER:", user);
        // / `accessToken` is now valid and can be used to get data from the Google API with HTTP requests /;
        return user;
      } else {
        return false;
      }
    } catch (err) {
      console.log("error arha", err);
    }
  }

  useEffect(() => {
    permissionForPushNotificationsAsync();
  }, []);

  return (
    <AuthLayout withoutScroll={true} navigation={props.navigation}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles().w150px, styles().h110px]}>
            <Image
              source={require("../../assets/images/logo.png")}
              resizeMode="cover"
              style={styles().wh100}
            />
          </View>

          <View style={[styles().mt25, styles().mb35]}>
            <Text
              style={[
                styles().fs20,
                styles().fontSemibold,
                styles().lh30,
                styles().fw600,
                { color: currentTheme.themeBackground },
              ]}
            >
              Howdy,
            </Text>
            <Text
              style={[
                styles().fs20,
                styles().fontRegular,
                { color: currentTheme.black },
              ]}
            >
              Welcome Home
            </Text>
          </View>

          <View style={styles().mb20}>
            <TextField
              keyboardType="default"
              value={UserName}
              // label="Email/Phone"
              label="Email / Phone Number"
              errorText={UserError}
              autoCapitalize="none"
              style
              onChangeText={(text) => {
                setUserError(false);
                SetUserName(text);
              }}
            />
          </View>

          <View style={[styles().mb25]}>
            <TextField
              secureTextEntry={ConfirmiconEye === "eye" ? false : true}
              childrenPassword={
                <TouchableOpacity
                  onPress={onChangeIconConfirm.bind()}
                  style={[styles().passEye]}
                >
                  <FontAwesome
                    name={ConfirmiconEye}
                    size={16}
                    color={currentTheme.textColor}
                  />
                </TouchableOpacity>
              }
              keyboardType="default"
              onChangeText={(e) => {
                setPasswordError(false);
                SetPassword(e);
              }}
              value={Password}
              label="Password"
              errorText={passError}
              autoCapitalize="none"
              style
            />
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("ForgotPassword")}
            style={[styles().alignEnd]}
          >
            <Text
              style={[
                styles().fs13,
                styles().fontRegular,
                styles().textDecorationUnderline,
                { color: currentTheme.textColor },
              ]}
            >
              {"Forgot Password?"}
            </Text>
          </TouchableOpacity>

          <View style={[styles().mt20]}>
            {Loading ? (
              <Spinner />
            ) : (
              <ThemeButton
                Title={"Sign in"}
                // onPress={()=>
                //   {
                //     if(validate()){
                //       // console.log('asd')
                //       props.navigation.dispatch(
                //         CommonActions.reset({
                //           index:0, routes:[{name:'Home'}]
                //         })
                //         )
                //     }
                //   }
                // }
                onPress={() => Login()}
              />
            )}
          </View>

          <View
            style={[
              styles().flexRow,
              styles().mv25,
              styles().justifyBetween,
              styles().alignCenter,
            ]}
          >
            <View
              style={[
                styles().flex,
                { height: 2, backgroundColor: currentTheme.cEFEFEF },
              ]}
            />
            <Text
              style={[
                styles().fs12,
                styles().mh20,
                styles().fontRegular,
                { color: currentTheme.textColor },
              ]}
            >
              Or Sign in with
            </Text>
            <View
              style={[
                styles().flex,
                { height: 2, backgroundColor: currentTheme.cEFEFEF },
              ]}
            />
          </View>

          <View style={styles().mb25}>
            <TouchableOpacity
              // onPress={() => GoogleSignup()}
              style={[
                styles().bw1,
                styles().br50,
                styles().h50px,
                styles().alignCenter,
                styles().justifyCenter,
              ]}
            >
              <Text
                style={[
                  styles().fs14,
                  styles().fontRegular,
                  styles().lh30,
                  { color: currentTheme.black },
                ]}
              >
                Sign in with Google
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles().flexRow,
              styles().justifyCenter,
              styles().alignCenter,
              styles().mb30
            ]}
          >
            <Text
              style={[
                styles().fs12,
                styles().fontRegular,
                { color: currentTheme.lightBlue },
              ]}
            >
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("LetsBegin")}
            >
              <Text
                style={[
                  styles().fs12,
                  styles().fontSemibold,
                  styles().fw600,
                  { color: currentTheme.themeBackground },
                ]}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}
