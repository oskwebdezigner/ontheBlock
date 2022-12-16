import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from "react-native";
import styles from "../styles";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { files } from "../../apollo/server";
import { theme } from "../../context/ThemeContext/ThemeColor";
import UserContext from "../../context/User/User";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
const { width, height } = Dimensions.get("window");
export default function MyDocuments(props) {
  const FILES = gql`
    ${files}
  `;
  const user = useContext(UserContext);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const { loading, error, data, refetch } = useQuery(FILES, {
    fetchPolicy: "cache-and-network",
    variables: {
      options: {
        limit: 1000,
      },
    },
    onCompleted: ({ files }) => {
      console.log("files res >>>>>>>>>>>>>>>>>", files.results);
    },
    onError: (err) => {
      console.log("error in files :", err);
    },
  });
  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"My Documents"}
      loading={loading}
      style={[styles().ph0]}
    >
      <View style={[styles().flex, { paddingLeft: width * 0.06 }]}>
        <View style={[styles().mb20, styles().mt5]}>
          <FlatList
            data={data?.files?.results}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  // onPress={() =>
                  //   props.navigation.navigate("SinglePropertyListing", {
                  //     singleList: item,
                  //   })
                  // }

                  onPress={() => {
                    Linking.openURL(item.path).catch((err) =>
                      console.error("Error in linking", err)
                    );
                  }}
                  style={[
                    styles().justifyCenter,
                    {
                      width: width * 0.43,
                      marginBottom: 10,
                      marginRight: 15,
                      borderRadius: 10,
                      // borderWidth: 0.5,
                      // borderColor: currentTheme.textColor,
                      // padding: 10,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles().h150px,
                      styles().br10,
                      styles().overflowH,
                      styles().justifyCenter,
                      styles().mb10,
                      styles().alignCenter,
                      ,
                      { backgroundColor: currentTheme.bodyBg },
                    ]}
                  >
                    {item.mimetype === "png" ||
                    item.mimetype === "image/png" ||
                    item.mimetype === "image/jpeg" ? (
                      <Image
                        source={{
                          uri: item?.path,
                        }}
                        // source={{ uri: item.images[0] }}
                        resizeMode="contain"
                        style={[styles().wh100, styles().br10]}
                      />
                    ) : (
                      <Ionicons
                        name="document-attach"
                        color={currentTheme.themeBackground}
                        size={50}
                      />
                    )}
                  </View>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles().fs12,
                      // styles().fontSemibold,
                      { color: currentTheme.black },
                    ]}
                  >
                    {item.name?.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
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
      </View>
    </Layout>
  );
}
