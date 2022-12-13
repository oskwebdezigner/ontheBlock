import React, { useContext, useState, useCallback, useEffect } from "react";
import {
  Platform,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";

import Layout from "../../Component/Layout/Layout";
import TextField from "../../Component/FloatTextField/FloatTextField";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import {
  AntDesign,
  Ionicons,
  EvilIcons,
  FontAwesome,
} from "@expo/vector-icons";

import Spinner from "../../Component/Spinner/Spinner";

import RangeSlider, { Slider } from "react-native-range-slider-expo";
import Multiselect from "../../Component/Multiselect/Multiselect";
import { ScrollView } from "react-native-gesture-handler";
import CameraComponent from "../../Component/CameraComponent/CameraComponent";
import MultipleImagePicker from "../../Component/CameraComponent/MultipleImagePicker";
import { ImageBackground } from "react-native-web";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { handymen } from "../../apollo/server";
import { useIsFocused } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
export default function HandymenEdit(props) {
  let property = props?.route?.params?.property;

  const HANDYMEN = gql`
    ${handymen}
  `;
  const isFocused = useIsFocused();
  const [Loading, setLoading] = useState(false);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const { loading, error, data, refetch } = useQuery(HANDYMEN, {
    fetchPolicy: "cache-and-network",
    onCompleted: ({ handymen }) => {
      console.log("handymen res :", handymen.results);
    },
    onError: (err) => {
      console.log("error in handymen :", err);
      FlashMessage({ msg: err?.message?.toString(), type: "danger" });
    },
  });

  useEffect(() => {
    refetch();
  }, [isFocused]);

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"My Handymen"}
      loading={loading}
      style={[styles().ph0]}
    >
      <View style={[styles().flex]}>
        <FlatList
          data={data?.handymen?.results}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={({ item, index }) => {
            return (
              <View
                key={index}
                style={{
                  padding: 10,
                  borderRadius: 10,
                  width: width * 0.9,
                  backgroundColor: currentTheme.white,
                  marginHorizontal: width * 0.05,
                  marginVertical: 5,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    height: 69,
                    width: 69,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: currentTheme.themeBackground,
                  }}
                >
                  <Image
                    source={require("../../assets/images/SinglePropertyList-img5.png")}
                    style={[styles().wh40px, { tintColor: "black" }]}
                    resizeMode={"contain"}
                  />
                </View>
                <View
                  style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 5 }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: currentTheme.black,
                    }}
                  >
                    {item.name?.toUpperCase()}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: currentTheme.textColor,
                      fontSize: 12,
                      marginVertical: 3,
                    }}
                  >
                    {item.occupation}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ color: currentTheme.textColor, fontSize: 12 }}
                  >
                    {item.contact_no}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <View style={[styles().mt35, styles().mb20, styles().ph20]}>
          {Loading ? (
            <Spinner />
          ) : (
            <ThemeButton
              onPress={() =>
                props.navigation.navigate("HandymenEdit", {
                  property: property,
                })
              }
              Title={"Add New Handymen"}
            />
          )}
        </View>
      </View>
    </Layout>
  );
}
