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
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
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
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { folders, DeleteFolder } from "../../apollo/server";
import { useIsFocused } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function DocumentListing(props) {
  const FOLDERS = gql`
    ${folders}
  `;

  const DELETE_FOLDERS = gql`
  ${DeleteFolder}
`;

  const property = props?.route?.params?.property;
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [popFolder, setPopFolder] = useState(false)
  const [selectedFolderIndex, setSelectedFolderIndex] = useState("")
  const { loading, error, data, refetch } = useQuery(FOLDERS, {
    fetchPolicy: "cache-and-network",
    variables: {
      filters: {
        property: property?._id,
      },
    },
    onCompleted: ({ folders }) => {
      //   console.log("folders res :", folders.results);
    },
    onError: (err) => {
      console.log("error in folders :", err);
    },
  });
  // console.log("folders =====>", data?.folders?.results);
  const isFocused = useIsFocused();

  const [delete_folder_mutate] = useMutation(DELETE_FOLDERS, {
    onCompleted: onCompleted_delete_folder,
    onError: onError_delete_folder,
  });

  async function onCompleted_delete_folder(data) {
    try {
      FlashMessage({ msg: "Folder Deleted!", type: "success" });
      refetch()
      props.navigation.navigate("DocumentListing");
      console.log("DELETE_FOLDERS res :", data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  function onError_delete_folder(error) {
    FlashMessage({ msg: error?.message?.toString(), type: "danger" });
    console.log("DELETE_FOLDERS error  :", error);
  }

  useEffect(() => {
    refetch();
  }, [isFocused]);

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={
        property?.name ? property?.name?.toUpperCase() : "My Documents"
      }
      style={[styles().ph0]}
    >
      <View style={[styles().flex, { marginHorizontal: width * 0.04 }]}>
        <FlatList
          data={data?.folders?.results}
          bounces={false}
          numColumns={2}
          ListHeaderComponent={<View style={styles().pt30} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                key={index}
                onPress={() =>
                  props.navigation.navigate("DocumentView", {
                    docs: item,
                    property: property,
                  })
                }
                // onPress={() =>
                //   props.navigation.navigate("DocumentEdit", { docs: item })
                // }
                style={[
                  styles().mb20,
                  {
                    padding: 5,
                    width: width * 0.44,
                    marginRight: index % 2 === 0 ? width * 0.04 : 0,
                  },
                ]}
              >
                <View
                  style={[
                    styles().w100,
                    styles().boxpeshadow,
                    styles().bgWhite,
                    // styles().ph10,
                    styles().mb10,
                    styles().h130px,
                    styles().br5,
                  ]}
                >
                  <View
                    style={[
                      styles().wh100,
                      styles().overflowH,
                      styles().alignCenter,
                      styles().justifyCenter,
                      { backgroundColor: currentTheme.bodyBg },
                    ]}
                  >
                    {/* <FontAwesome
                      name="folder-open"
                      size={65}
                      color={currentTheme.themeBackground}
                    /> */}
                    <Image
                      source={require("../../assets/images/folder.png")}
                      resizeMode="contain"
                      style={[styles().wh80px]}
                    />
                  
                    <View style={[
                          styles().top10,
                          styles().alignEnd,
                          styles().right10,
                          styles().posAbs,
                        ]}>
                      <TouchableOpacity
                        style={[
                          styles().alignCenter,
                          styles().justifyCenter,
                          styles().wh30px,
                          styles().posRel,
                          styles().br5,
                          styles().bgWhite,
                        ]}
                        onPress={()=>{setPopFolder(!popFolder);setSelectedFolderIndex(index) }}
                      >
                        <Ionicons
                          name="ellipsis-vertical"
                          size={20}
                          color={currentTheme.SliderDots}
                        />
                      </TouchableOpacity>
                      { selectedFolderIndex === index && popFolder ? 
                      <View style={[
                          styles().boxpeshadow,
                          styles().w100,
                          styles().br10,
                          styles().mt5,
                        ]}
                      >
                        <TouchableOpacity  style={[
                        styles().w100,
                        styles().ph25,
                        styles().alignCenter,
                        styles().pv5,
                        
                      ]}
                      onPress={() => { setPopFolder(!popFolder); props.navigation.navigate("AddNewFolder", { property: property, folder:item }) }}
                      >
                          <Text style={[styles().textCenter, {color:currentTheme.black}]}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[
                        styles().w100,
                        styles().alignCenter,
                        styles().pv5,
                        styles().ph25,
                        {
                          borderTopWidth: 1,
                          borderTopColor: currentTheme.cEFEFEF,
                        },
                      ]}
                      onPress={() => {
                        // setDeleteLoading(true);
                        setPopFolder(!popFolder)
                        delete_folder_mutate({
                          variables: {
                            deleteFolderInput: {
                              id: item?._id,
                            },
                          },
                        });
                      }}
                      >
                          <Text style={{color:currentTheme.black}}>Delete</Text>
                        </TouchableOpacity>
                      </View> 
                    : null
                      } 
                      </View>
                  </View>
                </View>
                <Text
                  numberOfLines={2}
                  style={[
                    styles().fs12,
                    styles().fw400,
                    { color: currentTheme.black, marginLeft: 5 },
                  ]}
                >
                  {item?.name?.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<View style={styles().mb100} />}
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
                  No Documents
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
          onPress={() => {
            props.navigation.navigate("AddNewFolder", { property: property });
          }}
          Title={"Add New Folder"}
        />
      </View>
    </Layout>
  );
}
