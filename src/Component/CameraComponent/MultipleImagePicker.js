import * as MediaLibrary from "expo-media-library";
import React, { useState, useEffect,useContext } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "../Header/Header";
import { Entypo, Ionicons } from "@expo/vector-icons";
import ThemeButton from "../ThemeButton/ThemeButton";
import styles from "../../screen/styles";
import { theme } from "../../context/ThemeContext/ThemeColor";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
// import { LinearGradient } from 'expo-linear-gradient';

export default function MultipleImagePicker({
  modalVisible,
  setModalVisible,
  style,
  Title,
  Subtitle,
  //   currentTheme,
  onCompleted,
  children,
  setProductImages,
  ProductImages,
}) {
  const [status, setStatus] = useState(false);
  const [Imgs, setImgs] = useState([]);

  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [selectedImage, setSelectedImage] = useState([]);

  useEffect(() => {
    _mediaLibraryAsync();
  }, []);

  useEffect(() => {
    setSelectedImage(ProductImages);
  }, [ProductImages]);

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }

    return data;
  };

  const numColumns = 3;

  async function _mediaLibraryAsync() {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status == "granted") {
      let media = await MediaLibrary.getAssetsAsync({
        mediaType: [MediaLibrary.MediaType.photo],
      });

      setImgs(media.assets);

      let totalPages = parseFloat(media.totalCount / 100);

      if (totalPages > 0) {
        let ss = media.endCursor;
        for (let i = 0; i < totalPages; i++) {
          let video = await MediaLibrary.getAssetsAsync({
            mediaType: [MediaLibrary.MediaType.photo],
            first: 100,
            after: ss,
          });
          ss = video.endCursor;
          setImgs((r) => [...r, ...video.assets]);
        }
      }
    }
  }

  function selectedStatus(item) {
    let status = selectedImage.some((d) => d.id === item.id);
    return status;
  }

  function removeSelected(item) {
    let unMarked = selectedImage.filter((r) => r.id !== item.id);
    setSelectedImage(unMarked);
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={[
          styles().flex,
          styles().justifyCenter,
          styles().alignCenter,
          {
            backgroundColor: currentTheme.themeBackground,
          },
        ]}
      >
        <View
          style={[
            {
              height: 90,
              paddingHorizontal: 10,
            },
            styles().mt20,
            styles().flexRow,
            styles().alignCenter,
            // styles().justifyCenter
          ]}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={[
              styles().borderRad100,
              styles().alignCenter,
              styles().justifyCenter,
              styles().overflowH,
              {
                bottom: 0,
                right: 0,
                height: 50,
                width: 50,
              },
            ]}
          >
            <View
              style={[
                styles().alignCenter,
                styles().justifyCenter,
                styles().wh100,
                styles().borderRad100,
              ]}
            >
              {/* <LinearGradient
                                colors={currentTheme.backButton}
                                style={[
                                    styles().justifyCenter,
                                    styles().alignCenter,
                                    styles().w100,
                                    styles().h100
                                ]}> */}
              <Ionicons name="chevron-back-sharp" size={24} color="white" />
              {/* </LinearGradient> */}
            </View>
          </TouchableOpacity>
          <View style={[styles().flex, styles().ml20]}>
            <Text
              style={[
                styles().fontMedium,
                styles().fontSize20,
                styles().bgTextWhite,
              ]}
            >
              Gallery
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setProductImages(selectedImage);
              setModalVisible(!modalVisible);
            }}
            style={[styles().flex, styles().ml20, styles().alignEnd]}
          >
            <Text
              style={[
                styles().fontMedium,
                styles().fontSize20,
                styles().bgTextWhite,
              ]}
            >
              {"Done(" + selectedImage?.length + ")"}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={{ margin: 4 }}
          horizontal={false}
          bounces={false}
          ListHeaderComponentStyle={{
            // backgroundColor :'yellow',
            // flex : 1,
            minWidth: "100%",
            // width :'100%'
          }}
          // ListHeaderComponent={() => {
          //     return (

          //     )
          // }}
          numColumns={numColumns}
          data={formatData(Imgs, numColumns)}
          renderItem={({ item, index }) => {
            let marked = selectedStatus(item);
            if (item.empty === true) {
              return (
                <View
                  style={[
                    styles().alignCenter,
                    styles().justifyCenter,
                    styles().flex,
                    {
                      height: Dimensions.get("window").width / numColumns,
                      backgroundColor: "transparent",
                    },
                  ]}
                />
              );
            }
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log("item", item);
                  if (marked) {
                    removeSelected(item);
                  } else {
                    if (selectedImage?.length < 10) {
                      setSelectedImage((r) => [...r, item]);
                    } else {
                      alert("Only 10 Images allow");
                    }
                  }
                }}
                style={[
                  {
                    width: "33.3%",
                  },
                ]}
              >
                <Image
                  source={{ uri: item.uri }}
                  key={index}
                  resizeMode="cover"
                  style={[
                    { height: 140, width: "100%" },
                    marked && { opacity: 0.4 },
                  ]}
                />
                {marked && (
                  <View
                    style={[
                      styles().posAbs,
                      styles().borderRad100,
                      styles().alignCenter,
                      styles().justifyCenter,
                      styles().overflowH,
                      {
                        bottom: 0,
                        right: 0,
                        height: 30,
                        width: 30,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles().alignCenter,
                        styles().justifyCenter,
                        styles().wh100,
                        styles().borderRad100,
                      ]}
                    >
                      {/* <LinearGradient
                            colors={currentTheme.backButton}
                            style={[
                                styles().justifyCenter,
                                styles().alignCenter,
                                styles().w100,
                                styles().h100
                            ]}> */}
                      <Entypo name="check" size={15} color="white" />
                      {/* </LinearGradient> */}
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
          keyExtractor={(category) => category.id}
        />
      </View>
    </Modal>
  );
}
