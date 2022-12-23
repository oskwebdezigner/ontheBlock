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
import Layout from "../../Component/Layout/Layout";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";

const { width, height } = Dimensions.get("window");

export default function InventorySingleList(props) {
  const inventory = props.route.params.inventoryListing;
  const property = props.route.params.property;
  console.log("inventory ====>>>>>>", property);

  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={`${inventory?.category?.name?.toUpperCase()}`}
      style={[styles().ph0]}
    >
      <View style={[styles().flex, { marginHorizontal: width * 0.04 }]}>
        <FlatList
          data={inventory?.inventories}
          bounces={false}
          numColumns={2}
          ListHeaderComponent={<View style={styles().pt30} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: InventoryCategoryTitle, index }) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
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
                          // shadowColor: "#000",
                          // shadowOffset: {
                          //   width: 0,
                          //   height: 2,
                          // },
                          // shadowOpacity: 0.25,
                          // shadowRadius: 3.84,
                          // elevation: 5,
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
                </View>
                <Text
                  style={[
                    styles().fs12,
                    styles().fw400,
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
        <ThemeButton
          onPress={() =>
            props.navigation.navigate("InventoryAddCategory", {
              inventory_id: inventory.category._id,
              inventory_name: inventory.category.name,
              property: property,
            })
          }
          Title={"Add New Inventory"}
        />
      </View>
    </Layout>
  );
}
