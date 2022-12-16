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
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";

import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import AuthLayout from "../../Component/AuthLayout/AuthLayout";

const { width, height } = Dimensions.get("window");

export default function Login(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  return (
    <AuthLayout navigation={props.navigation} style={styles().justifyCenter}>
      <View style={[styles().alignCenter]}>
        <View style={[styles().w150px, styles().h100px]}>
          <Image
            source={require("../../assets/images/logo.png")}
            resizeMode="contain"
            style={styles().wh100}
          />
        </View>

        <View style={[styles().mt25, styles().mb15]}>
          <Text
            style={[
              styles().fs20,
              styles().fontRegular,
              { color: currentTheme.black },
            ]}
          >
            Let's Create Your{" "}
          </Text>
          <Text
            style={[
              styles().fs20,
              styles().textCenter,
              styles().fontSemibold,
              styles().lh30,
              styles().fw600,
              { color: currentTheme.themeBackground },
            ]}
          >
            Profile
          </Text>
        </View>
      </View>

      <ThemeButton
        Title={"Let's Begin"}
        onPress={() => props.navigation.navigate("ChooseGoals")}
      />
    </AuthLayout>
  );
}
