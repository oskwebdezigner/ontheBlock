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

const { width, height } = Dimensions.get("window");
export default function ScheduleEdit(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [PersonName, setPersonName] = useState("");
  const [PersonNameError, setPersonNameError] = useState(false);

  const [PersonPhone, setPersonPhone] = useState("");
  const [PersonPhoneError, setPersonPhoneError] = useState(false);

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
  const [MaintenanceDesc, setMaintenanceDesc] = useState("");
  const [MaintenanceDescError, setMaintenanceDescError] = useState(false);

  const [AssignTask, setAssignTask] = useState("");
  const [NotificationCheck, setNotificationCheck] = useState("");

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
                initialDate={"2012-03-01"}
                minDate={"2012-05-10"}
                maxDate={"2022-05-30"}
                onDayPress={(day) => {
                  console.log("selected day", day);
                }}
                onDayLongPress={(day) => {
                  console.log("selected day", day);
                }}
                theme={{
                  arrowColor: currentTheme.c333333,
                  selectedDayTextColor: "#ffffff",
                  selectedDayBackgroundColor: currentTheme.themeBackground,
                }}
                monthFormat={"MMM yyyy"}
                onMonthChange={(month) => {
                  console.log("month changed", month);
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
                What type of maintenance
              </Text>
              <Multiselect
                ListItems={MainTenanceList}
                SelectText={"Floor"}
                value={MaintenanceType}
                setValue={setMaintenanceType}
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

            <View style={styles().mt15}>
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
            </View>

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
                  Turn on the notification{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles().mt35, styles().mb20]}>
            <ThemeButton Title={"Save"} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}
