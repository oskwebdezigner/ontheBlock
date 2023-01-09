import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity, View, Text, Modal, Platform } from "react-native";
import styles from "../../screen/styles";

function CustomCalendar(props) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    setShow(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setShow(false);
  };

  const NewformatDate = (date) => {
    if (date !== undefined) {
      return `${date
        .getFullYear()
        .toString()
        .padStart(4, "0")}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    } else {
      date = new Date();
      return `${date
        .getFullYear()
        .toString()
        .padStart(4, "0")}-$${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    }
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    let newDate = NewformatDate(date);
    props.onchange(newDate);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let newDate = NewformatDate(currentDate);
    console.log("currentDate", newDate);
    props.onchange(newDate);
  };

  return (
    <View style={[props.Viewstyle, styles().justifyCenter]}>
      <TouchableOpacity onPress={() => showDatePicker()}>
        <Text style={[styles().bgTextWhite, styles().fontRegular]}>
          {props.date}
        </Text>
      </TouchableOpacity>

      {Platform.OS === "ios" ? (
        <Modal
          transparent={true}
          visible={isDatePickerVisible}
          animationOutTiming={600}
          animationType="slide"
          onBackButtonPress={() =>
            setDatePickerVisibility(!isDatePickerVisible)
          }
          onBackdropPress={() => setDatePickerVisibility(!isDatePickerVisible)}
        >
          <TouchableOpacity
            onPress={() => setDatePickerVisibility(!isDatePickerVisible)}
            style={[
              styles().alignCenter,
              styles().justifyCenter,
              styles().alignSelfCenter,
              styles().wh100,
              {
                zIndex: 2,
              },
            ]}
          >
            <DateTimePicker
              textColor={"white"}
              style={[
                styles().w100,
                styles().borderRad10,
                styles().overflowH,
                styles(props.currentTheme).themeBackground,
                {
                  zIndex: 999999,
                },
              ]}
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="spinner"
              onChange={onChange}
              timeZoneOffsetInMinutes={0}
            />
          </TouchableOpacity>
        </Modal>
      ) : (
        show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            // style={{backgroundColor:'green'}}
            // mode={mode}
            mode={"date"}
            is24Hour={true}
            // display="default"
            display="default"
            // textColor={'#000'}

            // display="default"
            onChange={onChange}
          />
        )
      )}
    </View>
  );
}

export default CustomCalendar;
