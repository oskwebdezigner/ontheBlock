import React, { useContext, useState, useCallback } from "react";
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
  LayoutAnimation,
  UIManager,
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
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";

import Spinner from "../../Component/Spinner/Spinner";

import RangeSlider, { Slider } from "react-native-range-slider-expo";
import Multiselect from "../../Component/Multiselect/Multiselect";
import { ScrollView } from "react-native-gesture-handler";
import CameraComponent from "../../Component/CameraComponent/CameraComponent";
import MultipleImagePicker from "../../Component/CameraComponent/MultipleImagePicker";
import { ImageBackground } from "react-native-web";
import {
  uploadImageToCloudinary,
  uploadImageToImageKit,
} from "../../Component/CameraComponent/CloudUpload";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { addInventory, categories } from "../../apollo/server";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import UserContext from "../../context/User/User";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import fontStyles from "../../utils/fonts/fontStyles";

const { width, height } = Dimensions.get("window");

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function InventoryAddCategory(props) {
  const ADD_INVENTORY = gql`
    ${addInventory}
  `;
  const CATEGORIES = gql`
    ${categories}
  `;
  const user = useContext(UserContext);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  let { inventory_name, inventory_id, property } = props?.route?.params;
  const [ItemCat, setItemCat] = useState("");

  const [ItemName, setItemName] = useState("");
  const [ItemNameError, setItemNameError] = useState(false);

  const [ItemBrand, setItemBrand] = useState("");
  const [ItemBrandError, setItemBrandError] = useState(false);

  const [ItemModel, setItemModel] = useState("");
  const [ItemModelError, setItemModelError] = useState(false);

  const [ItemSerial, setItemSerial] = useState("");
  const [ItemSerialError, setItemSerialError] = useState(false);

  const [ItemDocName, setItemDocName] = useState("");
  const [ItemDocNameError, setItemDocNameError] = useState(false);

  const [profilePicLoading, setProfilePicLoading] = useState(false);

  const [profilePic, setProfilePic] = useState("");

  const [category, setCategory] = useState("");
  const [showCategory, setShowCategory] = useState(false);

  const [subCategory, setSubCategory] = useState("");
  const [showSubCategory, setShowSubCategory] = useState(false);

  const [Loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  let personalitem_id = "63a1b5a3bbe7959b45cf154f";
  const { loading, error, data, refetch } = useQuery(CATEGORIES, {
    variables: {
      options: {
        limit: 10000,
      },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ categories }) => {
      // console.log("categories=====>", categories);
    },
    onError: (err) => {
      console.log("error in categories :", err);
    },
  });

  const setImage = async (image) => {
    // await uploadImageToCloudinary(image).then((img) => {
    //   setImages((previmgs) => [...previmgs, img]);
    // });

    await uploadImageToImageKit(image).then((img) => {
      setImages((previmgs) => [...previmgs, img.url]);
    });
  };

  const deleteImage = async (i) => {
    let newArr = [...images];
    newArr.splice(i, 1);
    setImages(() => [...newArr]);
  };

  const [mutate, { client }] = useMutation(ADD_INVENTORY, {
    onCompleted,
    onError,
  });

  async function onCompleted(data) {
    try {
      FlashMessage({ msg: "Inventory Added!", type: "success" });
      console.log("addInventory res :", data.addInventory);
      props.navigation.navigate("InventoryCategoryList");
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
    console.log("addInventory error  :", error);
  }
  async function AddNewInventory() {
    let status = true;
    if (category === "") {
      FlashMessage({ msg: "Select Category!", type: "warning" });
      status = false;
      return;
    }

    // setSubCategory("63a1b5a3bbe7959b45cf154f");

    if (category._id !== personalitem_id) {
      if (subCategory === "") {
        FlashMessage({ msg: "Select Item Subcategory!", type: "warning" });
        status = false;
        return;
      }
    }
    if (ItemName === "") {
      setItemNameError(true);
      FlashMessage({ msg: "Enter Item Name!", type: "warning" });
      status = false;
      return;
    }
    if (status) {
      let data = {
        inputInventory: {
          added_by: user?._id,
          brand: ItemBrand,
          // description: null,
          images: images,
          // is_active: null,
          // mainCatgeory: mainCatgeory._id,
          mainCatgeory: category._id,
          model_no: ItemModel,
          name: ItemName,
          property: property?._id,
          serail_no: ItemSerial,
          // type: inventory_id ? inventory_id : ItemCat,
          // type: ItemCat[0],
          type:
            category._id !== personalitem_id
              ? subCategory._id
              : personalitem_id,
        },
      };
      console.log("new added item data :", data);
      setLoading(true);
      await mutate({
        variables: data,
      });
    }
  }
  // let mainCatgeory = data?.categories?.results?.find((item) => {
  //   let subs = item.subCategories.find((find) => {
  //     return find._id === ItemCat[0];
  //   });
  //   return subs;
  // });

  // console.log("mainCatgeory====>", mainCatgeory);

  // console.log(
  //   "subCateogory====>",
  //   mainCatgeory?.subCategories?.find((item) => {
  //     return item._id === ItemCat[0];
  //   })
  // );
  // console.log("here your go:", subCategory);
  console.log("here your go:", category);
  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"Item Details"}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles().flex}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* <View style={[styles().flex, styles().mt30]}></View> */}
          <TouchableOpacity
            onPress={() => {
              setShowCategory(!showCategory);
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
            }}
            style={[
              styles().br10,
              styles().mt15,
              styles().bw1,
              styles().w100,
              styles().pv5,
              { borderColor: currentTheme.cEFEFEF },
            ]}
          >
            <View
              style={[
                styles().flexRow,
                styles().justifyBetween,
                styles().alignCenter,
                styles().pall10,
                styles().w100,
              ]}
            >
              <Text
                style={[
                  styles().fs12,
                  styles().fw600,
                  { color: currentTheme.black },
                ]}
              >
                {category?.name ? category?.name : "Select Category..."}
              </Text>
              <MaterialIcons
                name={
                  showCategory ? "keyboard-arrow-up" : "keyboard-arrow-down"
                }
                size={20}
                color={currentTheme.black}
              />
            </View>
            {showCategory ? (
              <View>
                {data?.categories?.results?.map((item, i, arr) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() => {
                        setCategory(item);
                        setSubCategory("");
                        setShowCategory(false);
                        LayoutAnimation.configureNext(
                          LayoutAnimation.Presets.easeInEaseOut
                        );
                      }}
                      style={[
                        styles().mh10,
                        {
                          borderColor: currentTheme.cEFEFEF,
                          borderBottomWidth: arr?.length - 1 === i ? 0 : 0.5,
                          paddingVertical: 8,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles().fs12,
                          styles().fw400,
                          { color: currentTheme.black },
                        ]}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </TouchableOpacity>

          {category?.name ? (
            <TouchableOpacity
              onPress={() => {
                setShowSubCategory(!showSubCategory);
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
              }}
              style={[
                styles().br10,
                styles().bw1,
                styles().mt15,
                styles().w100,
                styles().pv5,
                { borderColor: currentTheme.cEFEFEF },
              ]}
            >
              <View
                style={[
                  styles().flexRow,
                  styles().justifyBetween,
                  styles().alignCenter,
                  styles().pall10,
                  styles().w100,
                ]}
              >
                <Text
                  style={[
                    styles().fs12,
                    styles().fw600,
                    { color: currentTheme.black },
                  ]}
                >
                  {subCategory?.name
                    ? subCategory?.name
                    : "Select Sub Category..."}
                </Text>
                <MaterialIcons
                  name={
                    showSubCategory
                      ? "keyboard-arrow-up"
                      : "keyboard-arrow-down"
                  }
                  size={20}
                  color={currentTheme.black}
                />
              </View>
              {showSubCategory ? (
                <View>
                  {category?.subCategories?.map((item, i, arr) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          setSubCategory(item);
                          setShowSubCategory(false);
                          LayoutAnimation.configureNext(
                            LayoutAnimation.Presets.easeInEaseOut
                          );
                        }}
                        style={[
                          styles().mh10,
                          {
                            borderColor: currentTheme.cEFEFEF,
                            borderBottomWidth: arr?.length - 1 === i ? 0 : 0.5,
                            paddingVertical: 8,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles().fs12,
                            styles().fw400,
                            { color: currentTheme.black },
                          ]}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </TouchableOpacity>
          ) : null}

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
              Item Category
            </Text>

            <SectionedMultiSelect
              styles={{
                button: {
                  backgroundColor: currentTheme.themeBackground,
                },
                modalWrapper: {
                  justifyContent: "center",
                },
                container: {
                  // flex: 0.25,
                },
                selectToggle: [
                  {
                    paddingTop: 5,
                    // paddingBottom:20,
                    // backgroundColor:currentTheme.black,
                    paddingLeft: 15,
                    height: 40,
                    justifyContent: "flex-end",
                    // borderWidth:2
                  },
                ],
                selectToggleText: {
                  fontFamily: fontStyles.PoppinsRegular,
                  fontSize: 12,
                  color: currentTheme.black,
                  // borderWidth:2,
                  // height:'100%',
                },
                itemText: {
                  paddingTop: 10,
                  fontSize: 14,
                  fontWeight: "400",
                  fontFamily: fontStyles.PoppinsRegular,
                },
              }}
              showCancelButton={true}
              hideSearch={true}
              items={data?.categories?.results}
              selectToggleIconComponent={
                <AntDesign
                  name="caretdown"
                  size={14}
                  color={currentTheme.black}
                  style={{ right: 10 }}
                />
              }
              IconRenderer={MaterialIcons}
              uniqueKey="_id"
              displayKey="name"
              subKey={"subCategories"}
              single={true}
              selectText={"Select item category..."}
              showDropDowns={true}
              readOnlyHeadings={true}
              onSelectedItemsChange={(item) => {
                console.log("on seleted change :", item);
                setItemCat(item);
              }}
              selectedItems={ItemCat}
            />
          </View> */}

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
              Category Picture
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
                      <View style={{}}>
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
                            size={20}
                            name={"circle-with-cross"}
                          />
                        </TouchableOpacity>
                        <View
                          key={i}
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
                      <MaterialCommunityIcons
                        name="image-plus"
                        size={20}
                        color={currentTheme.textColor}
                      />
                    </View>
                  </CameraComponent>
                ) : (
                  <ActivityIndicator color={currentTheme.themeBackground} />
                )}
              </View>
            </View>
          </View>

          <View style={[styles().mt35, styles().mb20]}>
            {Loading ? (
              <Spinner />
            ) : (
              <ThemeButton onPress={() => AddNewInventory()} Title={"Add"} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}
