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
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import RangeSlider, { Slider } from "react-native-range-slider-expo";
import Multiselect from "../../Component/Multiselect/Multiselect";
import { ScrollView } from "react-native-gesture-handler";
import CameraComponent from "../../Component/CameraComponent/CameraComponent";
import MultipleImagePicker from "../../Component/CameraComponent/MultipleImagePicker";
import { ImageBackground } from "react-native-web";
import { categories } from "../../apollo/server";
import { uploadImageToCloudinary } from "../../Component/CameraComponent/CloudUpload";

const { width, height } = Dimensions.get("window");

export default function InventoryEdit(props) {
  const CATEGORIES = gql`
    ${categories}
  `;
  let inventory_item = props?.route?.params.inventory_item;
  let category = props?.route?.params.category;
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [ItemCat, setItemCat] = useState("");

  const [ItemName, setItemName] = useState("");
  const [ItemNameError, setItemNameError] = useState(false);

  const [ItemBrand, setItemBrand] = useState("");
  const [ItemBrandError, setItemBrandError] = useState(false);

  const [ItemModel, setItemModel] = useState("");
  const [ItemModelError, setItemModelError] = useState(false);

  const [ItemSerial, setItemSerial] = useState("");
  const [ItemSerialError, setItemSerialError] = useState(false);

  //   const [ItemDocName, setItemDocName] = useState("");
  //   const [ItemDocNameError, setItemDocNameError] = useState(false);

  const [profilePicLoading, setProfilePicLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  const { loading, error, data, refetch } = useQuery(CATEGORIES, {
    variables: {
      options: {
        limit: 10000,
      },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ categories }) => {},
    onError: (err) => {
      console.log("error in categories :", err);
    },
  });

  console.log(
    "inventory_item =======:",
    inventory_item,
    "category :",
    category
  );
  //   console.log(">>>>>>>", data?.categories?.results);
  console.log(">>>>>>>", ItemCat[0]);

  const setImage = async (image) => {
    uploadImageToCloudinary(image).then((img) => {
      setProfilePic(img);
    });
  };
  useEffect(() => {
    setItemCat(
      category?._id ? category?._id : data?.categories?.results[0]?._id
    );
    setItemName(inventory_item?.name);
    setItemBrand(inventory_item?.brand);
    setItemModel(inventory_item?.model_no);
    setItemSerial(inventory_item?.serial_no);
  }, [inventory_item]);

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"Item Details"}
    >
      <KeyboardAvoidingView style={styles().flex}>
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
              Item Category
            </Text>
            <Multiselect
              ListItems={data?.categories?.results}
              SelectText={ItemCat.name ? ItemCat.name : category?.name}
              value={ItemCat}
              setValue={setItemCat}
            />
          </View>

          <View style={styles().mt15}>
            <TextField
              keyboardType="default"
              onChangeText={(e) => {
                setItemNameError(false);
                setItemName(e);
              }}
              value={ItemName}
              label="Item Name"
              errorText={ItemNameError}
              autoCapitalize="none"
              style
            />
          </View>

          <View style={styles().mt15}>
            <TextField
              keyboardType="default"
              onChangeText={(e) => {
                setItemBrandError(false);
                setItemBrand(e);
              }}
              value={ItemBrand}
              label="Brand (optional)"
              errorText={ItemBrandError}
              autoCapitalize="none"
              style
            />
          </View>

          <View style={styles().mt15}>
            <TextField
              keyboardType="default"
              onChangeText={(e) => {
                setItemModelError(false);
                setItemModel(e);
              }}
              value={ItemModel}
              label="Model No (optional)"
              errorText={ItemModelError}
              autoCapitalize="none"
              style
            />
          </View>

          <View style={styles().mt15}>
            <TextField
              keyboardType="default"
              onChangeText={(e) => {
                setItemSerialError(false);
                setItemSerial(e);
              }}
              value={ItemSerial}
              label="Serial No (optional)"
              errorText={ItemSerialError}
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
              Item Pictures (optional)
            </Text>

            <View
              style={[
                styles().flexRow,
                styles().ml10,
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
                  {profilePic !== "" ? (
                    <View
                      style={[
                        // styles().mt10,
                        styles().justifyCenter,
                        styles().alignCenter,
                        styles().br5,
                        styles().bw1,
                        styles().wh40px,
                        {
                          top: -3,
                          borderStyle: "dashed",
                          borderColor: currentTheme.textColor,
                        },
                      ]}
                    >
                      <Image
                        source={{ uri: profilePic }}
                        style={styles().wh100}
                      />
                      {/* <EvilIcons name="image" size={30} color={currentTheme.iconColor} /> */}
                    </View>
                  ) : (
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
                      <EvilIcons
                        name="image"
                        size={20}
                        color={currentTheme.textColor}
                      />
                    </View>
                  )}
                </CameraComponent>
              ) : (
                <ActivityIndicator color={currentTheme.themeBackground} />
              )}
              <View
                style={[
                  styles().ml5,
                  styles().mt10,
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
                <EvilIcons
                  name="image"
                  size={20}
                  color={currentTheme.textColor}
                />
              </View>
              <View
                style={[
                  styles().ml10,
                  styles().mt10,
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
                <EvilIcons
                  name="image"
                  size={20}
                  color={currentTheme.textColor}
                />
              </View>
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
