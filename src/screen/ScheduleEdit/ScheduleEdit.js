import React, { useContext, useState, useCallback, useEffect } from "react";
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
import {
  AntDesign,
  Ionicons,
  EvilIcons,
  FontAwesome,
} from "@expo/vector-icons";

import Spinner from "../../Component/Spinner/Spinner";
import Multiselect from "../../Component/Multiselect/Multiselect";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { handymen, updateTask } from "../../apollo/server";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import UserContext from "../../context/User/User";
import moment from "moment";

const { width, height } = Dimensions.get("window");

export default function ScheduleEdit(props) {
  let task = props?.route?.params?.task;
  const user = useContext(UserContext);
  const HANDYMEN = gql`
    ${handymen}
  `;
  const UPDATE_TASK = gql`
    ${updateTask}
  `;

  console.log("schedule task ====>", task);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [PersonName, setPersonName] = useState("");
  const [PersonNameError, setPersonNameError] = useState(false);

  const [PersonPhone, setPersonPhone] = useState("");
  const [PersonPhoneError, setPersonPhoneError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [schedule_dates, setSchedule_dates] = useState({
    selectedDate: "",
    markedDates: {},
  });
  const { loading, error, data, refetch } = useQuery(HANDYMEN, {
    fetchPolicy: "cache-and-network",
    onCompleted: ({ handymen }) => {
      // console.log("handymen res :", handymen.results);
    },
    onError: (err) => {
      console.log("error in handymen :", err);
      FlashMessage({ msg: err?.message?.toString(), type: "danger" });
    },
  });

  const [mutate, { client }] = useMutation(UPDATE_TASK, {
    onCompleted,
    onError,
  });

  async function onCompleted(data) {
    try {
      FlashMessage({ msg: "Task Updated!", type: "success" });
      console.log("updateTask res :", data.updateTask);
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
    console.log("updateTask error :", error);
  }

  const MainTenanceList = [
    {
      name: "Floor",
      _id: 0,
    },
    {
      name: "Roof",
      _id: 1,
    },
  ];
  const [MaintenanceType, setMaintenanceType] = useState("");

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

  async function UpdateTask() {
    let status = true;
    if (handyman === "") {
      FlashMessage({
        msg: "Select Your Handman to Assign Task",
        type: "warning",
      });
      status = false;
      return;
    }

    if (status) {
      setLoading(true);
      let data = {
        updateTaskId: task?._id,
        updateTaskInput: {
          description: MaintenanceDesc,
          get_notifications: NotificationCheck,
          inventory: task?.inventory?._id,
          property: task?.property?._id,
          schedule_date: schedule_dates.selectedDate,
          assign_to: handyman,
          added_by: user?._id,
        },
      };
      console.log("update data :", data);
      await mutate({
        variables: data,
      });
    }
  }

  useEffect(() => {
    setMaintenanceDesc(task?.description);
    setHandyman(task?.assign_to?._id);
    setNotificationCheck(task?.get_notifications);
    getSelectedDayEvents(task?.schedule_date);
  }, []);

  console.log("handman", handyman);
  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"Schedule Task"}
    >
      <KeyboardAvoidingView style={styles().flex}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles().flex, styles().mt30, styles().pall5]}>
            <View
              style={[styles().boxpeshadow, styles().pall10, styles().br10]}
            >
              <Calendar
                date={task?.schedule_date}
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
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  marginHorizontal: 15,
                  marginTop: 5,
                }}
              >
                {task?.inventory?.name ? task?.inventory?.name : "TODO"}
              </Text>
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
              <Multiselect
                ListItems={MainTenanceList}
                SelectText={"Floor"}
                value={MaintenanceType}
                setValue={setMaintenanceType}
              />
            </View> */}

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
              <ThemeButton onPress={() => UpdateTask()} Title={"Save"} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}
