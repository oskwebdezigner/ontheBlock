import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  Animated,
  Dimensions,
  Modal,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import {
  Ionicons,
  Foundation,
  Entypo,
  FontAwesome5,
  Feather,
  Octicons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import { deleteProperty } from "../../apollo/server";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import Spinner from "../../Component/Spinner/Spinner";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
const { width, height } = Dimensions.get("window");

export default function SinglePropertyListing(props) {
  const DELETE_PROPERTY = gql`
    ${deleteProperty}
  `;
  const property = props?.route?.params?.singleList;
  // const propertyID = props?.route?.params?.propertyID;
  console.log("single Property Listing :", property);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [Loading, setLoading] = useState(false);

  const [mutate, { client }] = useMutation(DELETE_PROPERTY, {
    onCompleted,
    onError,
  });
  async function onCompleted(data) {
    try {
      console.log("deleteProperty res :", data.deleteProperty);
      FlashMessage({ msg: "Property Created!", type: "success" });
      SetmodalVisible(false);
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
    console.log("deleteProperty error  :", error);
  }

  const SinglePropertyList = [
    {
      id: 0,
      SingleListIcon: require("../../assets/images/SinglePropertyList-img1.png"),
      SingleListName: "Property Data",
      navigateTo: "PropertyData",
    },
    {
      id: 1,
      SingleListIcon: require("../../assets/images/SinglePropertyList-img2.png"),
      SingleListName: "Inventory",
      navigateTo: "InventoryCategoryList",
    },
    {
      id: 2,
      SingleListIcon: require("../../assets/images/SinglePropertyList-img3.png"),
      SingleListName: "Add New Documents",
      // SingleListName: "Document",
      navigateTo: "DocumentListing",
    },
    {
      id: 3,
      SingleListIcon: require("../../assets/images/SinglePropertyList-img4.png"),
      SingleListName: "Schedule Task",
      navigateTo: "AddTask",
    },
    {
      id: 4,
      SingleListIcon: require("../../assets/images/SinglePropertyList-img5.png"),
      SingleListName: "My Handypersons",
      // SingleListName: "My Handymen",
      navigateTo: "MyHandymen",
    },
    {
      id: 5,
      SingleListIcon: require("../../assets/images/SinglePropertyList-img6.png"),
      SingleListName: "Finance",
    },
  ];
  const [modalVisible, SetmodalVisible] = useState(false);

  function DeletePropertyModal() {
    return (
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={[styles().flex, styles().alignCenter, styles().justifyCenter]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => SetmodalVisible(false)}
            style={[
              styles().posAbs,
              styles().top0,
              styles().bottom0,
              styles().left0,
              styles().right0,
              { backgroundColor: currentTheme.modalShadow },
            ]}
          />
          <View style={[styles().alignCenter, styles().justifyCenter]}>
            <View
              style={[
                styles().bgWhite,
                styles().pt25,
                // styles().alignCenter,
                styles().justifyCenter,
                styles().br10,
                styles().pb25,
                styles().ph15,
                { width: width * 0.8 },
              ]}
            >
              <View style={[styles().alignCenter]}>
                <AntDesign
                  name="warning"
                  size={40}
                  color={currentTheme.dangerRed}
                />
                <Text
                  style={[
                    styles().fs16,
                    styles().fontSemibold,
                    styles().textCenter,
                    styles().mt15,
                    {
                      color: currentTheme.black,
                      // marginBottom: 20,
                    },
                  ]}
                >
                  Are you sure you want to delete this property
                </Text>
              </View>

              {Loading ? (
                <ActivityIndicator
                  size={"small"}
                  color={currentTheme.themeBackground}
                />
              ) : (
                <ThemeButton
                  onPress={() => DeleteProperty()}
                  Title={"Delete Property"}
                  StyleText={{ color: currentTheme.white, fontSize: 14 }}
                  Style={[
                    styles().mt15,
                    styles().mb15,
                    styles().h45px,
                    {
                      backgroundColor: currentTheme.dangerRed,
                      borderWidth: 0,
                    },
                  ]}
                />
              )}
              <ThemeButton
                Style={[styles().h45px]}
                StyleText={{ fontSize: 14 }}
                onPress={() => SetmodalVisible(false)}
                Title={"Back"}
                withoutBg={true}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  async function DeleteProperty() {
    setLoading(true);
    await mutate({
      variables: {
        deletePropertyInput: {
          id: property?._id,
        },
      },
    });
  }

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={
        property?.name ? property?.name?.toUpperCase() : "My Properties"
      }
    >
      <View style={[styles().flex, styles().pb20]}>
        <FlatList
          data={SinglePropertyList}
          showsVerticalScrollIndicator={false}
          bounces={false}
          ListHeaderComponent={<View style={styles().pt30} />}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  item.navigateTo &&
                  props.navigation.navigate(item.navigateTo, {
                    property: property,
                    pageTitle: property.name,
                  })
                }
                style={[
                  styles().flexRow,
                  styles().justifyBetween,
                  styles().ph25,
                  styles().h80px,
                  styles().flex,
                  styles().bw1,
                  styles().alignCenter,
                  {
                    borderColor: "transparent",
                    borderBottomColor: currentTheme.cEFEFEF,
                  },
                ]}
              >
                <View style={[styles().flexRow, styles().alignCenter]}>
                  <View
                    style={[styles().wh30px, styles().overflowH, styles().mr20]}
                  >
                    <Image
                      source={item.SingleListIcon}
                      resizeMode="contain"
                      style={[
                        styles().wh100,
                        { tintColor: index === 5 && currentTheme.BCBCBC },
                      ]}
                    />
                  </View>
                  <View>
                    <Text
                      style={[
                        styles().fs16,
                        styles().lh18,
                        styles().fw600,
                        {
                          color:
                            index === 5
                              ? currentTheme.BCBCBC
                              : currentTheme.black,
                        },
                      ]}
                    >
                      {item.SingleListName}
                    </Text>
                    {index === 5 && (
                      <Text
                        style={[
                          styles().fs9,
                          styles().fw400,
                          { color: currentTheme.BCBCBC },
                        ]}
                      >
                        *Features Coming Soon
                      </Text>
                    )}
                  </View>
                </View>
                {index === 0 && (
                  <View
                    style={[
                      styles().w60px,
                      styles().alignCenter,
                      styles().justifyCenter,
                      styles().br30,
                      styles().h25px,
                      {
                        alignContent: "flex-end",
                        backgroundColor: currentTheme.themeBackground,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles().fs10,
                        styles().fontSemibold,
                        { color: currentTheme.black },
                      ]}
                    >
                      View
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* <ThemeButton
          Style={{
            backgroundColor: currentTheme.dangerRed,
            borderWidth: 0,
            height: 50,
          }}
          StyleText={{ color: currentTheme.white }}
          onPress={() => SetmodalVisible(true)}
          Title={"Delete Property"}
        /> */}
        <DeletePropertyModal />
      </View>
    </Layout>
  );
}
