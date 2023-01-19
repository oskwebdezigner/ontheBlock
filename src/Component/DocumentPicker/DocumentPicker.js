import React, { useState, useContext } from "react";
import {
  Picker,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ActionSheetIOS,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import * as DocumentPicker from "expo-document-picker";
// import * as DocumentPicker from "react-native-document-picker";
import { async } from "validate.js";
import { uploadImageToCloudinary } from "../../Component/CameraComponent/CloudUpload";

const { width, height } = Dimensions.get("screen");

function DocumentComponent(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [Loader, setLoader] = useState(false);

  const UploadFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });

    // var result = await DocumentPicker.pick({
    //   type: [DocumentPicker.types.pdf],
    // });
    props.setFile(result);
    // console.log(result);
  };

  async function closeSelectedImage() {
    setSelectedImage(null);
  }

  //   if (selectedImage !== null) {
  //     return (
  //       <View style={styles.container}>
  //         <TouchableOpacity onPress={closeSelectedImage}>
  //           <FontAwesome
  //             name="close"
  //             size={24}
  //             color={currentTheme.themeBackground}
  //           />
  //         </TouchableOpacity>
  //         <Image
  //           source={{ uri: selectedImage.localUri }}
  //           style={styles.thumbnail}
  //         />
  //       </View>
  //     );
  //   }

  return (
    <View style={[{ flexDirection: "row" }, props.style]}>
      {Loader ? (
        <ActivityIndicator size={24} color={"orange"} />
      ) : (
        <TouchableOpacity
          style={{ margin: 5 }}
          onPress={() =>
            Platform.OS === "ios" ? onPress() : setModalVisible(true)
          }
        >
          {props.children}
          {/* {props.children ? props.children :
            <>
            <Image 
                  source={require('../../assets/images/cloud-upload.png')} />
             <Text>Upload</Text> 
             </>} */}
        </TouchableOpacity>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={[
              styles.centeredView,
              {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                justifyContent: "flex-end",
              },
            ]}
          >
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  UploadFile();
                }}
                style={[
                  styles.appButtonContainer,
                  {
                    justifyContent: "center",
                    margin: 5,
                    //  borderBottomWidth : 0.6,
                    //  borderBottomColor : currentTheme.themeBackground
                  },
                ]}
              >
                <Text style={styles.appButtonText}>Upload Document</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                marginRight: 20,
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.CheckBoxBtn,
                  { margin: 5, justifyContent: "center" },
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  /* Other styles hidden to keep the example brief... */
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // marginTop: 22
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  CheckBoxBtn: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 8,
  },
  appButtonContainer: {
    // width : width,
    // backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 14,
    // color: "#fff",
    // fontWeight: "bold",
    alignSelf: "center",
    // textTransform: "uppercase"
  },
});

export default DocumentComponent;
