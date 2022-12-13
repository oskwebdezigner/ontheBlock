import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  Animated,
  Dimensions,
  Modal,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import {
  Ionicons,
  Foundation,
  Entypo,
  FontAwesome5,
  Feather,
  Octicons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";

const { width, height } = Dimensions.get("window");

export default function SinglePropertyListing(props) {
  const property = props?.route?.params?.singleList;
  // const propertyID = props?.route?.params?.propertyID;
  console.log("single Property Listing :", property);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const SinglePropertyList = [
    {
      id: 0,
      SingleListIcon: require("../../assets/images/SinglePropertyList-img1.png"),
      SingleListName: "Property Data",
      navigateTo: "PropertyData",
    },
    {
      id: 1,
      SingleListIcon: require("../../assets/images/SinglePropertyList-img2.png"),
      SingleListName: "Inventory",
      navigateTo: "InventoryCategoryList",
    },
    {
      id: 2,
      SingleListIcon: require("../../assets/images/SinglePropertyList-img3.png"),
      SingleListName: "Document",
      navigateTo: "DocumentListing",
    },
    {
      id: 3,
      SingleListIcon: require("../../assets/images/SinglePropertyList-img4.png"),
      SingleListName: "Schedule Task",
      navigateTo: "AddTask",
    },
    {
      id: 4,
      SingleListIcon: require("../../assets/images/SinglePropertyList-img5.png"),
      SingleListName: "My Handymen",
      navigateTo: "MyHandymen",
    },
    {
      id: 5,
      SingleListIcon: require("../../assets/images/SinglePropertyList-img6.png"),
      SingleListName: "Finance",
    },
  ];

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={
        property?.name ? property?.name?.toUpperCase() : "My Properties"
      }
    >
      <View style={[styles().flex, styles().pb20]}>
        <FlatList
          data={SinglePropertyList}
          showsVerticalScrollIndicator={false}
          bounces={false}
          ListHeaderComponent={<View style={styles().pt30} />}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  item.navigateTo &&
                  props.navigation.navigate(item.navigateTo, {
                    property: property,
                    pageTitle: property.name,
                  })
                }
                style={[
                  styles().flexRow,
                  styles().justifyBetween,
                  styles().ph25,
                  styles().h80px,
                  styles().flex,
                  styles().bw1,
                  styles().alignCenter,
                  {
                    borderColor: "transparent",
                    borderBottomColor: currentTheme.cEFEFEF,
                  },
                ]}
              >
                <View style={[styles().flexRow, styles().alignCenter]}>
                  <View
                    style={[styles().wh30px, styles().overflowH, styles().mr20]}
                  >
                    <Image
                      source={item.SingleListIcon}
                      resizeMode="contain"
                      style={styles().wh100}
                    />
                  </View>
                  <View>
                    <Text
                      style={[
                        styles().fs16,
                        styles().lh18,
                        styles().fw600,
                        {
                          color:
                            index === 5
                              ? currentTheme.BCBCBC
                              : currentTheme.black,
                        },
                      ]}
                    >
                      {item.SingleListName}
                    </Text>
                    {index === 5 && (
                      <Text
                        style={[
                          styles().fs9,
                          styles().fw400,
                          { color: currentTheme.BCBCBC },
                        ]}
                      >
                        *Features Coming Soon
                      </Text>
                    )}
                  </View>
                </View>
                {index === 0 && (
                  <View
                    style={[
                      styles().w60px,
                      styles().alignCenter,
                      styles().justifyCenter,
                      styles().br30,
                      styles().h25px,
                      {
                        alignContent: "flex-end",
                        backgroundColor: currentTheme.themeBackground,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles().fs10,
                        styles().fontSemibold,
                        { color: currentTheme.black },
                      ]}
                    >
                      View
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </Layout>
  );
}
