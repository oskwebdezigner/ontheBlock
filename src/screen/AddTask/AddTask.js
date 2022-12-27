import React, { useContext, useState, useCallback } from "react";
import {
  Platform,
  Dimensions,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Layout from "../../Component/Layout/Layout";
import TextField from "../../Component/FloatTextField/FloatTextField";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import { FontAwesome } from "@expo/vector-icons";

import Spinner from "../../Component/Spinner/Spinner";
import Multiselect from "../../Component/Multiselect/Multiselect";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { addTask, handymen, inventories } from "../../apollo/server";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import UserContext from "../../context/User/User";
import moment from "moment";

const { width, height } = Dimensions.get("window");

export default function AddTask(props) {
  let task = props?.route?.params?.property;
  const user = useContext(UserContext);
  const HANDYMEN = gql`
    ${handymen}
  `;
  const ADD_TASK = gql`
    ${addTask}
  `;
  const INVENTORIES = gql`
    ${inventories}
  `;
  console.log("schedule task ====>", task);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [invenetory, setInvenetory] = useState("");
  const [Loading, setLoading] = useState(false);
  const [schedule_dates, setSchedule_dates] = useState({
    selectedDate: "",
    markedDates: {},
  });

  const {
    loading: inventoryLoading,
    error: inventoryError,
    data: inventoryData,
    refetch: inventoryRefetch,
  } = useQuery(
    INVENTORIES,

    {
      fetchPolicy: "cache-and-network",
      onCompleted: ({ inventories }) => {
        // console.log("inventories res :", inventories);
      },
      onError: (err) => {
        console.log("error in inventories :", err);
      },
    }
  );

  const { loading, error, data, refetch } = useQuery(HANDYMEN, {
    fetchPolicy: "cache-and-network",
    variables: {
      filters: {
        property: task?._id,
      },
      options: {
        limit: 1000,
      },
    },
    onCompleted: ({ handymen }) => {
      // console.log("handymen res :", handymen.results);
    },
    onError: (err) => {
      console.log("error in handymen :", err);
      FlashMessage({ msg: err?.message?.toString(), type: "danger" });
    },
  });

  const [mutate, { client }] = useMutation(ADD_TASK, {
    onCompleted,
    onError,
  });

  async function onCompleted(data) {
    try {
      FlashMessage({ msg: "Task Added!", type: "success" });
      props.navigation.navigate("Home");
      // props.navigation.navigate("SinglePropertyListing");
      console.log("addTask res :", data.addTask);
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
    console.log("addTask error :", error);
  }
  const [handyman, setHandyman] = useState("");
  const [MaintenanceDesc, setMaintenanceDesc] = useState("");
  const [MaintenanceDescError, setMaintenanceDescError] = useState(false);

  const [AssignTask, setAssignTask] = useState("No");
  const [NotificationCheck, setNotificationCheck] = useState(false);
  let person = data?.handymen?.results?.find((item) => {
    return item._id === handyman;
  });
  const getSelectedDayEvents = (date) => {
    let markedDates = {};
    markedDates[date] = {
      customStyles: {
        container: {
          backgroundColor: currentTheme.themeBackground,
        },
        text: {
          color: currentTheme.white,
          fontWeight: "bold",
        },
      },
    };
    let serviceDate = moment(date);
    // serviceDate = serviceDate.format("DD.MM.YYYY");
    serviceDate = serviceDate.format();

    setSchedule_dates({
      ...schedule_dates,
      selectedDate: serviceDate,
      markedDates: markedDates,
    });
  };

  async function Addtask() {
    let status = true;
    // if (handyman === "") {
    //   FlashMessage({ msg: "Select Handmen!", type: "warning" });
    //   status = false;
    //   return;
    // }
    if (MaintenanceDesc === "") {
      FlashMessage({ msg: "Enter Task Description!", type: "warning" });
      status = false;
      return;
    }
    if (schedule_dates.selectedDate === "") {
      FlashMessage({ msg: "Select Task Date!", type: "warning" });
      status = false;
      return;
    }
    if (status) {
      console.log("isInventory:", invenetory);
      setLoading(true);
      let data = {
        inputTask: {
          added_by: user._id,
          assign_to: handyman,
          description: MaintenanceDesc,
          get_notifications: NotificationCheck,
          inventory: invenetory,
          property: task._id,
          schedule_date: schedule_dates.selectedDate,
        },
      };
      let todo = {
        inputTask: {
          added_by: user._id,
          assign_to: handyman,
          description: MaintenanceDesc,
          get_notifications: NotificationCheck,
          property: task._id,
          schedule_date: schedule_dates.selectedDate,
        },
      };
      console.log("add data :", data);
      await mutate({
        variables: invenetory ? data : todo,
      });
    }
  }
  // let invData = [
  //   ...inventoryData?.inventories?.results,
  //   { name: "Todo", _id: "" },
  // ];

  let todo = [{ name: "Todo", _id: "" }];
  let inv = inventoryData?.inventories?.results?.concat(todo)?.find((item) => {
    return item._id === invenetory;
  });
  // console.log(invData);
  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"Add Task"}
    >
      <KeyboardAvoidingView
        style={styles().flex}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={70}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles().flex, styles().mt30, styles().pall5]}>
            <View
              style={[styles().boxpeshadow, styles().pall10, styles().br10]}
            >
              <Calendar
                markingType="custom"
                onDayPress={(day) => {
                  getSelectedDayEvents(day.dateString);
                }}
                markedDates={schedule_dates.markedDates}
                theme={{
                  // textSectionTitleDisabledColor: "red",
                  arrowColor: currentTheme.c333333,
                  selectedDayTextColor: "#000",
                  selectedDayBackgroundColor: currentTheme.white,
                }}
                firstDay={1}
                onPressArrowLeft={(subtractMonth) => subtractMonth()}
                onPressArrowRight={(addMonth) => addMonth()}
                disableAllTouchEventsForDisabledDays={false}
                enableSwipeMonths={true}
              />
            </View>

            {/* <View
              style={[
                styles().mt30,
                styles().h60px,
                styles().br10,
                styles().bw1,
                { borderColor: currentTheme.cEFEFEF },
              ]}
            >
              <Text
                style={[
                  styles().ml15,
                  styles().mt5,
                  styles().fs12,
                  styles().fw400,
                  { color: currentTheme.textColor },
                ]}
              >
                What type of maintenance
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  marginHorizontal: 15,
                  marginTop: 5,
                }}
              >
                {task?.inventory?.name}
              </Text>
            </View> */}
            <View
              style={[
                styles().mt30,
                styles().h60px,
                styles().br10,
                styles().bw1,
                { borderColor: currentTheme.cEFEFEF },
              ]}
            >
              <Text
                style={[
                  styles().ml15,
                  styles().mt5,
                  styles().fs12,
                  styles().fw400,
                  { color: currentTheme.textColor },
                ]}
              >
                {/* What type of maintenance */}
                Maintenance Item
              </Text>
              <Multiselect
                ListItems={inventoryData?.inventories?.results.concat(todo)}
                // ListItems={[
                //   ...inventoryData?.inventories?.results,
                //   { name: "Todo", _id: "" },
                // ]}
                SelectText={inv?.name}
                value={invenetory}
                setValue={(e) => setInvenetory(e[0])}
              />
            </View>

            <View style={styles().mt15}>
              <TextField
                keyboardType="default"
                onChangeText={(e) => {
                  setMaintenanceDescError(false);
                  setMaintenanceDesc(e);
                }}
                value={MaintenanceDesc}
                label="Description"
                errorText={MaintenanceDescError}
                autoCapitalize="none"
                style
                stylesInput={styles().h100px}
              />
            </View>

            <View style={styles().mt30}>
              <Text
                style={[
                  styles().fs14,
                  styles().fw400,
                  { color: currentTheme.SliderDots },
                ]}
              >
                Would you like to assign this task to someone else? (Optional){" "}
              </Text>
              <View
                style={[styles().flexRow, styles().alignCenter, styles().mt10]}
              >
                <TouchableOpacity
                  onPress={() => setAssignTask("Yes")}
                  style={[
                    styles().flexRow,
                    styles().justifyBetween,
                    styles().alignCenter,
                    styles().mr20,
                  ]}
                >
                  <View
                    style={[
                      styles().wh20px,
                      styles().alignCenter,
                      styles().justifyCenter,
                      styles().br5,
                      styles().mr5,
                      { backgroundColor: currentTheme.textColor },
                    ]}
                  >
                    {AssignTask === "Yes" ? (
                      <FontAwesome
                        name="check"
                        size={14}
                        color={currentTheme.white}
                      />
                    ) : null}
                  </View>
                  <Text
                    style={[
                      styles().fs14,
                      styles().fw400,
                      { color: currentTheme.black },
                    ]}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setAssignTask("No")}
                  style={[
                    styles().flexRow,
                    styles().justifyBetween,
                    styles().alignCenter,
                    styles().mr20,
                  ]}
                >
                  <View
                    style={[
                      styles().wh20px,
                      styles().alignCenter,
                      styles().justifyCenter,
                      styles().br5,
                      styles().mr5,
                      { backgroundColor: currentTheme.textColor },
                    ]}
                  >
                    {AssignTask === "No" ? (
                      <FontAwesome
                        name="check"
                        size={14}
                        color={currentTheme.white}
                      />
                    ) : null}
                  </View>
                  <Text
                    style={[
                      styles().fs14,
                      styles().fw400,
                      { color: currentTheme.black },
                    ]}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* {AssignTask === "Yes" ? ( */}
            <View
              style={[
                styles().mt30,
                styles().h60px,
                styles().br10,
                styles().bw1,
                { borderColor: currentTheme.cEFEFEF },
              ]}
            >
              <Text
                style={[
                  styles().ml15,
                  styles().mt5,
                  styles().fs12,
                  styles().fw400,
                  { color: currentTheme.textColor },
                ]}
              >
                Handymen's
              </Text>
              <Multiselect
                ListItems={data?.handymen?.results}
                SelectText={person?.name}
                value={handyman}
                setValue={(e) => setHandyman(e[0])}
              />
            </View>
            {/* ) : null} */}
            {/* <View style={styles().mt15}>
              <TextField
                keyboardType="default"
                onChangeText={(e) => {
                  setPersonNameError(false);
                  setPersonName(e);
                }}
                value={PersonName}
                label="Person Name"
                errorText={PersonNameError}
                autoCapitalize="none"
                style
              />
            </View>

            <View style={styles().mt15}>
              <TextField
                keyboardType="default"
                onChangeText={(e) => {
                  setPersonPhoneError(false);
                  setPersonPhone(e);
                }}
                value={PersonPhone}
                label="Person Phone Number"
                errorText={PersonPhoneError}
                autoCapitalize="none"
                style
              />
            </View> */}

            <View style={styles().mt15}>
              <TouchableOpacity
                onPress={() => setNotificationCheck(!NotificationCheck)}
                style={[styles().flexRow, styles().alignCenter, styles().mr20]}
              >
                <View
                  style={[
                    styles().wh20px,
                    styles().alignCenter,
                    styles().justifyCenter,
                    styles().br5,
                    styles().mr5,
                    { backgroundColor: currentTheme.textColor },
                  ]}
                >
                  {NotificationCheck ? (
                    <FontAwesome
                      name="check"
                      size={14}
                      color={currentTheme.white}
                    />
                  ) : null}
                </View>
                <Text
                  style={[
                    styles().fs14,
                    styles().fw400,
                    { color: currentTheme.black },
                  ]}
                >
                  Turn on the notification
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles().mt35, styles().mb20]}>
            {Loading ? (
              <Spinner />
            ) : (
              <ThemeButton onPress={() => Addtask()} Title={"Save"} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}
