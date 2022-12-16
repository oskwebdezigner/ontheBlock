import React, { useState, useRef, useContext, useEffect } from "react";
import { View, Text, Image } from "react-native";

import styles from "../styles";
import fontStyles from "../../utils/fonts/fontStyles";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { validateFunc } from "../../constraints/constraints";
import { useIsFocused } from "@react-navigation/native";
import { ForgetPasswordChange } from "../../apollo/server";
import { gql, useMutation } from "@apollo/client";
import Spinner from "../../Component/Spinner/Spinner";
import { CommonActions } from "@react-navigation/native";
import Layout from "../../Component/Layout/Layout";
import TextField from "../../Component/TextField/TextField";
import AuthLayout from "../../Component/AuthLayout/AuthLayout";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";

const NEW_PASSWORD = gql`
  ${ForgetPasswordChange}
`;

export default function ResetPassword(props) {
  let token = props?.route?.params.token;
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState(null);

  const [cpassword, setCpassword] = useState("");
  const [cpasswordErr, setCpasswordErr] = useState(null);

  const [iconEye, setIconEye] = useState("eye-slash");
  const [CiconEye, setCIconEye] = useState("eye-slash");

  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPassword("");
    setpasswordError(null);
    setCpassword("");
    setCpasswordErr(null);
  }, [isFocused]);

  function onChangeIcon(status) {
    if (status === "password") {
      if (iconEye === "eye") {
        setIconEye("eye-slash");
      } else {
        setIconEye("eye");
      }
    } else {
      if (CiconEye === "eye") {
        setCIconEye("eye-slash");
      } else {
        setCIconEye("eye");
      }
    }
  }

  const [mutate, { client }] = useMutation(NEW_PASSWORD, {
    onCompleted,
    onError,
  });

  async function onCompleted(data) {
    try {
      console.log("resetpassword res :", data);
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
      setLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  function onError(error) {
    setLoading(false);
    FlashMessage({ msg: error?.message?.toString(), type: "warning" });
    console.log("resetpassword error :", error);
  }

  async function ResetPassword() {
    let passwordRegex = /^(?=.*[0-9])(?=.*[aA-zZ]).{8,16}$/;
    let status = true;
    if (password === "") {
      FlashMessage({ msg: "Enter Password! ", type: "warning" });
      setpasswordError(true);
      status = false;
      return;
    }

    if (!passwordRegex.test(password.trim())) {
      FlashMessage({
        msg:
          "Password Length must be greater than 8 & at contain atleast 1 alphabet!",
        type: "warning",
      });
      setpasswordError(true);
      status = false;
      return;
    }

    if (cpassword === "") {
      FlashMessage({ msg: "Enter Confirm Password! ", type: "warning" });
      setCpasswordErr(true);
      status = false;
      return;
    }

    if (cpassword !== password) {
      FlashMessage({
        msg: "Password and Confirm Password must be same! ",
        type: "warning",
      });
      status = false;
      return;
    }
    if (status) {
      setLoading(true);
      let data = {
        token: token,
        password: password,
      };
      await mutate({ variables: { ...data } });
    }
  }

  return (
    <AuthLayout navigation={props.navigation}>
      <View style={{ flex: 1 }}>
        <View style={[styles().w150px, styles().h100px]}>
          <Image
            source={require("../../assets/images/logo.png")}
            resizeMode="contain"
            style={styles().wh100}
          />
        </View>
        <View style={[styles().mt25]}>
          <Text
            style={[
              styles().fs24,
              styles().fontRegular,
              { color: currentTheme.black },
            ]}
          >
            Reset
            <Text
              style={[
                styles().fs24,
                styles().fontSemibold,
                styles().lh30,
                styles().fw600,
                { color: currentTheme.themeBackground },
              ]}
            >
              {" "}
              Password
            </Text>
          </Text>
        </View>
        <View style={[styles().mt10]}>
          <Text
            style={[
              styles().fs14,
              styles().fontRegular,
              styles().lh22,
              { color: currentTheme.borderColor },
            ]}
          >
            Your new password must be different from previous used password.
          </Text>
        </View>

        <View style={styles().mt10}>
          <TextField
            value={password}
            PlaceholderInfo="Password"
            errorText={passwordError}
            eye={true}
            onChangeText={(text) => {
              setpasswordError(null);
              setPassword(text);
            }}
            SetEditinfo={(text) => {
              setpasswordError(null);
              setPassword(text);
            }}
          />
        </View>
        <View style={styles().mt5}>
          <TextField
            value={cpassword}
            PlaceholderInfo="Confirm password"
            errorText={cpasswordErr}
            eye={true}
            onChangeText={(text) => {
              setCpasswordErr(null);
              setCpassword(text);
            }}
            SetEditinfo={(text) => {
              setCpasswordErr(null);
              setCpassword(text);
            }}
          />
        </View>
      </View>
      <View style={styles().mt20}>
        {!loading ? (
          <ThemeButton
            onPress={() => ResetPassword()}
            Title={"Reset Password"}
          />
        ) : (
          <Spinner />
        )}
      </View>
    </AuthLayout>
  );
}
