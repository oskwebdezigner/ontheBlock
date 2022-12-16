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
import moment from "moment";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { deleteTask } from "../../apollo/server";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";

const { width, height } = Dimensions.get("window");

export default function MaintenaceDetail(props) {
  const DELETE_TASK = gql`
    ${deleteTask}
  `;
  const item = props.route.params.maintenance;
  // console.log("task >>>>>>", item);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const popItems = [
    {
      id: 0,
      name: "Mark as Completed",
      onPress: () => SetmodalVisible(!modalVisible),
    },
    {
      id: 1,
      name: "Rechedule Task",
      onPress: () => props.navigation.navigate("ScheduleEdit", { task: item }),
    },
    {
      id: 2,
      name: "Task Does Not Apply To My Home",
    },
    {
      id: 3,
      name: "Delete",
      onPress: () => DeleteTask(),
    },
  ];

  const [modalVisible, SetmodalVisible] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [popmenu, Setpopmenu] = useState(false);

  const [mutate, { client }] = useMutation(DELETE_TASK, {
    onCompleted,
    onError,
  });

  async function onCompleted(data) {
    try {
      FlashMessage({ msg: "Task Deleted!", type: "success" });
      console.log("deleteTask res :", data.deleteTask);
      props.navigation.navigate("Home");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function onError(error) {
    FlashMessage({ msg: error?.message?.toString(), type: "danger" });
    setLoading(false);
    console.log("deleteTask error  :", error);
  }

  async function DeleteTask() {
    setLoading(true);
    console.log(item._id);
    await mutate({
      variables: {
        deleteTaskInput: { id: item?._id },
      },
    });
  }

  function MarkCompletedModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={[styles().flex, styles().alignCenter, styles().justifyCenter]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => SetmodalVisible(!modalVisible)}
            style={[
              styles().posAbs,
              styles().top0,
              styles().bottom0,
              styles().left0,
              styles().right0,
              { backgroundColor: currentTheme.modalShadow },
            ]}
          />
          <View style={[styles().alignCenter, styles().justifyCenter]}>
            <View
              style={[
                styles().bgWhite,
                styles().pt15,
                styles().alignCenter,
                styles().justifyCenter,
                styles().br10,
                styles().pb25,
                styles().ph15,
                { width: width * 0.8 },
              ]}
            >
              <View style={[styles().wh150px, styles().mb15]}>
                <Image
                  source={require("../../assets/images/completed-modal-img.png")}
                  style={styles().wh100}
                  resizeMode="contain"
                />
              </View>
              <Text
                style={[
                  styles().fs18,
                  styles().fontSemibold,
                  styles().textCenter,
                  { color: currentTheme.black },
                ]}
              >
                The Floor Maintenance has been completed
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      loading={Loading}
      pagetitle={item?.property?.name?.toUpperCase()}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => Setpopmenu(false)}
        style={[styles().flex, styles().pt30, styles().pb20]}
      >
        <View
          style={[
            styles().h200px,
            styles().w100,
            styles().br10,
            styles().overflowH,
          ]}
        >
          {item?.property?.images?.length !== 0 ? (
            <Image
              source={{ uri: item?.property?.images[0] }}
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
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: currentTheme.themeBackground,
                },
              ]}
            >
              <Ionicons name="image" size={80} color={currentTheme.BCBCBC} />
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

        <View
          style={[
            styles().flexRow,
            styles().zIndex2,
            styles().mb5,
            styles().justifyBetween,
            styles().mt20,
          ]}
        >
          <View style={[styles().flex]}>
            <Text
              style={[
                styles().fs16,
                styles().fontSemibold,
                { color: currentTheme.black },
              ]}
            >
              {item?.property?.name?.toUpperCase()}
            </Text>
            <View
              style={[
                styles().flexRow,
                styles().alignCenter,
                { marginTop: 10 },
              ]}
            >
              <View
                style={[styles().flexRow, styles().mr20, styles().alignCenter]}
              >
                <View style={styles().mtminus5}>
                  <Entypo
                    name="home"
                    size={12}
                    color={currentTheme.textColor}
                    style={styles().mr5}
                  />
                </View>
                <Text
                  style={[
                    styles().fs12,
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
                    size={12}
                    color={currentTheme.textColor}
                    style={styles().mr5}
                  />
                </View>
                <Text
                  style={[
                    styles().fs12,
                    styles().fontRegular,
                    { color: currentTheme.textColor },
                  ]}
                >
                  {item?.schedule_date
                    ? moment(item?.schedule_date).format("LLL")
                    : "No Schedule Date"}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles().flexRow, styles().justifyBetween]}>
            <View style={[styles().mr10, styles().wh25px, styles().overflowH]}>
              <Feather
                name="bell-off"
                size={20}
                color={currentTheme.SliderDots}
              />
            </View>
            <TouchableOpacity
              onPress={() => Setpopmenu(!popmenu)}
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
            </TouchableOpacity>
            {popmenu ? (
              <View
                style={[
                  styles().boxpeshadow,
                  styles().right0,
                  styles().posAbs,
                  styles().alignCenter,
                  styles().justifyCenter,
                  styles().w200px,
                  styles().br10,
                  styles().top25,
                ]}
              >
                {popItems.map((pops, i) => {
                  return (
                    <TouchableOpacity
                      onPress={pops.onPress}
                      key={i}
                      style={[
                        styles().w100,
                        styles().alignCenter,
                        styles().pv15,
                        {
                          borderTopWidth: i === 0 ? 0 : 1,
                          borderTopColor: currentTheme.cEFEFEF,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles().fs10,
                          styles().fontRegular,
                          { color: currentTheme.textColor },
                        ]}
                      >
                        {pops.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles().zIndex1}>
          <Text
            style={[
              styles().fs14,
              styles().fontRegular,
              styles().fw400,
              { color: currentTheme.textColor },
            ]}
          >
            {item?.description}
          </Text>
        </View>
      </TouchableOpacity>

      <MarkCompletedModal />
    </Layout>
  );
}
