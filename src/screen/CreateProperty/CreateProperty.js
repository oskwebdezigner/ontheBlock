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
import { createProperty, PropertyTypes } from "../../apollo/server";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../../Component/Layout/Layout";
import UserContext from "../../context/User/User";

export default function TellAboutHome(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const user = useContext(UserContext);
  const [PropertyNick, setPropertyNick] = useState("");
  const [PropertyNickError, setPropertyNickError] = useState(false);
  const [Bedrooms, setBedrooms] = useState("");
  const [BedroomsError, setBedroomsError] = useState(false);
  const [Bathroom, setBathroom] = useState("");
  const [BathroomError, setBathroomError] = useState(false);

  const [Address, setAddress] = useState("");
  const [AddressError, setAddressError] = useState(false);
  const [Country, setCountry] = useState("");
  const [CountryError, setCountryError] = useState(false);
  const [City, setCity] = useState("");
  const [CityError, setCityError] = useState(false);
  const [Description, setDescription] = useState("");
  const [Zipcode, setZipcode] = useState("");
  const [ZipcodeError, setZipcodeError] = useState(false);

  const [Loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [PropertyType, setPropertyType] = useState("");
  const [property, setProperty] = useState([]);

  const CREATE_PROPERTY = gql`
    ${createProperty}
  `;
  const PROPERTY_TYPE = gql`
    ${PropertyTypes}
  `;

  const [mutate, { client }] = useMutation(CREATE_PROPERTY, {
    onCompleted,
    onError,
  });

  const { loading, error, data, refetch } = useQuery(PROPERTY_TYPE, {
    fetchPolicy: "cache-and-network",
    onCompleted: ({ propertyTypes }) => {
      //   console.log("propertyTypes :", propertyTypes);
      setProperty(propertyTypes.results);
      if(PropertyType === ""){
        setPropertyType([propertyTypes.results[0]?._id.toString()])
      }
    },
    onError: (err) => {
      console.log("error in PropertyTypes :", err);
    },
  });

  async function onCompleted(data) {
    try {
      console.log("createProperty res :", data.createProperty);
      FlashMessage({ msg: "Property Created!", type: "success" });

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
    FlashMessage({ msg: error.message.toString(), type: "danger" });
    setLoading(false);
    console.log("createProperty error  :", error);
  }

  async function AddProperty() {

    let status = true;
    if (PropertyNick === "") {
      setPropertyNickError(true);
      FlashMessage({ msg: "Enter Property Name", type: "warning" });
      status = false;
      return;
    }
    if (PropertyType === "") {
      FlashMessage({ msg: "Select Your Property Type", type: "warning" });
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
    if (Address === "") {
      setAddressError(true);
      FlashMessage({ msg: "Enter Address", type: "warning" });
      status = false;
      return;
    }
    if (Country === "") {
      setCountryError(true);
      FlashMessage({ msg: "Enter Country", type: "warning" });
      status = false;
      return;
    }
    if (City === "") {
      setCityError(true);
      FlashMessage({ msg: "Enter City", type: "warning" });
      status = false;
      return;
    }
    if (Zipcode === "") {
      setZipcodeError(true);
      FlashMessage({ msg: "Enter Zip Code", type: "warning" });
      status = false;
      return;
    }

    if (value <= 0) {
      FlashMessage({ msg: "Seleted Property own Years", type: "warning" });
      status = false;
      return;
    }

    if (status) {
      setLoading(true);
      let data = {
        inputProperty: {
          owned_years: value,
          name: PropertyNick,
          images: [],
          description: Description,
          address: Address,
          bathrooms: parseFloat(Bathroom),
          bedrooms: parseFloat(Bedrooms),
          added_by: user._id,
          type: PropertyType[0],
          zip_code: Zipcode,
          country: Country,
          city: City,
        //   is_active: "",
        },
      };
      console.log(data);
      mutate({ variables: { ...data } });
    }
  }
  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"Add New Property"}
    >
      <KeyboardAvoidingView
        style={styles().flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={70}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles().flex]}>
            <View style={styles().mt15}>
              <TextField
                keyboardType="default"
                onChangeText={(e) => {
                  setPropertyNickError(false);
                  setPropertyNick(e);
                }}
                value={PropertyNick}
                label="Property Name"
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

            <View style={styles().mt15}>
              <TextField
                keyboardType="numeric"
                onChangeText={(e) => {
                  setBedroomsError(false);
                  setBedrooms(e);
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
                onChangeText={(e) => {
                  setBathroomError(false);
                  setBathroom(e);
                }}
                value={Bathroom}
                label="Bathroom(s)"
                errorText={BathroomError}
                autoCapitalize="none"
                style
              />
            </View>

            <View style={styles().mt15}>
              <TextField
                keyboardType="default"
                onChangeText={(e) => {
                  setCountryError(false);
                  setCountry(e);
                }}
                value={Country}
                label="Country"
                errorText={CountryError}
                autoCapitalize="none"
                style
              />
            </View>

            <View style={styles().mt15}>
              <TextField
                keyboardType="default"
                onChangeText={(e) => {
                  setCityError(false);
                  setCity(e);
                }}
                value={City}
                label="City"
                errorText={CityError}
                autoCapitalize="none"
                style
              />
            </View>
            <View style={styles().mt15}>
              <TextField
                keyboardType="default"
                onChangeText={(e) => {
                  setAddressError(false);
                  setAddress(e);
                }}
                value={Address}
                label="Address"
                errorText={AddressError}
                autoCapitalize="none"
                style
              />
            </View>

            <View style={styles().mt15}>
              <TextField
                keyboardType="default"
                onChangeText={(e) => {
                  setZipcodeError(false);
                  setZipcode(e);
                }}
                value={Zipcode}
                label="Zip Code"
                errorText={ZipcodeError}
                autoCapitalize="none"
                style
              />
            </View>
            <View style={styles().mt15}>
              <TextField
                keyboardType="default"
                onChangeText={(e) => {
                  setDescription(e);
                }}
                value={Description}
                label="Description (optional)"
                errorText={""}
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
          </View>
          <View style={[styles().mv25]}>
            {Loading ? (
              <Spinner />
            ) : (
              <ThemeButton Title={"Create"} onPress={() => AddProperty()} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}
