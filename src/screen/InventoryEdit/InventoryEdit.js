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
  UIManager,
  LayoutAnimation,
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
  Entypo,
  MaterialIcons,
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
import {
  addFile,
  addFolder,
  categories,
  updateInventory,
  deleteInventory,
} from "../../apollo/server";
import {
  uploadImageToCloudinary,
  uploadImageToImageKit,
  uploadToImageKit,
} from "../../Component/CameraComponent/CloudUpload";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import * as DocumentPicker from "expo-document-picker";
import { useIsFocused } from "@react-navigation/native";
import UserContext from "../../context/User/User";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import fontStyles from "../../utils/fonts/fontStyles";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width, height } = Dimensions.get("window");

export default function InventoryEdit(props) {
  const CATEGORIES = gql`
    ${categories}
  `;
  const UPDATE_INVENTORY = gql`
    ${updateInventory}
  `;
  const ADD_FOLDER = gql`
    ${addFolder}
  `;
  const DELETE_INVENTORY = gql`
    ${deleteInventory}
  `;
  // console.log("props?.route?.params", props?.route?.params);
  let inventory_item = props?.route?.params.inventory_item;
  let categoryy = props?.route?.params.category;
  let subCategories = props?.route?.params.subCategories;
  let mainCatgeory = props?.route?.params.mainCatgeory;

  // console.log("inventory_item===>", inventory_item);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const user = useContext(UserContext);
  const isFocused = useIsFocused();
  const [Loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [ItemCat, setItemCat] = useState(
    inventory_item && inventory_item?.type ? inventory_item?.type?._id : ""
  );

  const [ItemName, setItemName] = useState("");
  const [ItemNameError, setItemNameError] = useState(false);

  const [ItemBrand, setItemBrand] = useState("");
  const [ItemBrandError, setItemBrandError] = useState(false);

  const [ItemModel, setItemModel] = useState("");
  const [ItemModelError, setItemModelError] = useState(false);

  const [ItemSerial, setItemSerial] = useState("");
  const [ItemSerialError, setItemSerialError] = useState(false);

  const [category, setCategory] = useState("");
  const [showCategory, setShowCategory] = useState(false);

  const [subCategory, setSubCategory] = useState("");
  const [showSubCategory, setShowSubCategory] = useState(false);

  const [images, setImages] = useState("");
  //   const [ItemDocName, setItemDocName] = useState("");
  //   const [ItemDocNameError, setItemDocNameError] = useState(false);
  const [imgLoader, setImgLoader] = useState(false);
  const [profilePicLoading, setProfilePicLoading] = useState(false);
  const [ItemDocName, setItemDocName] = useState("");
  const [ItemDocNameError, setItemDocNameError] = useState(false);
  const [Documentfile, setDocumentfile] = useState([]);

  const { loading, error, data, refetch } = useQuery(CATEGORIES, {
    variables: {
      options: {
        limit: 10000,
      },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ categories }) => {
      // console.log("categories =====>", categories);
    },
    onError: (err) => {
      console.log("error in categories :", err);
    },
  });
  const [mutate, { client }] = useMutation(UPDATE_INVENTORY, {
    onCompleted,
    onError,
  });

  async function onCompleted(data) {
    try {
      FlashMessage({ msg: "Inventory Updated!", type: "success" });
      props.navigation.navigate("InventoryCategoryList");
      console.log("updateInventory res :", data.updateInventory);
      // props.navigation.navigate("InventoryCategoryList");
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
    console.log("updateInventory error  :", error);
  }
  const [delete_inventory_mutate] = useMutation(DELETE_INVENTORY, {
    onCompleted: onCompleted_delete_inventory,
    onError: onError_delete_inventory,
  });

  async function onCompleted_delete_inventory(data) {
    try {
      FlashMessage({ msg: "Inventory Deleted!", type: "success" });
      setDeleteLoading(false);
      props.navigation.navigate("InventoryCategoryList");
      console.log("DELETE_INVENTORY res :", data.deleteInventory);
    } catch (e) {
      setDeleteLoading(false);
      console.log(e);
    } finally {
      setDeleteLoading(false);
    }
  }

  function onError_delete_inventory(error) {
    FlashMessage({ msg: error?.message?.toString(), type: "danger" });
    setDeleteLoading(false);
    console.log("DELETE_INVENTORY error  :", error);
  }

  const [addFolder_mutate, {}] = useMutation(ADD_FOLDER, {
    onCompleted: onCompleted_addFolder,
    onError: onError_addFolder,
  });

  async function onCompleted_addFolder(data) {
    try {
      FlashMessage({ msg: "Document Updated!", type: "success" });
      console.log("addFolder res :", data.addFolder);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function onError_addFolder(error) {
    FlashMessage({ msg: error?.message?.toString(), type: "danger" });
    setLoading(false);
    console.log("addFolder error  :", error);
  }

  console.log("inventory_item =======:", inventory_item);
  // console.log("mainCatgeory =======:", mainCatgeory);

  const setImage = async (image) => {
    // await uploadImageToCloudinary(image).then((img) => {
    //   setImages((previmgs) => [...previmgs, img]);
    // });
    await uploadImageToImageKit(image).then((img) => {
      setImages((previmgs) => [...previmgs, img.url]);
      setImgLoader(false);
    });
  };

  const deleteImage = async (i) => {
    let newArr = [...images];
    newArr.splice(i, 1);
    setImages(() => [...newArr]);
  };

  const addFile = async () => {
    let document = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: false,
    });
    if (document.type === "success") {
      setDocumentfile((prevfiles) => [...prevfiles, document]);
    }
  };

  useEffect(() => {
    let ctg = data?.categories?.results?.find((item) => {
      return item._id === mainCatgeory?._id;
    });
    console.log("ctg====>", ctg);

    let subctg = ctg?.subCategories?.find((item) => {
      console.log(item._id);
      return item._id === inventory_item?.type?._id;
    });
    console.log("subctg====>", subctg);

    setItemCat(inventory_item?.type._id);
    setItemName(inventory_item?.name);
    setItemBrand(inventory_item?.brand);
    setItemModel(inventory_item?.model_no);
    setItemSerial(inventory_item?.serail_no);
    setImages(inventory_item?.images);
    setCategory(ctg);
    setSubCategory(subctg);
    refetch();
  }, []);

  async function UpdateItem() {
    let status = true;
    // if (ItemCat === "") {
    //   FlashMessage({ msg: "Select Category!", type: "warning" });
    //   status = false;
    //   return;
    // }
    if (subCategory === "") {
      FlashMessage({ msg: "Select SubCategory!", type: "warning" });
      status = false;
      return;
    }

    if (status) {
      setLoading(true);
      let data = {
        updateInventoryId: inventory_item?._id,
        updateInventoryInput: {
          name: ItemName,
          serail_no: ItemSerial,
          model_no: inventory_item?.model_no,
          images: images,
          brand: ItemBrand,
          mainCatgeory: category?._id,
          type: subCategory?._id,
          // mainCatgeory: mainCatgeory?._id,
          // type: ItemCat,
          // added_by: user?._id,
        },
      };
      console.log("update data :", data);
      await mutate({
        variables: data,
      });
    }

    // let files = Documentfile.map((file) => {
    //   return file.uri;
    // });

    // if (Documentfile.length > 0 && ItemDocName === "") {
    //   FlashMessage({ msg: "Enter Document Name to Upload", type: "warning" });
    //   return;
    // }

    // if (Documentfile.length > 0 && ItemDocName !== "") {
    //   await addFolder_mutate({
    //     variables: {
    //       inputFolder: {
    //         files: files,
    //         name: ItemDocName,
    //         inventory: inventory_item?._id,
    //       },
    //     },
    //   });
    // }
  }

  // let ctg = category?.find((item) => {
  //   return item._id !== inventory_item?._id;
  // });

  // console.log('ctg===',ctg)

  // let ctg = data?.categories?.results?.find((item) => {
  //   console.log(item._id);
  //   return item._id === mainCatgeory?._id;
  //   // let subs = item.subCategories.find((find) => {
  //   //   return find._id === inventory_item?._id;
  //   // });
  //   // return subs;
  // });
  // console.log("ctg====>", ctg);

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"Item Details"}
    >
      <KeyboardAvoidingView style={styles().flex}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <Multiselect
              // ListItems={data?.categories?.results}
              ListItems={subCategories}
              SelectText={ctg?.name}
              value={ItemCat}
              setValue={(e) => setItemCat(e[0])}
            />
          </View> */}

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
                            size={15}
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
              {imgLoader ? <Spinner /> : null}
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
                    loading={(e) => {
                      setProfilePicLoading(e);
                    }}
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
          {/* <View style={styles().mt15}>
            <TextField
              keyboardType="default"
              onChangeText={(e) => {
                setItemDocNameError(false);
                setItemDocName(e);
              }}
              value={ItemDocName}
              label="Documents Name"
              errorText={ItemDocNameError}
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
              Upload Documents
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
              {Documentfile.map((file, i) => {
                return (
                  <View
                    key={i}
                    style={[
                      styles().mt10,
                      styles().justifyCenter,
                      styles().alignCenter,
                      styles().br5,
                      styles().bw1,
                      styles().wh40px,

                      {
                        borderStyle: "dashed",
                        borderColor: currentTheme.textColor,
                        marginLeft: 10,
                        padding: 5,
                      },
                    ]}
                  >
                    <Ionicons
                      name="document-attach"
                      color={currentTheme.themeBackground}
                      size={20}
                    />
                    <Text style={{ fontSize: 7 }} numberOfLines={1}>
                      {file.name}
                    </Text>
                  </View>
                );
              })}
              <TouchableOpacity
                onPress={async () => addFile()}
                style={[
                  styles().mt10,
                  styles().justifyCenter,
                  styles().alignCenter,
                  styles().br5,
                  styles().bw1,
                  styles().wh40px,
                  {
                    top: -3,
                    borderStyle: "dashed",
                    borderColor: currentTheme.textColor,
                    marginLeft: 10,
                  },
                ]}
              >
                <AntDesign
                  name="addfile"
                  color={currentTheme.c727477}
                  size={20}
                />
              </TouchableOpacity>
            </View>

            <View style={[styles().ml15, styles().mt10]}>
              <Text
                style={[
                  styles().fs11,
                  styles().fw300,
                  { color: currentTheme.lightRed },
                ]}
              >
               You Can Upload pdf, jpeg or png
              </Text>
            </View>
          </View> */}
          <View style={[styles().mt35, styles().mb20]}>
            {Loading ? (
              <Spinner />
            ) : (
              <ThemeButton onPress={() => UpdateItem()} Title={"Save"} />
            )}
            {deleteLoading ? (
              <Spinner />
            ) : (
              <ThemeButton
                Style={{
                  backgroundColor: currentTheme.dangerRed,
                  borderWidth: 0,
                  height: 50,
                  marginTop: 15,
                }}
                StyleText={{ color: currentTheme.white }}
                onPress={() => {
                  setDeleteLoading(true);
                  delete_inventory_mutate({
                    variables: {
                      deleteInventoryInput: {
                        id: inventory_item?._id,
                      },
                    },
                  });
                }}
                Title={"Delete Item"}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}
