import React, { useContext, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  Switch,
  Image,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import {
  FontAwesome5,
  FontAwesome,
  Feather,
  Ionicons,
  SimpleLineIcons,
  AntDesign,
} from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import UserContext from "../../context/User/User";

export default function Profile(props) {
  const user = useContext(UserContext);
  console.log("Profile user Context", user);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [notifi, setNotifi] = useState(false);
  const toggleNotifi = () => setNotifi((previousState) => !previousState);

  const [appNotifi, setAppNotifi] = useState(false);
  const toggleAppNotifi = () => setAppNotifi((previousState) => !previousState);

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
            styles().fw400,
            // styles().flex,
            // styles().ml15,
            // styles().fontRegular,
            { color: currentTheme.textColor },
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
          {/* <ProfileList
            ListName={"App Notifications"}
            NotiSwitch={true}
            onValueChange={toggleAppNotifi}
            value={appNotifi}
            // onPress={() => props.navigation.navigate("PersonalDetails")}
          /> */}
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
        </View>
      </View>
    </Layout>
  );
}
