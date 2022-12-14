import React, { useContext, useState } from "react";
import {
  Platform,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Text,
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
import { resetPassword, profile } from "../../apollo/server";
import Spinner from "../../Component/Spinner/Spinner";
import { useQuery } from "@apollo/react-hooks";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";

const RESET_PASSWORD = gql`
  ${resetPassword}
`;
const PROFILE = gql`
  ${profile}
`;
export default function ChangePassword(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Layout
      navigation={props.navigation}
      withoutScroll={true}
      LeftIcon={true}
      pagetitle={"Change Password"}
    >
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
          />
        </View>
        <View style={styles().mb20}>
          <TextField
            keyboardType="default"
            value={ConfirmPassword}
            label="Re-type Password"
            errorText={""}
            autoCapitalize="none"
            style
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
          />
        </View>
      </View>
      <View style={[styles().justifyEnd, styles().mb20]}>
        {!loading ? (
          <ThemeButton Title={"Save"} onPress={() => {}} />
        ) : (
          <Spinner />
        )}
      </View>
    </Layout>
  );
}
