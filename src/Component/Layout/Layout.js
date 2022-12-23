import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  StatusBar,
  Platform,
  Animated,
  ScrollView,
  SafeAreaView,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../../screen/styles";
import {
  Entypo,
  Foundation,
  Feather,
  Octicons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import Header from "../Header/Header";
import { LinearGradient } from "expo-linear-gradient";
import CarouselView from "../../Component/Carousel/Carousel";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import Loader from "../Loader/Loader";

const { width, height } = Dimensions.get("window");

export default function Layout({
  onPress,
  headerShown,
  withoutScroll,
  style,
  children,
  navigation,
  NotiIcon,
  LeftIcon,
  pagetitle,
  ProfileImg,
  loading,
  property,
}) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  return (
    <View style={[styles().flex, { backgroundColor: currentTheme.white }]}>
      <SafeAreaView
        style={[
          styles().flex,
          {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
        ]}
      >
        {headerShown === undefined && (
          <Header
            navigation={navigation}
            NotiIcon={NotiIcon}
            LeftIcon={LeftIcon}
            ProfileImg={ProfileImg}
            pagetitle={pagetitle}
            property={property}
            HeaderStyle={{ backgroundColor: currentTheme.white }}
          />
        )}

        {withoutScroll ? (
          <View
            style={[
              {
                flexGrow: 1,
                backgroundColor: currentTheme.white,
              },
              styles().ph20,

              style,
            ]}
          >
            {children}
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles().ph20,
              {
                flexGrow: 1,
                backgroundColor: currentTheme.white,
              },
              style,
            ]}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        )}
      </SafeAreaView>
      <Loader loading={loading} />
    </View>
  );
}
