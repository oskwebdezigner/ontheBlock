import React, { useContext, useState, useCallback, useEffect } from "react";
import {
  Platform,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import AuthLayout from "../../Component/AuthLayout/AuthLayout";
import TextField from "../../Component/FloatTextField/FloatTextField";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Spinner from "../../Component/Spinner/Spinner";
import RangeSlider, { Slider } from "react-native-range-slider-expo";
import Multiselect from "../../Component/Multiselect/Multiselect";
import {
  PropertyTypes,
  propertyUses,
  RegisterWithProperty,
} from "../../apollo/server";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TellAboutHome(props) {
  let { user, password, goal } = props?.route?.params;
  // console.log(user);
  // console.log("====ye rhay goals===>", goal);

  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [PropertyNick, setPropertyNick] = useState("");
  const [PropertyNickError, setPropertyNickError] = useState(false);
  const [Bedrooms, setBedrooms] = useState("");
  const [BedroomsError, setBedroomsError] = useState(false);
  const [Bathroom, setBathroom] = useState("");
  const [BathroomError, setBathroomError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [PropertyType, setPropertyType] = useState("");
  const [property, setProperty] = useState([]);
  const [Residence, setResidence] = useState("");

  const REGISTER_WITH_PROPERTY = gql`
    ${RegisterWithProperty}
  `;
  const PROPERTY_TYPE = gql`
    ${PropertyTypes}
  `;

  const PROPERTY_USE = gql`
    ${propertyUses}
  `;

  const [mutate, { client }] = useMutation(REGISTER_WITH_PROPERTY, {
    onCompleted,
    onError,
  });

  const { loading, error, data, refetch } = useQuery(PROPERTY_TYPE, {
    fetchPolicy: "cache-and-network",
    onCompleted: ({ propertyTypes }) => {
      setProperty(propertyTypes.results);
      console.log(propertyTypes.results[2]);
      if (PropertyType === "") {
        setPropertyType([propertyTypes.results[2]?._id.toString()]);
      }
    },
    onError: (err) => {
      console.log("error in PropertyTypes :", err);
    },
  });

  async function onCompleted(data) {
    try {
      console.log("RegisterWithProperty res :", data.registerWithProperty);
      FlashMessage({ msg: "User Registerd Successfully", type: "success" });
      await AsyncStorage.setItem(
        "token",
        data.registerWithProperty?.token?.toString()
      );
      props.navigation.navigate("Login", { user: data });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function onError(error) {
    FlashMessage({ msg: error.message.toString(), type: "danger" });
    setLoading(false);
    console.log("RegisterWithProperty error  :", error);
  }

  const {
    loading: propertyuserLoader,
    error: propertyuserError,
    data: propertyuserData,
    refetch: propertyuserRefetch,
  } = useQuery(PROPERTY_USE, {
    fetchPolicy: "cache-and-network",
    onCompleted: ({ propertyUses }) => {
      // console.log("propertyUses :", propertyuserData?.propertyUses?.results);
    },
    onError: (err) => {
      console.log("error in propertyUses :", err);
    },
  });

  async function Register() {
    console.log("enter property type", PropertyType);
    let status = true;
    if (PropertyNick === "") {
      setPropertyNickError(true);
      FlashMessage({ msg: "Enter Residence Name!", type: "warning" });
      status = false;
      return;
    }
    if (PropertyType === "") {
      FlashMessage({ msg: "Select Your Property Type", type: "warning" });
      status = false;
      return;
    }
    if (Residence === "") {
      FlashMessage({ msg: "Select Propert Use!", type: "warning" });
      status = false;
      return;
    }
    if (Bedrooms === "") {
      setBedroomsError(true);
      FlashMessage({ msg: "Enter Bedrooms", type: "warning" });
      status = false;
      return;
    }
    if (Bathroom === "") {
      setBathroomError(true);
      FlashMessage({ msg: "Enter Bathroom", type: "warning" });
      status = false;
      return;
    }

    if (status) {
      setLoading(true);
      let data = {
        userInput: {
          address: user?.address,
          email: user?.email,
          first_name: user?.firstName,
          goals: goal,
          last_name: user?.lastName,
          password: password,
          phone: user?.phone,
        },
        propertyInput: {
          bathrooms: parseFloat(Bathroom),
          bedrooms: parseFloat(Bedrooms),
          owned_years: value,
          name: PropertyNick,
          type: PropertyType[0],
          description: "description",
          use: Residence,
        },
      };
      console.log("property data:", data);
      // alert('create')
      mutate({ variables: { ...data } });
    }
  }

  let proptuse = propertyuserData?.propertyUses?.results?.find((item) => {
    return item._id === Residence;
  });
  // console.log(Residence)
  return (
    <AuthLayout withoutScroll={true} navigation={props.navigation}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles().flex}>
            <View style={[styles().w150px, styles().h110px]}>
              <Image
                source={require("../../assets/images/logo.png")}
                resizeMode="cover"
                style={styles().wh100}
              />
            </View>
            <View style={[styles().mt25]}>
              <Text
                style={[
                  styles().fs24,
                  styles().fontRegular,
                  { color: currentTheme.black },
                ]}
              >
                Tell Me About
              </Text>
              <Text
                style={[
                  styles().fs24,
                  styles().fontSemibold,
                  styles().lh30,
                  styles().fw600,
                  { color: currentTheme.themeBackground },
                ]}
              >
                {" "}
                Your Home
              </Text>
            </View>

            <View style={styles().mt15}>
              <TextField
                keyboardType="default"
                onChangeText={(e) => {
                  setPropertyNickError(false);
                  setPropertyNick(e);
                }}
                value={PropertyNick}
                // label="Property Nickname"
                label="Residence Name"
                errorText={PropertyNickError}
                autoCapitalize="none"
                style
              />
            </View>

            <View
              style={[
                styles().mt15,
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
                Property type
              </Text>
              <Multiselect
                ListItems={property}
                SelectText={PropertyType}
                value={PropertyType}
                setValue={setPropertyType}
              />
            </View>

            <View
              style={[
                styles().mt15,
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
                Property Use
              </Text>
              <Multiselect
                ListItems={propertyuserData?.propertyUses?.results}
                SelectText={proptuse?.name}
                value={Residence}
                setValue={(e) => setResidence(e[0])}
              />
            </View>

            <View style={styles().mt15}>
              <TextField
                keyboardType="numeric"
                maxLength={3}
                onChangeText={(e) => {
                  if (e % 1 != 0) {
                    FlashMessage({
                      msg: "Enter a Valid Number",
                      type: "warning",
                    });
                  } else {
                    setBedroomsError(false);
                    setBedrooms(e);
                  }
                }}
                value={Bedrooms}
                label="Bedroom(s)"
                errorText={BedroomsError}
                autoCapitalize="none"
                style
              />
            </View>

            <View style={styles().mt15}>
              <TextField
                keyboardType="numeric"
                maxLength={3}
                onChangeText={(e) => {
                  setBathroomError(false);
                  setBathroom(e);
                }}
                // onChangeText={(e) => {
                //   if (e % 1 != 0) {
                //     FlashMessage({
                //       msg: "Enter a Valid Number",
                //       type: "warning",
                //     });
                //   } else {
                //     setBathroomError(false);
                //     setBathroom(e);
                //   }
                // }}
                value={Bathroom}
                label="Bathroom(s)"
                errorText={BathroomError}
                autoCapitalize="none"
                style
              />
            </View>

            <View
              style={[
                styles().mt15,
                styles().h70px,
                styles().br10,
                styles().bw1,
                { borderColor: currentTheme.cEFEFEF },
              ]}
            >
              <Text
                style={[
                  styles().ml15,
                  styles().mt5,
                  styles().mb5,
                  styles().fs12,
                  styles().fw400,
                  { color: currentTheme.textColor },
                ]}
              >
                How long have you owned your home?
              </Text>
              <View
                style={[
                  styles().flexRow,
                  styles().justifyCenter,
                  styles().overflowH,
                  styles().h40px,
                  styles().alignCenter,
                ]}
              >
                <Slider
                  min={0}
                  max={10}
                  step={1}
                  valueOnChange={(value) => setValue(value)}
                  showValueLabels={false}
                  showRangeLabels={false}
                  knobColor={currentTheme.themeBackground}
                  knobSize={12}
                  styleSize={"small"}
                  inRangeBarColor={currentTheme.EEEEEE}
                  outOfRangeBarColor={currentTheme.EEEEEE}
                  barHeight={40}
                  containerStyle={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <Text
                  style={[
                    styles().fs13,
                    styles().fontRegular,
                    styles().mr15,
                    { color: currentTheme.black },
                  ]}
                >
                  {value}
                </Text>
              </View>
            </View>

            <View style={styles().mv20}>
              {Loading ? (
                <Spinner />
              ) : (
                <ThemeButton Title={"Create"} onPress={() => Register()} />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}
