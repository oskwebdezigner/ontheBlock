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
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import ImageView from "react-native-image-viewing";
import UserContext from "../../context/User/User";
import { inventories } from "../../apollo/server";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const { width, height } = Dimensions.get("window");

export default function InventorySingleList(props) {
  const INVENTORIES = gql`
    ${inventories}
  `;
  const user = useContext(UserContext);
  const inventory = props.route.params.inventoryListing;
  const { subcategory, subCategories, property, category } = props.route.params;
  const { loading, error, data, refetch } = useQuery(INVENTORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      filters: {
        added_by: user?._id,
        type: subcategory?._id,
      },
    },
    onCompleted: ({ inventories }) => {
      console.log("inventories res >>>>>>>>>>>>>>>>>", data);
    },
    onError: (err) => {
      console.log("error in inventories :", err);
    },
  });
  console.log("inventory ====>>>>>>", inventory);

  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [imageLists, setImageLists] = useState([]);
  const [visible, setIsVisible] = useState(false);

  console.log("imageLists", imageLists);

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={`${subcategory?.name?.toUpperCase()}`}
      style={[styles().ph0]}
      loading={loading}
    >
      <ImageView
        images={imageLists}
        imageIndex={0}
        presentationStyle={"fullScreen"}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <View style={[styles().flex, { marginHorizontal: width * 0.04 }]}>
        <FlatList
          // data={inventory?.inventories}
          data={data?.inventories?.results}
          bounces={false}
          numColumns={2}
          ListHeaderComponent={<View style={styles().pt30} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: InventoryCategoryTitle, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (InventoryCategoryTitle.images.length !== 0) {
                    // alert('here')
                    let babuji = [];
                    InventoryCategoryTitle.images.map((d) =>
                      babuji.push({ uri: d })
                    );
                    setImageLists(babuji);
                    setIsVisible(true);
                  }
                }}
                activeOpacity={0.5}
                key={index}
                style={[
                  styles().mb20,
                  {
                    width: width * 0.43,
                    marginRight: index % 2 === 0 ? width * 0.04 : 0,
                  },
                ]}
              >
                <View
                  style={[
                    styles().w100,
                    styles().mb10,
                    styles().overflowH,
                    styles().h130px,
                    styles().br10,
                    styles().boxpeshadowCart,

                    { backgroundColor: currentTheme.bodyBg },
                  ]}
                >
                  {InventoryCategoryTitle?.images.length !== 0 ? (
                    <Image
                      source={{ uri: InventoryCategoryTitle?.images[0] }}
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
                        category: inventory?.category,
                        subCategories: subCategories,
                        mainCatgeory: category,
                      })
                    }
                    style={[
                      styles().top10,
                      styles().alignCenter,
                      styles().justifyCenter,
                      styles().wh20px,
                      styles().br5,
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
                      style={[styles().fs12, styles(currentTheme).bgTextWhite]}
                    >
                      {InventoryCategoryTitle?.images?.length !== 0 ? 1 : 0}/
                      {InventoryCategoryTitle?.images
                        ? InventoryCategoryTitle?.images?.length
                        : 0}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles().fs12,
                    styles().fw600,
                    { color: currentTheme.black },
                  ]}
                >
                  {InventoryCategoryTitle.name?.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<View style={styles().mb100} />}
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
        {/* <ThemeButton
          onPress={() =>
            props.navigation.navigate("InventoryAddCategory", {
              inventory_id: inventory.category._id,
              inventory_name: inventory.category.name,
              property: property,
            })
          }
          Title={"Add New Inventory"}
        /> */}
      </View>
    </Layout>
  );
}
