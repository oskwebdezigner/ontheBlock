import React, { useContext, useState } from "react";
import {
  Platform,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import { gql, useMutation } from "@apollo/client";
import Layout from "../../Component/Layout/Layout";
import TextField from "../../Component/FloatTextField/FloatTextField";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import Spinner from "../../Component/Spinner/Spinner";
import { useQuery } from "@apollo/react-hooks";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { resetPassword } from "../../apollo/server";
import UserContext from "../../context/User/User";

const RESET_PASSWORD = gql`
  ${resetPassword}
`;

export default function ChangePassword(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const user = useContext(UserContext);
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Loading, setLoading] = useState(false);

  const [iconEye, setIconEye] = useState("eye-slash");
  function onChangeIcon() {
    if (iconEye === "eye") {
      setIconEye("eye-slash");
    } else {
      setIconEye("eye");
    }
  }

  const [NewiconEye, setNewIconEye] = useState("eye-slash");
  function onChangeIconNew() {
    if (NewiconEye === "eye") {
      setNewIconEye("eye-slash");
    } else {
      setNewIconEye("eye");
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

  const [mutate, { client }] = useMutation(RESET_PASSWORD, {
    onCompleted,
    onError,
  });

  async function onCompleted(data) {
    try {
      FlashMessage({ msg: "Password Changed!", type: "success" });
      console.log("resetPassword res :", data.resetPassword);
      // props.navigation.navigate("InventoryCategoryList");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function onError(error) {
    FlashMessage({ msg: error?.message?.toString(), type: "danger" });
    setLoading(false);
    console.log("resetPassword error  :", error);
  }

  async function ChangePassword() {
    let passwordRegex = /^(?=.*[0-9])(?=.*[aA-zZ]).{8,16}$/;
    let status = true;
    if (OldPassword === "") {
      FlashMessage({ msg: "Enter Current Password!", type: "warning" });
      status = false;
      return;
    }
    if (NewPassword === "") {
      FlashMessage({ msg: "Enter New Password!", type: "warning" });
      status = false;
      return;
    }
    if(NewPassword === OldPassword ){
      FlashMessage({ msg: "Current Password and New Password Cannot be same", type: "warning" });
      status = false;
      return;
    }

    if (!passwordRegex.test(NewPassword.trim())) {
      FlashMessage({
        msg:
          "Password Length must be greater than 8 & at contain atleast 1 alphabet!",
        type: "warning",
      });
      status = false;
      return;
    }
    if (ConfirmPassword === "") {
      FlashMessage({ msg: "Enter Re-Type Password!", type: "warning" });
      status = false;
      return;
    }
    if (ConfirmPassword !== NewPassword) {
      FlashMessage({
        msg: "New & Re-type Password Must Be Same!",
        type: "warning",
      });
      status = false;
      return;
    }

    if (status) {
      setLoading(true);
      await mutate({
        variables: {
          password: OldPassword,
          newPassword: NewPassword,
          email: user?.email,
        },
      });
    }
  }
  return (
    <Layout
      navigation={props.navigation}
      withoutScroll={true}
      LeftIcon={true}
      pagetitle={"Change Password"}
    >
      <KeyboardAvoidingView style={styles().flex}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <View style={[styles().flex, styles().mt30]}>
        <View style={styles().mb20}>
          <TextField
            keyboardType="default"
            value={OldPassword}
            label="Current Password"
            errorText={""}
            autoCapitalize="none"
            style
            onChangeText={(text) => {
              setOldPassword(text);
            }}
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
          />
        </View>
        <View style={styles().mb20}>
          <TextField
            keyboardType="default"
            value={NewPassword}
            label="New Password"
            errorText={""}
            autoCapitalize="none"
            style
            onChangeText={(text) => {
              setNewPassword(text);
            }}
            secureTextEntry={NewiconEye === "eye" ? false : true}
            childrenPassword={
              <TouchableOpacity
                onPress={onChangeIconNew.bind()}
                style={[styles().passEye]}
              >
                <FontAwesome
                  name={NewiconEye}
                  size={16}
                  color={currentTheme.textColor}
                />
              </TouchableOpacity>
            }
          />
        </View>

        <View style={styles().mb20}>
          <TextField
            keyboardType="default"
            secureTextEntry={iconEye === "eye" ? false : true}
            value={ConfirmPassword}
            label="Re-type Password"
            errorText={""}
            autoCapitalize="none"
            style
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            childrenPassword={
              <TouchableOpacity
                onPress={onChangeIcon.bind()}
                style={[styles().passEye]}
              >
                <FontAwesome
                  name={iconEye}
                  size={16}
                  color={currentTheme.textColor}
                />
              </TouchableOpacity>
            }
          />
        </View>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
      <View style={[styles().justifyEnd, styles().mb20]}>
        {!Loading ? (
          <ThemeButton Title={"Save"} onPress={() => ChangePassword()} />
        ) : (
          <Spinner />
        )}
      </View>
    </Layout>
  );
}
