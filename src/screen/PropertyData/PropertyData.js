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
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";

import Layout from "../../Component/Layout/Layout";
import TextField from "../../Component/FloatTextField/FloatTextField";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Spinner from "../../Component/Spinner/Spinner";
import RangeSlider, { Slider } from "react-native-range-slider-expo";
import Multiselect from "../../Component/Multiselect/Multiselect";
import { ScrollView } from "react-native-gesture-handler";
import { PropertyTypes, updateProperty } from "../../apollo/server";
import Loader from "../../Component/Loader/Loader";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";

export default function PropertyData(props) {
  const PROPERTY_TYPE = gql`
    ${PropertyTypes}
  `;

  const UPDATE_PROPERTY = gql`
    ${updateProperty}
  `;
  const Title = props.route.params.pageTitle;
  const property = props.route.params.property;
  console.log("property data :", property);

  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [PropertyNick, setPropertyNick] = useState("");
  const [PropertyNickError, setPropertyNickError] = useState(false);

  const [value, setValue] = useState(0);
  const [PropertyType, setPropertyType] = useState("");
  const [Residence, setResidence] = useState("");

  const [Street, setStreet] = useState("");
  const [StreetError, setStreetError] = useState(false);

  const [City, setCity] = useState("");
  const [CityError, setCityError] = useState(false);

  const [State, setState] = useState("");
  const [StateError, setStateError] = useState(false);

  const [Zipcode, setZipcode] = useState("");
  const [ZipcodeError, setZipcodeError] = useState(false);

  const [Loading, setLoading] = useState(false);

  const ResidenceList = [
    {
      name: "Primary Residence",
      _id: 0,
    },
    {
      name: "Secondary Residence",
      _id: 1,
    },
  ];

  const { loading, error, data, refetch } = useQuery(PROPERTY_TYPE, {
    fetchPolicy: "cache-and-network",
    onCompleted: ({ propertyTypes }) => {},
    onError: (err) => {
      console.log("error in PropertyTypes :", err);
    },
  });

  const [mutate, { client }] = useMutation(UPDATE_PROPERTY, {
    onCompleted,
    onError,
  });

  async function onCompleted(data) {
    try {
      FlashMessage({ msg: "Property Updated!", type: "success" });
      props.navigation.navigate("Home");
      console.log("updateProperty res :", data.updateProperty);
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
    console.log("updateProperty error  :", error);
  }

  async function UpdateProperty() {
    setLoading(true);
    await mutate({
      variables: {
        updatePropertyId: property._id,
        updatePropertyInput: {
          name: PropertyNick,
          type: PropertyType,
          zip_code: Zipcode,
          city: City,
          country: State,
          address: Street,
        },
      },
    });
  }

  useEffect(() => {
    setPropertyNick(property?.name);
    setStreet(property?.address);
    setCity(property?.city);
    setState(property?.country);
    setZipcode(property?.zip_code);
    // setPropertyType(property?.type?._id);
    setPropertyType(
      property?.type?._id
        ? property?.type?._id
        : data?.propertyTypes?.results[0]?._id
    );
  }, [property]);

  // console.log("propertyTypes :", data?.propertyTypes);
  console.log("propertyType :", PropertyType);
  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={Title?.toUpperCase()}
      loading={loading}
    >
      <KeyboardAvoidingView style={styles().flex}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles().mt15}>
            <TextField
              keyboardType="default"
              onChangeText={(e) => {
                setPropertyNickError(false);
                setPropertyNick(e);
              }}
              value={PropertyNick}
              label="Property Nickname"
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
              ListItems={data?.propertyTypes?.results}
              SelectText={
                property?.type?.name
                  ? property?.type?.name
                  : data?.propertyTypes?.results[0]?.name
              }
              value={PropertyType}
              setValue={(e) => {
                setPropertyType(e[0]);
                // console.log(">>>>>>", e);
              }}
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
              Property Use (optional)
            </Text>
            <Multiselect
              ListItems={ResidenceList}
              SelectText={"Primary Residence"}
              value={Residence}
              setValue={setResidence}
            />
          </View>

          <View style={styles().mt15}>
            <TextField
              keyboardType="default"
              onChangeText={(e) => {
                setStreetError(false);
                setStreet(e);
              }}
              value={Street}
              label="Street Address (optional)"
              errorText={StreetError}
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
                setStateError(false);
                setState(e);
              }}
              value={State}
              label="State (optional)"
              errorText={StateError}
              autoCapitalize="none"
              style
            />
          </View>

          <View style={styles().mt15}>
            <TextField
              keyboardType="numeric"
              onChangeText={(e) => {
                setZipcodeError(false);
                setZipcode(e);
              }}
              value={Zipcode}
              label="Zipcode (optional)"
              errorText={ZipcodeError}
              autoCapitalize="none"
              style
            />
          </View>

          <View style={[styles().mt35, styles().mb30]}>
            {Loading ? (
              <Spinner />
            ) : (
              <ThemeButton
                Title={"Save"}
                onPress={() => {
                  UpdateProperty();
                }}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}
