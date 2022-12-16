import React, { useContext, useState, useCallback, useEffect } from "react";
import {
  Platform,
  Dimensions,
  FlatList,
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

import RangeSlider, { Slider } from "react-native-range-slider-expo";
import Multiselect from "../../Component/Multiselect/Multiselect";
import { ScrollView } from "react-native-gesture-handler";
import CameraComponent from "../../Component/CameraComponent/CameraComponent";
import MultipleImagePicker from "../../Component/CameraComponent/MultipleImagePicker";
import { ImageBackground } from "react-native-web";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { addHandyman, updateHandyman } from "../../apollo/server";

const { width, height } = Dimensions.get("window");
export default function HandymenEdit(props) {
  let property = props?.route?.params?.property;
  let isEdit = props?.route?.params?.isEdit;
  let handymen = props?.route?.params?.handymen;

  const ADD_HANDYMAN = gql`
    ${addHandyman}
  `;
  const UPDATE_HANDYMAN = gql`
    ${updateHandyman}
  `;
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [Occupation, setOccupation] = useState("");
  const [OccupationErr, setOccupationErr] = useState(false);

  const [PersonName, setPersonName] = useState("");
  const [PersonNameError, setPersonNameError] = useState(false);

  const [PersonPhone, setPersonPhone] = useState("");
  const [PersonPhoneError, setPersonPhoneError] = useState(false);

  const [Loading, setLoading] = useState(false);

  const [mutate, { client }] = useMutation(
    isEdit ? UPDATE_HANDYMAN : ADD_HANDYMAN,
    {
      onCompleted,
      onError,
    }
  );

  async function onCompleted(data) {
    try {
      FlashMessage({
        msg: isEdit ? "Handymen Updated!" : "New Handymen Added!",
        type: "success",
      });
      console.log("Handyman res :", data);
      props.navigation.navigate("MyHandymen");
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
    console.log("Handyman error  :", error);
  }

  async function AddHandymen() {
    let status = true;
    if (Occupation === "") {
      FlashMessage({ msg: "Enter Occupation", type: "warning" });
      status = false;
      return;
    }
    if (PersonName === "") {
      FlashMessage({ msg: "Enter Handymen Name", type: "warning" });
      status = false;
      return;
    }
    if (PersonPhone === "") {
      FlashMessage({ msg: "Enter Handymen Phone", type: "warning" });
      status = false;
      return;
    }

    if (status) {
      setLoading(true);
      let data = {
        inputHandyman: {
          contact_no: PersonPhone,
          name: PersonName,
          occupation: Occupation,
          property: property?._id,
        },
      };

      let editData = {
        updateHandymanId: handymen?._id,
        updateHandymanInput: {
          contact_no: PersonPhone,
          name: PersonName,
          occupation: Occupation,
        },
      };
      await mutate({
        variables: isEdit ? editData : data,
      });
    }
  }

  useEffect(() => {
    if (isEdit) {
      setPersonPhone(handymen?.contact_no);
      setPersonName(handymen?.name);
      setOccupation(handymen?.occupation);
    }
  }, []);

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={isEdit ? "Update Handymen" : "Handymen Details"}
    >
      <View style={styles().flex}>
        {/* <View
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
            Occupation
          </Text>
          <Multiselect
            ListItems={HandymenList}
            SelectText={"Electrician"}
            value={Occupation}
            setValue={setOccupation}
          />
        </View> */}

        <View style={styles().mt15}>
          <TextField
            keyboardType="default"
            onChangeText={(e) => {
              setOccupationErr(false);
              setOccupation(e);
            }}
            value={Occupation}
            label="Occupation"
            errorText={OccupationErr}
            autoCapitalize="none"
            style
          />
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
            keyboardType="numeric"
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

        {/* <View style={styles().mt15}>
          <TouchableOpacity style={[styles().flexRow, styles().alignCenter]}>
            <FontAwesome
              name="plus-square"
              size={20}
              color={currentTheme.textColor}
            />
            <Text
              style={[
                styles().ml10,
                styles().fs14,
                styles().fw400,
                { color: currentTheme.black },
              ]}
            >
              Add new Handymen
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>

      <View style={[styles().mt35, styles().mb20]}>
        {Loading ? (
          <Spinner />
        ) : (
          <ThemeButton
            onPress={() => AddHandymen()}
            Title={isEdit ? "Update" : "Add"}
          />
        )}
      </View>
    </Layout>
  );
}
