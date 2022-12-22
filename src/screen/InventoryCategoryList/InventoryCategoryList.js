import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Platform,
  Animated,
  Dimensions,
  Modal,
  ImageBackground,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image,
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
  MaterialIcons,
} from "@expo/vector-icons";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Layout from "../../Component/Layout/Layout";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import { getInventoryByCategory } from "../../apollo/server";
import { useIsFocused } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function InventoryCatList(props) {
  const GET_INVENTORY_BY_CATEGORY = gql`
    ${getInventoryByCategory}
  `;
  const property = props?.route?.params?.property;
  const _scrollView = useRef();
  const [page, Setpage] = useState(1);
  const [viewImage, setViewImage] = useState("");
  const [InvModalVisible, SetInvModalVisible] = useState(false);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const SliderWidth = width * 0.8;
  const SliderHeight = height * 0.5;

  const { loading, error, data, refetch } = useQuery(
    GET_INVENTORY_BY_CATEGORY,
    {
      variables: {
        propertyId: property?._id,
      },
    },
    {
      fetchPolicy: "cache-and-network",
      onCompleted: ({ getInventoryByCategory }) => {},
      onError: (err) => {
        console.log("error in getInventoryByCategory :", err);
      },
    }
  );

  // console.log("inventory=========>", data?.getInventoryByCategory);
  function handleOnScroll(event) {
    //calculate screenIndex by contentOffset and screen width
    Setpage(
      parseInt(
        event.nativeEvent.contentOffset.x / Dimensions.get("window").width
      )
    );
  }
  const isFocused = useIsFocused();
  useEffect(() => {
    refetch();
  }, [isFocused]);

  return (
    <Layout
      loading={loading}
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={property?.name ? property?.name?.toUpperCase() : "My Stuff"}
      style={[styles().ph0, styles().pl20, { backgroundColor: "transparent" }]}
    >
      <View style={[styles().flex]}>
        <FlatList
          data={data?.getInventoryByCategory}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<View style={styles().pt30} />}
          bounces={false}
          renderItem={({ item, index }) => {
            // console.log("========>", item?.inventories[index]?.images[index]);
            // console.log(`=====${index}===>`, item?.inventories);
            // console.log(`=====${"viewimage"}===>`, viewImage);
            return (
              <View
                key={index}
                style={[styles().justifyBetween, styles().mb25, styles().flex]}
              >
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={InvModalVisible}
                >
                  <View
                    style={[
                      styles().flex,
                      styles().alignCenter,
                      styles().justifyCenter,
                    ]}
                  >
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        SetInvModalVisible(!InvModalVisible);
                      }}
                      style={[
                        styles().posAbs,
                        styles().top0,
                        styles().bottom0,
                        styles().left0,
                        styles().right0,
                        { backgroundColor: currentTheme.InventoryShadow },
                      ]}
                    />
                    <View style={{ width: SliderWidth, height: SliderHeight }}>
                      <ScrollView
                        pagingEnabled
                        horizontal
                        onScroll={(e) => handleOnScroll(e)}
                        scrollEventThrottle={5}
                        ref={_scrollView}
                      >
                        <View
                          style={{
                            height: SliderHeight,
                            width: SliderWidth,
                            borderRadius: 10,
                          }}
                        >
                          {item?.inventories[index]?.images?.length !== 0 ? (
                            <Image
                              source={{
                                uri: item?.inventories[viewImage]?.images[0],
                              }}
                              style={{
                                height: "100%",
                                width: "100%",
                                borderRadius: 10,
                              }}
                            />
                          ) : null}
                        </View>
                        <View
                          style={[
                            styles().alignCenter,
                            styles().flexRow,
                            styles().zIndex2,
                            styles().posAbs,
                            styles().justifyBetween,
                            styles().flex,
                            styles().left10,
                            styles().right10,
                            { top: SliderHeight / 2 },
                          ]}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              page > 0 ? Setpage(page - 1) : null;
                            }}
                          >
                            <FontAwesome
                              name="arrow-left"
                              size={20}
                              color={
                                page > 0
                                  ? currentTheme.black
                                  : currentTheme.SliderDots
                              }
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              page <
                              item?.inventories[index]?.images?.length - 1
                                ? Setpage(page + 1)
                                : null;
                            }}
                          >
                            <FontAwesome
                              name="arrow-right"
                              size={20}
                              color={
                                page <
                                item?.inventories[index]?.images?.length - 1
                                  ? currentTheme.black
                                  : currentTheme.SliderDots
                              }
                            />
                          </TouchableOpacity>
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                </Modal>
                <View
                  style={[
                    styles().flexRow,
                    styles().pr20,
                    styles().mb20,
                    styles().justifyBetween,
                    styles().alignCenter,
                  ]}
                >
                  <View style={[styles().flexRow, styles().alignCenter]}>
                    <View
                      style={[
                        styles().wh30px,
                        styles().overflowH,
                        styles().mr5,
                      ]}
                    >
                      <Image
                        source={{ uri: item?.category?.image }}
                        resizeMode="contain"
                        style={styles().wh100}
                      />
                    </View>
                    <Text
                      style={[
                        styles().fs16,
                        styles().lh18,
                        styles().fw600,
                        { color: currentTheme.black },
                      ]}
                    >
                      {item.category.name}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("InventorySingleList", {
                          inventoryListing: item,
                          category: item?.category,
                          property: property,
                        })
                      }
                    >
                      <Text
                        style={[
                          styles().fs13,
                          styles().fw400,
                          { color: currentTheme.textColor },
                        ]}
                      >
                        See All
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <FlatList
                  data={item.inventories}
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item: InventoryCategoryTitle, index: i }) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          setViewImage(i);
                          SetInvModalVisible(true);
                          // console.log(
                          //   `=====${i}===>`,
                          //   item?.inventories[viewImage].images
                          // );
                        }}
                        style={[
                          {
                            width: width * 0.4,
                            marginRight: width * 0.03,
                            marginLeft: 5,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles().w100,
                            styles().mb10,
                            // styles().overflowH,
                            styles().h130px,
                            styles().br10,
                            styles().boxpeshadowCart,

                            { backgroundColor: currentTheme.bodyBg },
                          ]}
                        >
                          {InventoryCategoryTitle?.images?.length !== 0 ? (
                            <Image
                              source={{
                                uri: InventoryCategoryTitle?.images[0],
                              }}
                              resizeMode="contain"
                              style={[styles().wh100]}
                            />
                          ) : (
                            <View
                              style={[
                                styles().wh100,
                                styles().br10,

                                {
                                  backgroundColor: currentTheme.white,
                                  borderWidth: 0.5,
                                  borderColor: currentTheme.BCBCBC,
                                  alignItems: "center",
                                  justifyContent: "center",
                                  shadowColor: "#000",
                                  shadowOffset: {
                                    width: 0,
                                    height: 2,
                                  },
                                  shadowOpacity: 0.25,
                                  shadowRadius: 3.84,
                                  elevation: 5,
                                },
                              ]}
                            >
                              <Ionicons
                                name="image"
                                size={50}
                                color={currentTheme.BCBCBC}
                              />
                              <Text
                                style={{
                                  color: currentTheme.BCBCBC,
                                  fontWeight: "bold",
                                  fontSize: 12,
                                }}
                              >
                                No Image
                              </Text>
                            </View>
                          )}
                          <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate("InventoryEdit", {
                                inventory_item: InventoryCategoryTitle,
                                category: item?.category,
                              })
                            }
                            style={[
                              styles().top5,
                              styles().alignCenter,
                              styles().justifyCenter,
                              // styles().wh20px,
                              styles().br5,
                              styles().pall5,
                              styles().right10,
                              styles().posAbs,
                              styles().bgWhite,
                            ]}
                          >
                            <MaterialIcons
                              name="edit"
                              size={16}
                              color={currentTheme.SliderDots}
                            />
                          </TouchableOpacity>
                          <View
                            style={[
                              styles().bottom10,
                              styles().ph10,
                              {
                                paddingVertical: 3,
                                backgroundColor: currentTheme.black,
                              },
                              styles().alignCenter,
                              styles().justifyCenter,
                              styles().br5,
                              styles().left10,
                              styles().posAbs,
                            ]}
                          >
                            <Text
                              style={[
                                styles().fs12,
                                styles(currentTheme).bgTextWhite,
                              ]}
                            >
                              {InventoryCategoryTitle?.images?.length !== 0
                                ? 1
                                : 0}
                              /
                              {InventoryCategoryTitle?.images
                                ? InventoryCategoryTitle?.images?.length
                                : 0}
                            </Text>
                          </View>
                        </View>
                        <Text
                          numberOfLines={2}
                          style={[
                            styles().fs12,
                            styles().fw400,
                            { color: currentTheme.black },
                          ]}
                        >
                          {InventoryCategoryTitle?.name?.toUpperCase()}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          // ListFooterComponent={
          //   <View style={styles().mb100}>
          //     <View
          //       style={[styles().flexRow, styles().mb20, styles().alignCenter]}
          //     >
          //       <View
          //         style={[styles().wh30px, styles().overflowH, styles().mr5]}
          //       >
          //         <Image
          //           source={require("../../assets/images/personal-items.png")}
          //           resizeMode="contain"
          //           style={styles().wh100}
          //         />
          //       </View>
          //       <Text
          //         style={[
          //           styles().fs16,
          //           styles().lh18,
          //           styles().fw600,
          //           { color: currentTheme.CACCD3 },
          //         ]}
          //       >
          //         Personal Items
          //       </Text>
          //     </View>
          //     <View
          //       style={[
          //         styles().bw1,
          //         styles().br5,
          //         styles().wh130px,
          //         styles().alignCenter,
          //         styles().justifyCenter,
          //         {
          //           borderColor: currentTheme.textColor,
          //           borderStyle: "dashed",
          //         },
          //       ]}
          //     >
          //       <Feather name="plus" size={40} color={currentTheme.textColor} />
          //     </View>
          //   </View>
          // }
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: currentTheme.textColor,
                    fontSize: 14,
                  }}
                >
                  No Inventory
                </Text>
              </View>
            );
          }}
        />
      </View>

      <View
        style={[
          styles().left20,
          styles().right20,
          styles().posAbs,
          styles().bottom20,
        ]}
      >
        <ThemeButton
          onPress={() =>
            props.navigation.navigate("InventoryAddCategory", {
              property: property,
            })
          }
          Title={"Add New Inventory"}
        />
      </View>
    </Layout>
  );
}
