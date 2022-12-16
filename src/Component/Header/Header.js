import React, { useContext } from "react";
import { View, Text, Image, Platform, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../../screen/styles";
import { gql, useMutation } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { getCartItems } from "../../apollo/client";
import UserContext from "../../context/User/User";
import { DrawerActions } from "@react-navigation/native";
const GETCARTITEMS = gql`
  ${getCartItems}
`;

export default function Header(props) {
  const user = useContext(UserContext);

  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const { StyleHead } = props;
  const { data, loading } = useQuery(GETCARTITEMS);

  function EmptyView() {
    return <View style={[styles().w25px, { backgroundColor: "red" }]} />;
  }

  function Back() {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={[
          styles().alignCenter,
          styles().justifyCenter,
          styles().h50px,
          styles().w25px,

          //   styles().ph20,
          //   styles().backButn
        ]}
      >
        <FontAwesome name="angle-left" size={30} color="black" />
      </TouchableOpacity>
    );
  }

  function Menu() {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
        style={[
          styles().boxpeshadow,
          styles().br5,
          styles().pall5,
          styles().wh40px,
          styles().justifyEvenly,
        ]}
      >
        <View style={[styles().w15px, styles(currentTheme).menuBarIcon]}></View>
        <View style={[styles().w30px, styles(currentTheme).menuBarIcon]}></View>
        <View style={[styles().w15px, styles(currentTheme).menuBarIcon]}></View>
      </TouchableOpacity>
    );
  }

  function NotiIcon() {
    return (
      <View style={[styles().mr10, styles().wh25px, styles().overflowH]}>
        <Image
          source={require("../../assets/images/bell-icon.png")}
          style={styles().wh100}
          resizeMode="contain"
        />
      </View>
    );
  }

  function ProfileImg() {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Profile");
        }}
        style={[
          styles().wh30px,
          styles().br15,
          styles().alignCenter,
          styles().justifyCenter,
          {
            borderColor: currentTheme.themeBackground,
            borderWidth: 1,
            overflow: "hidden",
          },
        ]}
      >
        {user?.photo ? (
          <Image
            source={{ uri: user?.photo }}
            resizeMode={"cover"}
            style={styles().wh100}
          />
        ) : (
          <Text
            style={{
              fontSize: 14,
              color: currentTheme.themeBackground,
              fontWeight: "bold",
            }}
          >
            {user?.first_name && user?.first_name[0]?.toUpperCase()}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles().flexRow,
        Platform.OS === "ios" ? styles().mt20 : styles().mt0,
        styles().alignCenter,
        styles().justifyBetween,
        styles().h50px,
        styles().ph20,
        StyleHead,
        props.HeaderStyle,
      ]}
    >
      {props.LeftIcon ? <Back /> : <Menu />}

      <Text
        style={[
          styles().fs20,
          styles().fw700,
          styles().fontSemibold,
          {
            color: currentTheme.borderColor,
            flex: 1,
            marginHorizontal: 15,
            textAlign: "center",
          },
        ]}
      >
        {props.pagetitle}
      </Text>

      <View
        style={[
          styles().flexRow,
          styles().justifyBetween,
          styles().alignCenter,
        ]}
      >
        {props.NotiIcon ? <NotiIcon /> : null}
        {props.ProfileImg ? <ProfileImg /> : null}
        {props.NotiIcon === undefined || props.ProfileImg === undefined ? (
          <View style={[styles().w25px]} />
        ) : null}
      </View>
    </View>
  );
}
