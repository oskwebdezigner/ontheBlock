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
  Linking,
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
  MaterialIcons,
} from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { folders } from "../../apollo/server";
import { useIsFocused } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function DocumentListing(props) {
  const docs = props?.route?.params?.docs;
  const property = props?.route?.params?.property;
  //   console.log("docs========>", docs);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"Documents"}
      style={[styles().ph0]}
    >
      <View style={[styles().flex, { marginHorizontal: width * 0.04 }]}>
        <FlatList
          data={docs?.files}
          bounces={false}
          numColumns={2}
          ListHeaderComponent={<View style={styles().pt30} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            console.log(item.path)
            function get_url_extension(url) {
              return url
                .split(/[#?]/)[0]
                .split(".")
                .pop()
                .trim();
            }

            let docType = get_url_extension(item.path);
            console.log("===>", docType);
            let icon =
              docType === "pdf" ? (
                <FontAwesome5
                  name="file-pdf"
                  size={45}
                  color={currentTheme.themeBackground}
                />
              ) : docType === "docx" || docType === "doc" ? (
                <FontAwesome
                  name="file-word-o"
                  size={45}
                  color={currentTheme.themeBackground}
                />
              ) : docType === "png" ||
                docType === "jpeg" ||
                docType === "jpg" ||
                docType === "gif" ? (
                // <FontAwesome
                //   name="file-image-o"
                //   size={45}
                //   color={currentTheme.themeBackground}
                // />
                <Image source={{uri:item.path}} style={styles().wh100}/>
              ) : (
                <FontAwesome
                  name="file-text-o"
                  size={45}
                  color={currentTheme.themeBackground}
                />
              );
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                key={index}
                onPress={() => {
                  //   props.navigation.navigate("DocumentEdit", { docs: item });
                  Linking.openURL(item.path).catch((err) =>
                    console.error("Error in linking", err)
                  );
                }}
                style={[
                  styles().mb20,
                  {
                    padding: 5,
                    width: width * 0.44,
                    marginRight: index % 2 === 0 ? width * 0.04 : 0,
                  },
                ]}
              >
                <View
                  style={[
                    styles().w100,
                    styles().boxpeshadow,
                    styles().bgWhite,
                    styles().ph10,
                    styles().mb10,
                    styles().h130px,
                    styles().br5,
                  ]}
                >
                  <View
                    style={[
                      styles().wh100,
                      styles().overflowH,
                      styles().alignCenter,
                      styles().justifyCenter,
                    ]}
                  >
                    {icon}
                  </View>
                </View>
                <Text
                  numberOfLines={2}
                  style={[
                    styles().fs12,
                    styles().fw400,
                    { color: currentTheme.black, marginLeft: 5 },
                  ]}
                >
                  {item?.name?.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<View style={styles().mb100} />}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: currentTheme.textColor,
                    fontSize: 14,
                  }}
                >
                  No Documents
                </Text>
              </View>
            );
          }}
        />
      </View>
      <View
        style={[
          styles().left20,
          styles().right20,
          styles().posAbs,
          styles().bottom20,
        ]}
      >
        <ThemeButton
          onPress={() => {
            props.navigation.navigate("DocumentEdit", {
              docs: docs,
              property: property,
            });
          }}
          Title={"Add Document"}
        />
      </View>
    </Layout>
  );
}
