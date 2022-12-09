import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Platform,
  Button,
  Animated,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import { CommonActions } from "@react-navigation/native";
import {
  Ionicons,
  Foundation,
  FontAwesome5,
  Feather,
  Octicons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import TextField from "../../Component/FloatTextField/FloatTextField";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import PhoneInput from "react-native-phone-input";
import Multiselect from "../../Component/Multiselect/Multiselect";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomCalendar from "../../Component/CustomCalendar/CustomCalendar";

const { width, height } = Dimensions.get("window");

const NationalityList = [
  {
    name: "Pakistani",
    _id: 0,
  },
  {
    name: "American",
    _id: 1,
  },
];

export default function PersonalDetails(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [FirstName, SetFirstName] = useState("");
  const [FirstNameerror, SetFirstNameError] = useState(false);

  const [LastName, SetLastName] = useState("");
  const [LastNameError, SetLastNameError] = useState(false);

  const [email, Setemail] = useState("");
  const [emailError, SetemailError] = useState(false);

  const [nationality, Setnationality] = useState("");
  const [nationalityError, SetnationalityError] = useState(false);

  const [Residence, SetResidence] = useState([]);
  const [ResidenceError, SetResidenceError] = useState(false);

  const [DOB, SetDOB] = useState("");
  const [DOBError, SetDOBError] = useState(false);

  const [Password, SetPassword] = useState("");
  const [passError, setPasswordError] = useState(false);

  function validate() {
    let status = true;
    if (FirstName === "") {
      FirstNameerror(true);
      status = false;
    }
    if (Password === "") {
      setPasswordError(true);
      status = false;
    }
    return status;
  }
  const { ref } = useRef();

  const [Nationality, SetNationality] = useState([]);

  const [isCalender, SetisCalender] = useState(false);

  let selectedDate = (date, abcd) => {
    SetDOB(abcd?.toString());
    // console.log(DOB)
    // console.log("date", date);
    // console.log("abcd", abcd);
    SetisCalender(false);
  };

  const [defautDob, setdefautDob] = useState(
    NewformatDate(new Date()).toString()
  );

  function NewformatDate(date) {
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
  }

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"Personal Details"}
      homeGrad={true}
      ProfileImg={false}
    >
      <KeyboardAvoidingView>
        <View>
          <TextField
            keyboardType="default"
            value={FirstName}
            label="First Name"
            errorText={FirstNameerror}
            autoCapitalize="none"
            style
            onChangeText={(text) => {
              SetFirstNameError(null);
              SetFirstName(text);
            }}
          />
        </View>
        <View style={styles().mt5}>
          <TextField
            keyboardType="deafult"
            value={LastName}
            label="Last Name"
            errorText={LastNameError}
            autoCapitalize="none"
            style
            onChangeText={(text) => {
              SetLastNameError(null);
              SetLastName(text);
            }}
          />
        </View>
        <View style={styles().mt5}>
          <TextField
            keyboardType="email-address"
            value={email}
            label="Email Address"
            errorText={emailError}
            autoCapitalize="none"
            style
            onChangeText={(text) => {
              SetemailError(null);
              Setemail(text);
            }}
          />
        </View>
        <View style={[styles().mt5]}>
          <PhoneInput
            ref={ref}
            initialCountry={"us"}
            style={[
              styles().h60px,
              styles().pl15,
              styles(currentTheme).bgWhite,
              styles().br5,
              {
                color: currentTheme.borderColor,
                backgroundColor: currentTheme.white,
              },
            ]}
          />
        </View>
        <View style={styles().mt5}>
          <Multiselect
            ListItems={NationalityList}
            SelectText={"Nationality"}
            value={Nationality}
            setValue={SetNationality}
          />
        </View>
        <View style={styles().mt5}>
          <Multiselect
            ListItems={NationalityList}
            SelectText={"Country of Residence"}
            value={Residence}
            setValue={SetResidence}
          />
        </View>
        <View style={styles().mt5}>
          {/* <TextField
            keyboardType='default'
            value={DOB}
            label="Date of Birth"
            errorText={DOBError}
            autoCapitalize='none'
            style
            onChangeText={(text) => {
                SetDOBError(null)
                SetDOB(text)
            }}
        /> */}
          {/* <TextField
            keyboardType='email-address'
            value={DOB}
            label="Date of Birth"
            errorText={DOBError}
            autoCapitalize='none'
            style
            onChangeText={() => SetisCalender(true)}
        /> */}
          <View
            style={[
              styles().h60px,
              styles(currentTheme).bgWhite,
              styles().ph20,
              styles().justifyCenter,
              styles().br10,
            ]}
          >
            {/* <TouchableOpacity style={[styles().h60px, styles().bgWhite, styles().ph20, styles().justifyCenter, styles().br10]} 
            onPress={() => SetisCalender(true)}>
                <Text>{DOB ? DOB : 'Date of Birth'} </Text>
            </TouchableOpacity> */}
            <CustomCalendar
              date={
                <Text style={{ color: currentTheme.themeBackground }}>
                  {DOB ? DOB : defautDob}
                </Text>
              }
              currentTheme={currentTheme}
              Viewstyle={
                [
                  //  styles(currentTheme).bgTextWhite,
                  //  styles().borderW1,
                  //  styles().borderRad100,
                  //  styles().pl20,
                  //  styles(currentTheme).borderCWhite,
                  //  styles().fontRegular,
                  //  dobErr && { borderColor: currentTheme.danger },
                  //  styles().h50px
                ]
              }
              onchange={(date) => {
                SetDOB(date);
                console.log("date", date);
                //  setDobErr(null);
              }}
            />
          </View>
          <View></View>
        </View>

        <View style={[styles().flexRow, styles().mt20, styles().justifyEnd]}>
          <ThemeButton
            Title={"Update"}
            onPress={() => props.navigation.navigate("Profile")}
            Style={styles().w48}
          />
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
}
