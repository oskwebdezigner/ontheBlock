import React, { useContext, useState, useCallback, useEffect } from "react";
import {
  Platform,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Image,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import Layout from "../../Component/Layout/Layout";
import TextField from "../../Component/FloatTextField/FloatTextField";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Spinner from "../../Component/Spinner/Spinner";
import RangeSlider, { Slider } from "react-native-range-slider-expo";
import Multiselect from "../../Component/Multiselect/Multiselect";
import { ScrollView } from "react-native-gesture-handler";
import {
  PropertyTypes,
  propertyUses,
  updateProperty,
} from "../../apollo/server";
import Loader from "../../Component/Loader/Loader";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import CameraComponent from "../../Component/CameraComponent/CameraComponent";
import { uploadImageToImageKit } from "../../Component/CameraComponent/CloudUpload";

export default function PropertyData(props) {
  const PROPERTY_TYPE = gql`
    ${PropertyTypes}
  `;

  const UPDATE_PROPERTY = gql`
    ${updateProperty}
  `;
  const PROPERTY_USE = gql`
    ${propertyUses}
  `;

  const property = props.route.params.property;
  console.log("property data :", property);

  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [profilePicLoading, setProfilePicLoading] = useState(false);
  const [images, setImages] = useState([]);
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

  const { loading, error, data, refetch } = useQuery(PROPERTY_TYPE, {
    fetchPolicy: "cache-and-network",
    onCompleted: ({ propertyTypes }) => {},
    onError: (err) => {
      console.log("error in PropertyTypes :", err);
    },
  });

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

  const setImage = async (image) => {
    await uploadImageToImageKit(image).then((img) => {
      setImages((previmgs) => [...previmgs, img.url]);
    });
  };

  const deleteImage = async (i) => {
    let newArr = [...images];
    newArr.splice(i, 1);
    setImages(() => [...newArr]);
  };

  async function UpdateProperty() {
    let status = true;
    if (Residence === "") {
      FlashMessage({ msg: "Select Residence Type!", type: "warning" });
      setPropertyNickError(true);
      status = false;
      return;
    }
    // if (Street === "") {
    //   FlashMessage({ msg: "Enter Address!", type: "warning" });
    //   setStreetError(true);
    //   status = false;
    //   return;
    // }
    if (Zipcode === "") {
      FlashMessage({ msg: "Enter Zip Code!", type: "warning" });
      setZipcodeError(true);
      status = false;
      return;
    }
    // if (PropertyNick === "") {
    //   FlashMessage({ msg: "Enter Residence Name!", type: "warning" });
    //   setPropertyNickError(true);
    //   status = false;
    //   return;
    // }
    if (status) {
      setLoading(true);
      let data = {
        updatePropertyId: property?._id,
        updatePropertyInput: {
          name: PropertyNick,
          type: PropertyType,
          zip_code: Zipcode,
          city: City,
          country: State,
          address: Street,
          images: images,
          use: Residence,
        },
      };
      console.log("data :", data);
      await mutate({
        variables: data,
      });
    }
  }

  useEffect(() => {
    // setPropertyNick(property?.name);
    setStreet(property?.address);
    setCity(property?.city);
    setState(property?.country);
    setZipcode(property?.zip_code);
    setImages(property?.images);
    setResidence(property?.use !== null ? property?.use?._id : "");
    // setPropertyType(property?.type?._id);
    setPropertyType(
      property?.type?._id
        ? property?.type?._id
        : data?.propertyTypes?.results[0]?._id
    );
  }, [property]);

  // console.log("propertyTypes :", data?.propertyTypes);

  let propt = data?.propertyTypes?.results?.find((item) => {
    return item._id === PropertyType;
  });

  let proptuse = propertyuserData?.propertyUses?.results?.find((item) => {
    return item._id === Residence;
  });

  // console.log("propertyType img :", Residence[0]);

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      // pagetitle={property?.name?.toUpperCase()}
      pagetitle={property?.use?.name?.toUpperCase()}
      loading={loading}
    >
      <KeyboardAvoidingView
        style={styles().flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
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
              {/* Property Use (optional) */}
              Residence Type
            </Text>
            <Multiselect
              ListItems={propertyuserData?.propertyUses?.results}
              SelectText={proptuse?.name ? proptuse?.name : proptuse?.name}
              value={Residence}
              setValue={(e) => setResidence(e[0])}
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
              SelectText={propt?.name}
              // SelectText={
              //   property?.type?.name
              //     ? property?.type?.name
              //     : data?.propertyTypes?.results[0]?.name
              // }
              value={PropertyType}
              setValue={(e) => {
                setPropertyType(e[0]);
                // console.log(">>>>>>", e);
              }}
            />
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
              label="Property Name (optional)"
              errorText={PropertyNickError}
              autoCapitalize="none"
              style
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
              label="Zipcode"
              errorText={ZipcodeError}
              autoCapitalize="none"
              style
            />
          </View>

          <View
            style={[
              styles().mt15,
              styles().pb10,
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
              Property Pictures
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                flexWrap: "wrap",
                // backgroundColor: "red",
              }}
            >
              {images
                ? images?.map((img, i) => {
                    return (
                      <View key={i}>
                        <TouchableOpacity
                          onPress={() => deleteImage(i)}
                          activeOpacity={0.6}
                          style={[
                            styles().posAbs,
                            styles().zIndex10,
                            {
                              right: -7,
                              top: -5,
                            },
                          ]}
                        >
                          <Entypo
                            color={"black"}
                            size={15}
                            name={"circle-with-cross"}
                          />
                        </TouchableOpacity>
                        <View
                          // key={i}
                          style={[
                            styles().justifyCenter,
                            styles().alignCenter,
                            styles().br5,
                            styles().bw1,
                            styles().wh40px,
                            styles().overflowH,
                            {
                              borderStyle: "dashed",
                              borderColor: currentTheme.textColor,
                              marginLeft: 10,
                            },
                          ]}
                        >
                          <Image source={{ uri: img }} style={styles().wh100} />
                        </View>
                      </View>
                    );
                  })
                : null}
              <View
                style={[
                  styles().flexRow,
                  styles().ml5,
                  styles().mr15,
                  styles().flexWrap,
                  styles().alignCenter,
                ]}
              >
                {!profilePicLoading ? (
                  <CameraComponent
                    loading={(e) => setProfilePicLoading(e)}
                    update={(img) => {
                      setImage(img);
                    }}
                  >
                    <View
                      style={[
                        // styles().mt10,
                        styles().justifyCenter,
                        styles().alignCenter,
                        styles().br5,
                        styles().bw1,
                        styles().wh40px,
                        {
                          borderStyle: "dashed",
                          borderColor: currentTheme.textColor,
                        },
                      ]}
                    >
                      {profilePicLoading ? (
                        <ActivityIndicator
                          color={currentTheme.themeBackground}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="image-plus"
                          size={20}
                          color={currentTheme.textColor}
                        />
                      )}
                    </View>
                  </CameraComponent>
                ) : (
                  <ActivityIndicator color={currentTheme.themeBackground} />
                )}
              </View>
            </View>
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
