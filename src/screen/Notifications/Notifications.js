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
  StyleSheet,
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
import { notifications, UpdateNotification } from "../../apollo/server";
import Loader from "../../Component/Loader/Loader";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function Notifications(props) {
  const NOTIFICATIONS = gql`
    ${notifications}
  `;
  const UPDATE_NOTIFICATION = gql`
    ${UpdateNotification}
  `;

  const themeContext = useContext(ThemeContext);
  const user = useContext(UserContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [Notifications, setNotifications] = useState({
    seen: [],
    unseen: [],
  });

  // const [Notifications, setNotifications] = useState([
  //   {
  //     type: "New",
  //     count: 2,
  //     notifications: [
  //       {
  //         image: require("../../assets/images/upcoming-maintenance-default-img.jpg"),
  //         title: "Floor Maintenance Remainder",
  //         address: "Astitue Home",
  //         date: "November 23,2022",
  //         duration: "35 min ago",
  //         detail:
  //           "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
  //       },
  //       {
  //         image: require("../../assets/images/upcoming-maintenance-default-img.jpg"),
  //         title: "Floor Maintenance Remainder",
  //         address: "Astitue Home",
  //         date: "November 23,2022",
  //         duration: "35 min ago",
  //         detail:
  //           "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
  //       },
  //     ],
  //   },
  //   {
  //     type: "Earlier",
  //     count: null,
  //     notifications: [
  //       {
  //         image: require("../../assets/images/upcoming-maintenance-default-img.jpg"),
  //         title: "Floor Maintenance Remainder",
  //         address: "Astitue Home",
  //         date: "November 23,2022",
  //         duration: "35 min ago",
  //         detail:
  //           "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
  //       },
  //       {
  //         image: require("../../assets/images/upcoming-maintenance-default-img.jpg"),
  //         title: "Floor Maintenance Remainder",
  //         address: "Astitue Home",
  //         date: "November 23,2022",
  //         duration: "35 min ago",
  //         detail:
  //           "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
  //       },
  //       {
  //         image: require("../../assets/images/upcoming-maintenance-default-img.jpg"),
  //         title: "Floor Maintenance Remainder",
  //         address: "Astitue Home",
  //         date: "November 23,2022",
  //         duration: "35 min ago",
  //         detail:
  //           "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
  //       },
  //     ],
  //   },
  // ]);

  const { loading, error, data, refetch } = useQuery(NOTIFICATIONS, {
    fetchPolicy: "cache-and-network",
    variables: {
      options: {
        // limit: null,
        // page: 1,
      },
    },
    onCompleted: ({ notifications }) => {
      console.log("notifications res =====>", notifications.results);
      let seenNoti = notifications?.results?.filter((item) => {
        return item.seen !== false;
      });

      let unseenNoti = notifications?.results?.filter((item) => {
        return item.seen === false;
      });
      setNotifications({
        ...Notifications,
        seen: seenNoti,
        unseen: unseenNoti,
      });
      // console.log("seen ===========", unseenNoti);
    },
    onError: (err) => {
      console.log("error in notifications :", err);
    },
  });

  const [mutate, { client }] = useMutation(UPDATE_NOTIFICATION, {
    onCompleted,
    onError,
  });
  async function onCompleted(data) {
    try {
      console.log("UPDATE_NOTIFICATION res :", data);
      refetch();
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  function onError(error) {
    console.log("UPDATE_NOTIFICATION error  :", error);
    // refetch();
  }

  const style = StyleSheet.create({
    type: { flexDirection: "row", alignItems: "center", marginTop: 10 },
    typeName: {
      marginRight: 5,
      fontSize: 14,
      fontWeight: "bold",
      color: currentTheme.black,
    },
    count: { fontWeight: "bold", fontSize: 10, color: currentTheme.black },
    numberofNotiConatainer: {
      borderRadius: 100,
      height: 20,
      width: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: currentTheme.themeBackground,
      padding: 3,
    },
    notiContainer: {
      marginTop: 10,
      borderRadius: 10,
      backgroundColor: currentTheme.bodyBg,
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginRight: 10,
      //   flex: 1,
    },
    img: {
      height: 50,
      width: 50,
      overflow: "hidden",
      borderRadius: 5,
    },
    notititle: {
      fontSize: 12,
      fontWeight: "bold",
      color: currentTheme.black,
      marginTop: 5,
    },
    notidetail: {
      flex: 1,
      marginTop: 10,
      fontSize: 10,
      color: currentTheme.textColor,
    },
    duration: {
      fontSize: 10,
      fontWeight: "bold",
      color: currentTheme.textColor,
    },
    addressAnddate: {
      fontSize: 8,
      color: currentTheme.textColor,
    },
    dateAndAddressContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      marginBottom: 10,
      overflow: "hidden",
      //   backgroundColor: "red",
    },
  });

  const NotificationComp = ({ noti, index }) => {
    // console.log(noti._id);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          let update = {
            updateNotificationId: noti._id,
            updateNotification: {
              seen: !noti.seen,
            },
          };
          console.log("updated: ", update);
          mutate({ variables: update });
        }}
        key={index}
        style={{
          ...style.notiContainer,
          borderWidth: noti.seen ? 0 : 0.5,
          borderColor: currentTheme.themeBackground,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={style.img}>
            {noti?.property?.images ? (
              <Image
                style={{ height: "100%", width: "100%" }}
                resizeMode={"cover"}
                source={{ uri: noti?.property?.images[0] }}
              />
            ) : (
              <View
                style={[
                  styles().wh100,
                  {
                    borderRadius: 5,
                    backgroundColor: currentTheme.white,
                    borderWidth: 0.5,
                    borderColor: currentTheme.BCBCBC,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Ionicons name="image" size={25} color={currentTheme.BCBCBC} />
                {/* <Text
                  style={{
                    color: currentTheme.BCBCBC,
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  No Image
                </Text> */}
              </View>
            )}
          </View>
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            <Text numberOfLines={1} style={style.notititle}>
              {noti.title}
            </Text>
            <View style={style.dateAndAddressContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  // flex: 1,
                  flex: 0.5,
                  // backgroundColor: "yellow",
                }}
              >
                <Entypo
                  name="home"
                  size={10}
                  color={currentTheme.textColor}
                  style={styles().mr5}
                />
                <Text numberOfLines={1} style={style.addressAnddate}>
                  {noti.property.address}
                </Text>
              </View>
              <View
                style={{
                  // marginLeft: 10,
                  // backgroundColor: "teal",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginRight: 10,
                  flex: 0.5,
                }}
              >
                <Entypo
                  name="calendar"
                  size={10}
                  color={currentTheme.textColor}
                  style={styles().mr5}
                />
                <Text numberOfLines={1} style={style.addressAnddate}>
                  {moment(noti.task.schedule_date).format("lll")}
                </Text>
              </View>
            </View>
          </View>
          <Text style={style.duration}>{moment(noti.createdAt).fromNow()}</Text>
        </View>
        <Text numberOfLines={3} style={style.notidetail}>
          {noti.notification ? noti.notification : "- - -"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"Notifications"}
      style={[styles().ph0]}
    >
      <View style={[styles().flex, { paddingLeft: width * 0.06 }]}>
        <View style={[styles().mb20, styles().mt5]}>
          {/* <FlatList
            data={Notifications}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    paddingHorizontal: 3,
                    flex: 1,
                    width: "97%",
                    // backgroundColor: "red",
                  }}
                >
                  <View style={style.type}>
                    <Text style={style.typeName}>{item.type}</Text>
                    {item.count ? (
                      <View style={style.numberofNotiConatainer}>
                        <Text style={style.count}>{item.count}</Text>
                      </View>
                    ) : null}
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
                    No Notifications
                  </Text>
                </View>
              );
            }}
          /> */}
          <FlatList
            data={Notifications.seen}
            // ListEmptyComponent={() => {
            //   return (
            //     <View
            //       style={{
            //         alignItems: "center",
            //         justifyContent: "center",
            //         marginTop: 20,
            //       }}
            //     >
            //       <Text style={{ color: currentTheme.textColor, fontSize: 14 }}>
            //         No Notifications
            //       </Text>
            //     </View>
            //   );
            // }}
            ListHeaderComponent={() => {
              return (
                <>
                  {Notifications?.unseen?.length !== 0 ? (
                    <View style={style.type}>
                      <Text style={style.typeName}>{"New"}</Text>
                      <View style={style.numberofNotiConatainer}>
                        <Text style={style.count}>
                          {Notifications?.unseen?.length}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                  <FlatList
                    data={Notifications.unseen}
                    renderItem={({ item, index }) => (
                      <NotificationComp noti={item} index={index} />
                    )}
                    // ListEmptyComponent={() => {
                    //   return (
                    //     <View
                    //       style={{
                    //         alignItems: "center",
                    //         justifyContent: "center",
                    //         marginTop: 20,
                    //       }}
                    //     >
                    //       <Text
                    //         style={{
                    //           color: currentTheme.textColor,
                    //           fontSize: 14,
                    //         }}
                    //       >
                    //         No New Notifications
                    //       </Text>
                    //     </View>
                    //   );
                    // }}
                  />
                </>
              );
            }}
            renderItem={({ item, index }) => {
              return (
                <>
                  <View style={style.type}>
                    <Text style={style.typeName}>{"Earlier"}</Text>
                  </View>
                  <NotificationComp noti={item} index={index} />
                </>
              );
            }}
          />
        </View>
      </View>
    </Layout>
  );
}
