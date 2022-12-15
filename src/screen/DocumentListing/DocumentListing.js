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
  MaterialIcons,
} from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { folders } from "../../apollo/server";

const { width, height } = Dimensions.get("window");

export default function DocumentListing(props) {
  const FOLDERS = gql`
    ${folders}
  `;

  const property = props.route.params.property;
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const { loading, error, data, refetch } = useQuery(FOLDERS, {
    fetchPolicy: "cache-and-network",
    variables: {
      filters: {
        property: property?._id,
      },
    },
    onCompleted: ({ folders }) => {
      //   console.log("folders res :", folders.results);
    },
    onError: (err) => {
      console.log("error in folders :", err);
    },
  });
  // console.log("folders =====>", data?.folders?.results);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={property?.name?.toUpperCase()}
      style={[styles().ph0]}
    >
      <View style={[styles().flex, { marginHorizontal: width * 0.04 }]}>
        <FlatList
          data={data?.folders?.results}
          bounces={false}
          numColumns={2}
          ListHeaderComponent={<View style={styles().pt30} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                key={index}
                onPress={() =>
                  props.navigation.navigate("DocumentEdit", { docs: item })
                }
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
                    <FontAwesome
                      name="folder-open"
                      size={65}
                      color={currentTheme.themeBackground}
                    />
                    {/* <Image
                      source={item.DocumentImg}
                      resizeMode="cover"
                      style={[styles().wh100]}
                    /> */}
                    <TouchableOpacity
                      style={[
                        styles().top10,
                        styles().alignCenter,
                        styles().justifyCenter,
                        styles().wh20px,
                        styles().br5,
                        styles().right10,
                        styles().posAbs,
                        styles().bgWhite,
                        { right: 0 },
                      ]}
                    >
                      <MaterialIcons
                        name="edit"
                        size={16}
                        color={currentTheme.SliderDots}
                      />
                    </TouchableOpacity>
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
            props.navigation.navigate("AddNewFolder", { property: property });
          }}
          Title={"Add New Folder"}
        />
      </View>
    </Layout>
  );
}
