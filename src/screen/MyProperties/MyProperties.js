import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import styles from "../styles";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { properties } from "../../apollo/server";
import { theme } from "../../context/ThemeContext/ThemeColor";
import UserContext from "../../context/User/User";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
const { width, height } = Dimensions.get("window");
export default function MyProperties(props) {
  const PROPERTIES = gql`
    ${properties}
  `;
  const user = useContext(UserContext);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const { loading, error, data, refetch } = useQuery(PROPERTIES, {
    fetchPolicy: "cache-and-network",
    onCompleted: ({ properties }) => {
      console.log("properties res >>>>>>>>>>>>>>>>>", properties.results);
    },
    onError: (err) => {
      console.log("error in properties :", err);
    },
  });
  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"My Properties"}
      loading={loading}
      style={[styles().ph0]}
    >
      <View style={[styles().flex, { paddingLeft: width * 0.06 }]}>
        <View style={[styles().mb20, styles().mt5]}>
          <FlatList
            numColumns={2}
            data={data?.properties?.results}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={index}
                  onPress={() =>
                    props.navigation.navigate("SinglePropertyListing", {
                      singleList: item,
                    })
                  }
                  style={[
                    styles().justifyCenter,
                    {
                      width: width * 0.43,
                      marginBottom: 10,
                      marginRight: 15,
                      // borderWidth: 0.5,
                      // borderColor: currentTheme.textColor,
                      borderRadius: 10,
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
                    ]}
                  >
                    {item?.images?.length !== 0 ? (
                      <Image
                        source={{
                          uri: item?.images[0],
                        }}
                        // source={{ uri: item.images[0] }}
                        resizeMode="cover"
                        style={[styles().wh100, styles().br10]}
                      />
                    ) : (
                      <View
                        style={[
                          styles().wh100,
                          styles().br10,
                          {
                            backgroundColor: currentTheme.white,
                            borderWidth: 0.5,
                            borderColor: currentTheme.themeBackground,
                            alignItems: "center",
                            justifyContent: "center",
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                          },
                        ]}
                      >
                        <Ionicons
                          name="image"
                          size={50}
                          color={currentTheme.BCBCBC}
                        />
                        <Text
                          style={{
                            color: currentTheme.BCBCBC,
                            fontWeight: "bold",
                            fontSize: 12,
                          }}
                        >
                          No Image
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles().fs14,
                      styles().fontSemibold,
                      { color: currentTheme.black },
                    ]}
                  >
                    {item.name?.toUpperCase()}
                  </Text>
                  <View
                    style={[
                      styles().flexRow,
                      styles().alignCenter,
                      styles().justifyStart,
                      styles().flex,
                      styles().flexWrap,
                    ]}
                  >
                    <FontAwesome
                      name="map-marker"
                      size={16}
                      color={currentTheme.themeBackground}
                      style={styles().mr5}
                    />
                    <Text
                      numberOfLines={1}
                      style={[
                        styles().fs10,
                        styles().fontRegular,
                        { color: currentTheme.textColor },
                      ]}
                    >
                      {item.address ? item.address : "No Address"}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </Layout>
  );
}
