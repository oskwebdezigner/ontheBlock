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
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import UserContext from "../../context/User/User";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { properties, upcommingTasksList } from "../../apollo/server";
import Loader from "../../Component/Loader/Loader";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const UPCOMING_TASK_LIST = gql`
  ${upcommingTasksList}
`;
export default function UpcomminMaintenance(props) {
  const themeContext = useContext(ThemeContext);
  const user = useContext(UserContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const isFocused = useIsFocused();
  const {
    loading: upcomingLoading,
    error: upcomingError,
    data: upcomingData,
    refetch: upcomingRefetch,
  } = useQuery(UPCOMING_TASK_LIST, {
    variables: {
      options: {
        limit: 1000,
      },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ upcommingTasksList }) => {
      // console.log(
      //   "upcommingTasksList res ================>",
      //   upcommingTasksList.results
      // );
    },
    onError: (err) => {
      console.log("error in upcommingTasksList :", err);
    },
  });

  useEffect(() => {
    upcomingRefetch();
    console.log("refetched!");
  }, [isFocused]);

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"Upcomming Maintenance"}
      loading={upcomingLoading}
      style={[styles().ph0]}
    >
      <View style={[styles().flex, { paddingLeft: width * 0.06 }]}>
        <FlatList
          data={upcomingData?.upcommingTasksList?.results}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={{ paddingHorizontal: 3 }}>
                <View
                  style={[
                    styles().justifyBetween,
                    styles().flexRow,
                    styles().boxpeshadow,
                    styles().br10,
                    styles().ph15,
                    styles().pv15,
                    styles().mb20,
                    index === 0 ? styles().mt5 : null,
                    { width: width * 0.88 },
                  ]}
                >
                  <View
                    style={[
                      styles().w100px,
                      styles().h110px,
                      styles().br10,
                      styles().overflowH,
                    ]}
                  >
                    {item?.property?.images?.length !== 0 ? (
                      <Image
                        source={{
                          uri: item?.property?.images
                            ? item?.property?.images[0]
                            : "",
                        }}
                        resizeMode="cover"
                        style={styles().wh100}
                      />
                    ) : (
                      <View
                        style={[
                          styles().wh100,
                          {
                            alignItems: "center",
                            justifyContent: "center",
                            borderWidth: 0.5,
                            borderColor: currentTheme.themeBackground,
                            borderRadius: 10,
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
                            fontSize: 10,
                          }}
                        >
                          No Image
                        </Text>
                      </View>
                    )}
                  </View>
                  <View
                    style={[
                      styles().flex,
                      styles().justifyBetween,
                      styles().ml10,
                    ]}
                  >
                    <View
                      style={[
                        styles().flexRow,
                        styles().alignCenter,
                        styles().justifyStart,
                      ]}
                    >
                      <Text
                        style={[
                          styles().fs14,
                          styles().fontSemibold,
                          { color: currentTheme.black },
                        ]}
                      >
                        {item?.property?.use?.name?.toUpperCase()}
                        {/* {item?.property?.name?.toUpperCase()} */}
                      </Text>
                      {/* <Text>
                        {item.property.is_completed
                          ? "Complete"
                          : "Not Complete"}
                      </Text> */}
                    </View>
                    <View
                      style={[
                        styles().flexRow,
                        styles().alignCenter,
                        styles().justifyStart,
                      ]}
                    >
                      <View style={styles().mtminus5}>
                        <Entypo
                          name="home"
                          size={10}
                          color={currentTheme.textColor}
                          style={styles().mr5}
                        />
                      </View>
                      <Text
                        style={[
                          styles().fs10,
                          styles().fontRegular,
                          { color: currentTheme.textColor },
                        ]}
                      >
                        {item?.property?.address
                          ? item?.property?.address
                          : "No Address"}
                      </Text>
                    </View>
                    <View style={[styles().flexRow, styles().alignCenter]}>
                      <View style={styles().mtminus5}>
                        <Entypo
                          name="calendar"
                          size={10}
                          color={currentTheme.textColor}
                          style={styles().mr5}
                        />
                      </View>
                      <Text
                        style={[
                          styles().fs10,
                          styles().fontRegular,
                          { color: currentTheme.textColor },
                        ]}
                      >
                        {item.schedule_date
                          ? moment(item.schedule_date).format("LLL")
                          : "No Schedule Date"}
                      </Text>
                    </View>
                    <ThemeButton
                      onPress={() =>
                        props.navigation.navigate("MaintenanceDetail", {
                          maintenance: item,
                        })
                      }
                      Title={"View Details"}
                      Style={[styles().h40px, styles().mt10, styles().w80]}
                      StyleText={styles().fs12}
                    />
                  </View>
                  {/* <TouchableOpacity
                    style={[
                      styles().wh20px,
                      styles().alignCenter,
                      styles().justifyCenter,
                      styles().br5,
                      { backgroundColor: currentTheme.themeSecondary },
                    ]}
                  >
                    <FontAwesome5
                      name="ellipsis-h"
                      size={12}
                      color={currentTheme.black}
                    />
                  </TouchableOpacity> */}
                </View>
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Text style={{ color: currentTheme.textColor, fontSize: 14 }}>
                  No Upcoming Tasks
                </Text>
              </View>
            );
          }}
        />
      </View>
    </Layout>
  );
}
