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
import { inventories } from "../../apollo/server";
import { theme } from "../../context/ThemeContext/ThemeColor";
import UserContext from "../../context/User/User";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import ImageView from "react-native-image-viewing";
const { width, height } = Dimensions.get("window");
export default function MyStuff(props) {
  const INVENTORIES = gql`
    ${inventories}
  `;
  const user = useContext(UserContext);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  // console.log(user._id)
  const { loading, error, data, refetch } = useQuery(INVENTORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      filters: {
        added_by: user?._id,
      },
    },
    onCompleted: ({ inventories }) => {
      console.log("inventories res >>>>>>>>>>>>>>>>>", inventories.results);
    },
    onError: (err) => {
      console.log("error in inventories :", err);
    },
  });

  const [visible, setIsVisible] = useState(false);

  const [imageLists, setImageLists] = useState([]);
  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"My Stuff"}
      loading={loading}
      style={[styles().ph0]}
    >
      <ImageView
        images={imageLists}
        imageIndex={0}
        presentationStyle={"fullScreen"}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />

      <View style={[styles().flex, { paddingLeft: width * 0.06 }]}>
        <View style={[styles().mb20, styles().mt5]}>
          <FlatList
            data={data?.inventories?.results}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item, index }) => {
              console.log("item", item);
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (item.images.length !== 0) {
                      let babuji = [];
                      item.images.map((d) => babuji.push({ uri: d }));

                      setImageLists(babuji);

                      setIsVisible(true);
                    }
                  }}
                  // onPress={() =>
                  //   props.navigation.navigate("SinglePropertyListing", {
                  //     singleList: item,
                  //   })
                  // }
                  activeOpacity={1}
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
                        resizeMode="contain"
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
                  {/* <View
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
                      {item?.type ? item.type?.name : "No Type Selected"}
                    </Text>
                  </View> */}
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
                    No Stuffs
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
