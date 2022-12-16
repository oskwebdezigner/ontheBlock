import React, { useState, useRef, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import styles from "../styles";

import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AuthLayout from "../../Component/AuthLayout/AuthLayout";
import TextField from "../../Component/FloatTextField/FloatTextField";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";

import { validateFunc } from "../../constraints/constraints";
import { useIsFocused } from "@react-navigation/native";
import { forgotPassword } from "../../apollo/server";
import { gql, useMutation } from "@apollo/client";
import Spinner from "../../Component/Spinner/Spinner";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";

const FORGOT_PASSWORD = gql`
  ${forgotPassword}
`;

export default function ForgotPassword(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [PhoneNumber, setPhoneNumber] = useState("");
  const [PhoneNumbererror, setPhoneNumberError] = useState(null);

  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    setPhoneNumber("");
    setPhoneNumberError(null);
  }, [isFocused]);

  const [mutate, { client }] = useMutation(FORGOT_PASSWORD, {
    onCompleted,
    onError,
  });

  async function onCompleted(data) {
    try {
      console.log("forgotPassword res :", data);
      // FlashMessage({ msg: "OTP sent!", type: "success" });
      props.navigation.navigate("Verification", {
        forgot_email: PhoneNumber.trim().toLowerCase(),
        email: PhoneNumber.toLowerCase().trim(),
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function onError(error) {
    setLoading(false);
    FlashMessage({ msg: error?.message?.toString(), type: "danger" });
    console.log("forgotPassword error :", error);
  }

  function ForgotPassword() {
    let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let status = true;
    if (PhoneNumber === "") {
      FlashMessage({ msg: "Enter Email Address!", type: "warning" });
      setPhoneNumberError(true);
      status = false;
      return;
    }
    if (!emailregex.test(PhoneNumber.trim().toLowerCase())) {
      FlashMessage({ msg: "Invalid Email Address!", type: "warning" });
      setPhoneNumberError(true);
      status = false;
      return;
    }

    if (status) {
      setLoading(true);
      let user = {
        email: PhoneNumber.toLowerCase().trim(),
      };
      mutate({ variables: { ...user } });
    } else {
      setLoading(false);
    }
  }

  return (
    <AuthLayout navigation={props.navigation}>
      <View style={styles().flex}>
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
            Forgot
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

        <View style={styles().mt10}>
          <TextField
            keyboardType="default"
            value={PhoneNumber}
            label="Email"
            errorText={PhoneNumbererror}
            autoCapitalize="none"
            style
            onChangeText={(text) => {
              setPhoneNumberError(false);
              setPhoneNumber(text);
            }}
          />
        </View>
      </View>

      <View style={styles().mt20}>
        {!loading ? (
          <ThemeButton onPress={() => ForgotPassword()} Title={"Check"} />
        ) : (
          <Spinner />
        )}
      </View>
    </AuthLayout>
  );
}
