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
import * as DocumentPicker from "expo-document-picker";
// import * as DocumentPicker from "react-native-document-picker";
import * as FileSystem from "expo-file-system";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
// import Doc from ''

const { width, height } = Dimensions.get("screen");

function CameraAndFileComponent(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [year, setYear] = useState(null);

  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  function setYearSelected(year) {
    setYear(year);
    props.setSelectedYear(year);
  }

  let Years = ["Cancel", "Open Galley", "Camera", "Upload Document"];

  const onPress = async () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: Years,
        destructiveButtonIndex: Years.findIndex((res) => res === year),
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          IOSPicker();
        } else if (buttonIndex === 2) {
          openCameraPickerAsync();
        } else if (buttonIndex === 3) {
          setFile();
        }
      }
    );
  };

  const setFile = async () => {
    props.loading(true);
    let document = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    const file = await FileSystem.readAsStringAsync(document.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    let documentBase64 = document
      ? `data:application/pdf;base64,${file}`
      : null;
    // console.log("file ------------>", file);
    // console.log("documentBase4 ------------>", documentBase64);

    // console.log("document", document);
    props.fileUpload(document, documentBase64);
    setModalVisible(false);
  };

  let IOSPicker = async () => {
    setModalVisible(false);
    props.loading(true);
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      //   FlashMessage({ message: "Permission to access camera roll is required!", type: "warning", position: 'top', height: 0.025 })
      Alert.alert("Permission to access camera roll is required!");
      props.loading(false);
      return;
    }

    let picker = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
      allowsMultipleSelection: true,
    });

    if (picker.cancelled === true) {
      props.loading(false);
      return;
    }
    let imageUri = picker ? `data:image/jpg;base64,${picker.base64}` : null;
    let img = {
      base64_image: imageUri,
    };
    props.update(imageUri);
    props.loading(false);
  };

  const openCameraPickerAsync = async () => {
    setModalVisible(false);
    props.loading(true);
    let permissionResult = await ImagePicker.getCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        //   FlashMessage({ message: "Permission to access camera is required!", type: "warning", position: 'top', height: 0.025 })
        Alert.alert("Permission to access camera is required!");

        props.loading(false);
        return;
      }
    }

    let cameraResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (cameraResult.cancelled === true) {
      setLoader(false);
      props.loading(false);
      return;
    }

    let imageUri = cameraResult
      ? `data:image/jpg;base64,${cameraResult.base64}`
      : null;
    let img = {
      base64_image: imageUri,
    };
    props.update(imageUri);
    props.loading(false);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [Loader, setLoader] = useState(false);

  async function closeSelectedImage() {
    setSelectedImage(null);
  }

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={closeSelectedImage}>
          <FontAwesome
            name="close"
            size={24}
            color={currentTheme.themeBackground}
          />
        </TouchableOpacity>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
      </View>
    );
  }

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
                  setFile();
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
              <TouchableOpacity
                onPress={() => {
                  IOSPicker();
                }}
                style={[
                  styles.appButtonContainer,
                  {
                    justifyContent: "center",
                    margin: 5,
                    borderBottomWidth: 0.6,
                    borderBottomColor: currentTheme.themeBackground,
                  },
                ]}
              >
                <Text style={styles.appButtonText}>Open Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  openCameraPickerAsync();
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
                <Text style={styles.appButtonText}>Camera</Text>
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

export default CameraAndFileComponent;
