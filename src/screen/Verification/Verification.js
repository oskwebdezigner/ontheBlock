import React, { useState, useRef, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../styles";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import {
  forgotPassword,
  ForgotPasswordVerification,
  SendPhoneCode,
  verifyPhone,
} from "../../apollo/server";
import { gql, useMutation } from "@apollo/client";
import Spinner from "../../Component/Spinner/Spinner";

import AuthLayout from "../../Component/AuthLayout/AuthLayout";
import { useIsFocused } from "@react-navigation/native";

const VERIFY_PHONE = gql`
  ${verifyPhone}
`;
const FORGOT_PASSWORD_VERIFICATION = gql`
  ${ForgotPasswordVerification}
`;

const FORGOT_PASSWORD_RESEND = gql`
  ${forgotPassword}
`;

const SEND_PHONE_CODE_RESEND = gql`
  ${SendPhoneCode}
`;

const CELL_COUNT = 6;
export default function Verification(props) {
  let { user, goal, forgot_email } = props?.route?.params;
  //   console.log(props.route.params);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [value, setValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [loading, setLoading] = useState(false);

  const [mutate, { client }] = useMutation(
    forgot_email ? FORGOT_PASSWORD_VERIFICATION : VERIFY_PHONE,
    {
      onCompleted,
      onError,
    }
  );

  async function onCompleted(data) {
    try {
      console.log("verify res :", data);
      FlashMessage({ msg: "Account Verified Successfully", type: "success" });
      forgot_email
        ? props.navigation.navigate("ResetPassword", {
            email: forgot_email,
            token: data.forgotPasswordVerification.token,
          })
        : props.navigation.navigate("CreatePassword", {
            user: user,
            goal: goal,
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
    FlashMessage({ msg: "Invalid OTP", type: "danger" });
    console.log("verify error :", error);
    setLoading(false);
  }

  const [mutate_resend] = useMutation(
    // FORGOT_PASSWORD_RESEND,
    // FORGOT_PASSWORD_RESEND,
    forgot_email ? FORGOT_PASSWORD_RESEND : SEND_PHONE_CODE_RESEND,
    {
      onCompleted: onCompleted_resend,
      onError: onError_resend,
    }
  );

  async function onCompleted_resend(data) {
    try {
      console.log("resend res :", data);
      FlashMessage({ msg: "OTP sent!", type: "success" });
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  function onError_resend(error) {
    FlashMessage({ msg: error.message?.toString(), type: "danger" });
    console.log("resend error :", error);
  }

  async function Verify() {
    setLoading(true);
    if (value.length === 6) {
      let data = {
        phone: user?.phone,
        code: value,
      };

      let forgot = {
        email: forgot_email,
        code: value,
      };

      mutate({ variables: forgot_email ? { ...forgot } : { ...data } });
    } else {
      setLoading(false);
      FlashMessage({ msg: "Enter OTP!", type: "warning" });
    }
  }

  async function ResendOTP() {
    setCounter(counts);
    if (forgot_email) {
      mutate_resend({
        variables: {
          email: forgot_email,
        },
      });
    } else {
      mutate_resend({
        variables: {
          phone: user?.phone,
        },
      });
    }
  }

  const counts = 180;
  const [counter, setCounter] = useState(counts);
  const isFocused = useIsFocused();
  useEffect(() => {
    let timer = setInterval(() => {
      setCounter((count) => (count > 0 ? count - 1 : 0));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  function secondsToTime(e) {
    const h = Math.floor(e / 3600)
        .toString()
        .padStart(2, "0"),
      m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, "0");

    return h + ":" + m + ":" + s;
    // return `${h}:${m}:${s}`;
  }
  useEffect(() => {
    setCounter(counts);
  }, [isFocused]);
  console.log(user);
  return (
    <AuthLayout navigation={props.navigation}>
      <View style={styles().flex}>
        <View style={[styles().w150px, styles().h100px]}>
          <Image
            source={require("../../assets/images/logo.png")}
            resizeMode="cover"
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
            Phone
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
              Verification
            </Text>
          </Text>
          <Text
            style={[
              styles().fontRegular,
              { color: currentTheme.textColor },
              styles().fs14,
            ]}
          >
            {`Please enter 6 digit code send to your phone number ${user?.phone}`}
          </Text>
        </View>

        <View style={[styles().mt30, styles().mb10]}>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={[]}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => {
              return (
                <View
                  key={index}
                  style={[
                    styles(currentTheme).verifyContainer,
                    isFocused && {
                      borderColor: currentTheme.themeBackground,
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles().fs24,
                      styles().fontRegular,
                      {
                        color: currentTheme.themeBackground,
                        // backgroundColor: currentTheme.white
                      },
                    ]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : "-")}
                  </Text>
                </View>
              );
            }}
          />

          <View
            style={[
              styles().flexRow,
              styles().mt15,
              styles().justifyCenter,
              styles().alignCenter,
            ]}
          >
            <Text
              style={[
                styles().fontRegular,
                { color: currentTheme.black },
                styles().fs14,
              ]}
            >
              Resend code after
              <Text style={{ color: currentTheme.themeBackground }}>
                {` ${secondsToTime(counter)} `}
              </Text>
              {`Min. `}
            </Text>
            <TouchableOpacity
              disabled={counter === 0 ? false : true}
              onPress={() => ResendOTP()}
            >
              <Text
                style={[
                  styles().fontSemibold,
                  styles().fs14,
                  styles().textDecorationUnderline,
                  {
                    color:
                      counter === 0
                        ? currentTheme.themeBackground
                        : currentTheme.c999999,
                  },
                ]}
              >
                Resend
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        {!loading ? (
          <ThemeButton onPress={() => Verify()} Title={"Verify"} />
        ) : (
          <Spinner />
        )}
      </View>
    </AuthLayout>
  );
}
