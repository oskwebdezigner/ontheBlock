import React, { useCallback, useContext, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  Switch,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import UserContext from "../../context/User/User";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import { DeactiveAccount } from "../../apollo/server";
import { CommonActions } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function Profile(props) {
  const DEACTIVE_ACCOUNT = gql`
    ${DeactiveAccount}
  `;

  const user = useContext(UserContext);
  console.log("Profile user Context", user);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [notifi, setNotifi] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [Loading, setLoading] = useState(false);

  const toggleNotifi = () => setNotifi((previousState) => !previousState);

  const [appNotifi, setAppNotifi] = useState(false);
  const toggleAppNotifi = () => setAppNotifi((previousState) => !previousState);

  const [mutate, { client }] = useMutation(DEACTIVE_ACCOUNT, {
    onCompleted,
    onError,
  });

  async function onCompleted(data) {
    try {
      FlashMessage({ msg: "Account Deleted!", type: "success" });
      console.log("DeactiveAccount res :", data);
      setDeletePopup(false);
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Auth" }],
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
    FlashMessage({ msg: error?.message?.toString(), type: "danger" });
    setLoading(false);
    console.log("DeactiveAccount error  :", error);
  }

  async function DeleteProfile() {
    setLoading(true);
    await mutate({
      variables: {
        email: user?.email,
      },
    });
  }

  const DeleteProfilePopup = () => {
    return (
      <Modal animationType="fade" transparent={true} visible={deletePopup}>
        <View
          style={[styles().flex, styles().alignCenter, styles().justifyCenter]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setDeletePopup(false)}
            style={[
              styles().posAbs,
              styles().top0,
              styles().bottom0,
              styles().left0,
              styles().right0,
              { backgroundColor: currentTheme.modalShadow },
            ]}
          />
          <View style={[styles().alignCenter, styles().justifyCenter]}>
            <View
              style={[
                styles().bgWhite,
                styles().pt25,
                // styles().alignCenter,
                styles().justifyCenter,
                styles().br10,
                styles().pb25,
                styles().ph15,
                { width: width * 0.8 },
              ]}
            >
              <View style={[styles().alignCenter]}>
                <AntDesign
                  name="warning"
                  size={40}
                  color={currentTheme.dangerRed}
                />
                <Text
                  style={[
                    styles().fs16,
                    styles().fontSemibold,
                    styles().textCenter,
                    styles().mt15,
                    {
                      color: currentTheme.black,
                      // marginBottom: 20,
                    },
                  ]}
                >
                  Are You Sure You Want To Delete Your Account?
                </Text>
              </View>

              {Loading ? (
                <ActivityIndicator
                  size={"small"}
                  color={currentTheme.themeBackground}
                  style={{ marginVertical: 15 }}
                />
              ) : (
                <ThemeButton
                  onPress={() => DeleteProfile()}
                  Title={"Delete Account"}
                  StyleText={{ color: currentTheme.white, fontSize: 14 }}
                  Style={[
                    styles().mt15,
                    styles().mb15,
                    styles().h45px,
                    {
                      backgroundColor: currentTheme.dangerRed,
                      borderWidth: 0,
                    },
                  ]}
                />
              )}
              <ThemeButton
                Style={[styles().h45px]}
                StyleText={{ fontSize: 14 }}
                onPress={() => setDeletePopup(false)}
                Title={"Back"}
                withoutBg={true}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  function ProfileList(props) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={props.onPress}
        style={[
          styles().br5,
          // styles().pv15,
          styles().flexRow,
          styles().mv10,
          styles().justifyBetween,
          styles().alignCenter,
          // {borderWidth:2}
        ]}
      >
        <Text
          style={[
            styles().fs14,
            // styles().fw400,
            // styles().flex,
            // styles().ml15,
            // styles().fontRegular,
            {
              color:
                props.ListName === "Delete Account"
                  ? currentTheme.danger
                  : currentTheme.textColor,
              fontWeight: props.ListName === "Delete Account" ? "600" : "400",
            },
          ]}
        >
          {props.ListName}
        </Text>
        <View style={[styles().flexRow, styles().alignCenter]}>
          {props.LanguageName ? (
            <Text
              style={[
                styles().fs12,
                styles().mr10,
                styles().fw400,
                { color: currentTheme.textColor },
              ]}
            >
              {props.LanguageName}
            </Text>
          ) : null}

          {props.NotiSwitch ? (
            <Switch
              trackColor={{
                false: currentTheme.textColor,
                true: currentTheme.themeBackground,
              }}
              thumbColor={setNotifi ? currentTheme.white : currentTheme.white}
              ios_backgroundColor="#3e3e3e"
              onValueChange={props.onValueChange}
              value={props.value}
            />
          ) : (
            <View
              style={[
                styles().wh25px,
                styles().alignCenter,
                styles().justifyCenter,
                styles().br5,
                { backgroundColor: currentTheme.textColor },
              ]}
            >
              <FontAwesome
                name="angle-right"
                size={20}
                color={currentTheme.white}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  function ProfileListHead(props) {
    return (
      <View
        style={[
          styles().flexRow,
          styles().mb15,
          styles().alignCenter,
          styles().pb10,
          { borderBottomColor: currentTheme.ECECEC, borderBottomWidth: 1 },
        ]}
      >
        <View style={[styles().mr10]}>{props.iconName}</View>
        <View>
          <Text
            style={[
              styles().fs16,
              styles().fw600,
              { color: currentTheme.black },
            ]}
          >
            {props.ListTitle}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      pagetitle={"My Profile"}
      style={styles().ph20}
    >
      <View style={[styles().flex, styles().mt30]}>
        <View style={styles().mb30}>
          <ProfileListHead
            ListTitle={"Account"}
            iconName={
              <FontAwesome
                name="user-circle"
                size={20}
                color={currentTheme.black}
              />
            }
          />
          <ProfileList
            ListName={"Edit Profile"}
            onPress={() => props.navigation.navigate("EditProfile")}
          />
          <ProfileList
            ListName={"Change Password"}
            onPress={() => props.navigation.navigate("ChangePassword")}
          />
        </View>
        <View style={styles().mb30}>
          <ProfileListHead
            ListTitle={"Notifications"}
            iconName={
              <FontAwesome name="bell" size={20} color={currentTheme.black} />
            }
          />
          <ProfileList
            ListName={"Notifications"}
            NotiSwitch={true}
            onValueChange={toggleNotifi}
            value={notifi}
            // onPress={() => props.navigation.navigate("PersonalDetails")}
          />
        </View>
        <View style={styles().mb30}>
          <ProfileListHead
            ListTitle={"More"}
            iconName={
              <FontAwesome
                name="plus-square"
                size={20}
                color={currentTheme.black}
              />
            }
          />
          <ProfileList
            ListName={"Language"}
            LanguageName={"English"}
            // onPress={() => props.navigation.navigate("PersonalDetails")}
          />
          <ProfileList
            ListName={"Help"}
            // onPress={() => props.navigation.navigate("PersonalDetails")}
          />
          <ProfileList
            ListName={"Delete Account"}
            onPress={() => setDeletePopup(true)}
          />
        </View>
      </View>
      <DeleteProfilePopup />
    </Layout>
  );
}
