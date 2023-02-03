import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Platform,
  Animated,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import { CommonActions, useIsFocused } from "@react-navigation/native";
import {
  Ionicons,
  Foundation,
  FontAwesome5,
  Feather,
  Octicons,
  AntDesign,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import PhoneInput from "react-native-phone-input";
// import TextField from '../../Component/TextField/TextField';
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import AuthLayout from "../../Component/AuthLayout/AuthLayout";
import TextField from "../../Component/FloatTextField/FloatTextField";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { SendPhoneCode } from "../../apollo/server";
import Spinner from "../../Component/Spinner/Spinner";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import MapInput from "../../Component/MapInput/MapInput";
import * as Location from "expo-location";
import * as Permission from "expo-permissions";

const { width, height } = Dimensions.get("window");
const LATITUDE = 6.4598198;
const LONGITUDE = 3.5242564;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = 0.1;
export default function TellAboutYourself(props) {
  let goal = props?.route?.params.goal;
  const SEND_PHONE_CODE = gql`
    ${SendPhoneCode}
  `;
  const { phone } = useRef();
  let isFocus = useIsFocused();
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [FirstName, SetFirstName] = useState("");
  const [FirstNameError, SetFirstNameError] = useState(false);

  const [LastName, SetLastName] = useState("");
  const [LastNameError, SetLastNameError] = useState(false);

  const [Email, SetEmail] = useState("");
  const [EmailError, SetEmailError] = useState(false);

  const [PhoneNumber, SetPhoneNumber] = useState("");
  const [PhoneNumberError, SetPhoneNumberError] = useState(false);

  const [Address, setAddress] = useState("");
  const [AddressError, setAddressError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [locationLoader, setLocationLoader] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitude: LONGITUDE,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [delivery_address, setDeliveryAddress] = useState("");

  function onChangeDeliveryAddress(address) {
    setDeliveryAddress(address);
  }

  function onChangeDeliveryRegion(region) {
    console.log("==========", region);
    setRegion(region);
  }

  function getCoordsFromName(loc, description, addressComponent) {
    let region = {
      latitude: loc.lat,
      longitude: loc.lng,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
    setRegion(region);
    setDeliveryAddress(description);
  }

  const [mutate, { client }] = useMutation(SEND_PHONE_CODE, {
    onCompleted,
    onError,
  });

  async function onCompleted(data) {
    try {
      console.log("SendPhoneCode res :", data);
      FlashMessage({ msg: "Success!", type: "success" });
      props.navigation.navigate("Verification", {
        user: {
          firstName: FirstName,
          lastName: LastName,
          email: Email.trim().toLowerCase(),
          address: Address,
          phone: PhoneNumber,
        },
        goal: goal,
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function onError(error) {
    // FlashMessage({ msg: "Invalid Phone Number!", type: "danger" });
    FlashMessage({ msg: error?.message?.toString(), type: "danger" });
    setLoading(false);
    console.log("SendPhoneCode error  :", error);
  }

  function GetInfo() {
    let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let status = true;
    if (FirstName === "") {
      FlashMessage({ msg: "Enter First Name", type: "warning" });
      SetFirstNameError(true);
      status = false;
      return;
    }

    if (LastName === "") {
      FlashMessage({ msg: "Enter Last Name", type: "warning" });
      SetLastNameError(true);
      status = false;
      return;
    }

    if (Email === "") {
      FlashMessage({ msg: "Enter Email Address", type: "warning" });
      SetEmailError(true);
      status = false;
      return;
    }
    if (!emailregex.test(Email.trim().toLowerCase())) {
      FlashMessage({ msg: "Invalid Email Address", type: "warning" });
      SetEmailError(true);
      status = false;
      return;
    }

    if (PhoneNumber === "") {
      FlashMessage({ msg: "Enter Phone Number", type: "warning" });
      SetPhoneNumberError(true);
      status = false;
      return;
    }
    if (PhoneNumber.length < 10) {
      FlashMessage({
        msg: "Phone Number Length must be greater than 10",
        type: "warning",
      });
      SetPhoneNumberError(true);
      status = false;
      return;
    }
    // if (Address === "") {
    //   FlashMessage({ msg: "Enter Address!", type: "warning" });
    //   setAddressError(true);
    //   status = false;
    //   return;
    // }

    if (status) {
      setLoading(true);
      mutate({
        variables: {
          phone: `+${PhoneNumber}`,
        },
      });

      // props.navigation.navigate("Verification");
      // props.navigation.navigate("CreatePassword", {
      //   user: {
      //     firstName: FirstName,
      //     lastName: LastName,
      //     email: Email.trim().toLowerCase(),
      //     address: Address,
      //     phone: PhoneNumber,
      //   },
      //   code: "",
      //   goal: goal,
      // });
    }
  }
  // console.log(PhoneNumber);
  async function regionChange(region) {
    const { status } = await Permission.askAsync(
      Permission.LOCATION_FOREGROUND
    );

    if (status === "granted") {
      await Location.reverseGeocodeAsync({
        latitude: region.latitude,
        longitude: region.longitude,
      })
        .then((data) => {
          console.log("data on regionChange(region)", data);
          if (data?.length) {
            const location = data[0];
            let delivery_address = Object?.keys(location)
              ?.map((key) => location[key])
              ?.join(" ");
            console.log("data on delivery_address", delivery_address);
            setLocationLoader(false);
            setAddress(delivery_address);
          }
        })
        .catch((error) => {
          setLocationLoader(false);
          console.log("Error in regionchange : ", error);
        });
    }
  }

  async function Currentlocation() {
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    if (location) {
      let region = {
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      };
      await regionChange(region);
      setRegion(region);
      setCurrentAddress(region);
    }
  }

  useEffect(() => {
    // Currentlocation();
  }, [isFocus]);
  console.log(Address);
  return (
    <AuthLayout withoutScroll={true} navigation={props.navigation}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles().w150px, styles().h110px]}>
            <Image
              source={require("../../assets/images/logo.png")}
              resizeMode="cover"
              style={styles().wh100}
            />
          </View>

          <View style={[styles().mt25, styles().mb15]}>
            <Text
              style={[
                styles().fs24,
                styles().fontRegular,
                { color: currentTheme.black },
              ]}
            >
              Tell us About
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
              Yourself
            </Text>
          </View>

          <View style={styles().mb20}>
            <TextField
              keyboardType="default"
              value={FirstName}
              label="First Name"
              errorText={FirstNameError}
              autoCapitalize="none"
              style
              onChangeText={(text) => {
                SetFirstNameError(false);
                SetFirstName(text);
              }}
            />
          </View>

          <View style={styles().mb20}>
            <TextField
              keyboardType="default"
              value={LastName}
              label="Last Name"
              errorText={LastNameError}
              autoCapitalize="none"
              style
              onChangeText={(text) => {
                SetLastNameError(false);
                SetLastName(text);
              }}
            />
          </View>

          <View style={styles().mb20}>
            <TextField
              keyboardType="default"
              value={Email}
              label="Email"
              errorText={EmailError}
              autoCapitalize="none"
              style
              onChangeText={(text) => {
                SetEmailError(false);
                SetEmail(text);
              }}
            />
          </View>

          {/* <View style={styles().mb20}>
        <TextField
          // keyboardType="phone-pad"
          keyboardType="numeric"
          value={PhoneNumber}
          label="Phone Number (USA)"
          errorText={PhoneNumberError}
          autoCapitalize="none"
          style
          onChangeText={(text) => {
            SetPhoneNumberError(false);
            SetPhoneNumber(text);
          }}
        />
      </View> */}
          <View style={[styles().mt5]}>
            <PhoneInput
              ref={phone}
              onChangePhoneNumber={(text) => {
                SetPhoneNumberError(false);
                SetPhoneNumber(text);
                console.log(text);
              }}
              initialCountry={"us"}
              style={[
                styles().h60px,
                styles().pl15,
                styles(currentTheme).bgWhite,
                styles().br5,

                {
                  color: currentTheme.borderColor,
                  backgroundColor: "transparent",
                  borderColor: currentTheme.cEFEFEF,
                  borderWidth: 1,
                  marginBottom: 20,
                },
              ]}
            />
          </View>

          <View style={styles().mb20}>
            <TextField
              keyboardType="default"
              value={Address}
              label="Address (optional)"
              // errorText={UserError}
              autoCapitalize="none"
              style
              onChangeText={(text) => {
                //   setUserError(false)
                setAddress(text);
              }}
            />
          </View>
          {/* <View style={styles().mb20}>
            <MapInput
              onChangeAddress={(data) => onChangeDeliveryAddress(data)}
              onChangeRegion={(data) => onChangeDeliveryRegion(data)}
              delivery_address={delivery_address}
              notifyChange={(loc, description, addressComponent) => {
                console.log("===========>", loc, description, addressComponent);
                getCoordsFromName(loc, description, addressComponent);
              }}
              region={region}
            />
          </View> */}
          {Address ? (
            <View
              style={[
                {
                  height: 120,
                  width: "100%",
                  borderRadius: 5,
                  overflow: "hidden",
                  marginBottom: 20,
                },
              ]}
            >
              <MapView
                // showsCompass
                // onMapReady={setMargin}
                region={{
                  latitude: parseFloat(region?.latitude),
                  longitude: parseFloat(region?.longitude),
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }}
                initialRegion={{
                  latitude: parseFloat(region?.latitude),
                  longitude: parseFloat(region?.longitude),
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }}
                loadingEnabled={true}
                // showsUserLocation={true}
                provider={PROVIDER_DEFAULT}
                onMarkerPress={() => Currentlocation()}
                // showsMyLocationButton={true}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Marker
                  coordinate={{
                    latitude: parseFloat(region?.latitude),
                    longitude: parseFloat(region?.longitude),
                  }}
                />
              </MapView>
            </View>
          ) : locationLoader ? (
            <ActivityIndicator
              style={[styles().alignSelfEnd]}
              size={"small"}
              color={currentTheme.themeBackground}
            />
          ) : (
            <TouchableOpacity
              style={[styles().alignSelfEnd]}
              onPress={() => {
                setLocationLoader(true);
                Currentlocation();
              }}
            >
              <Entypo
                name="location"
                size={20}
                color={currentTheme.themeBackground}
              />
            </TouchableOpacity>
          )}

          <View style={styles().mt10}>
            {loading ? (
              <Spinner />
            ) : (
              <ThemeButton Title={"Next"} onPress={() => GetInfo()} />
            )}
            <ThemeButton
              Title={"Back"}
              withoutBg={true}
              Style={styles().mv20}
              onPress={() => props.navigation.goBack()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}
