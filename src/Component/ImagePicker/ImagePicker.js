import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { theme } from "../../utils/themeColors";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerToaster({
  isImagePicker,
  setIsImagePicker,
  setImage,
}) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log("ImagePicker Gallery :", result);

    if (!result.cancelled) {
      setImage(result.uri);
      setIsImagePicker(false);
    }
  };

  const openCamera = async () => {
    let permissionResult = await ImagePicker.getCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        return;
      }

      console.log("camera permission >>> ", permissionResult);
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log("ImagePicker Camera :", result);

    if (!result.cancelled) {
      setImage(result.uri);
      setIsImagePicker(false);
    }
  };

  return (
    isImagePicker && (
      <TouchableOpacity
        onPress={() => setIsImagePicker(false)}
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <TouchableOpacity
          onPress={() => openCamera()}
          style={{
            position: "absolute",
            right: 20,
            bottom: 80,
          }}
        >
          <View
            style={{
              backgroundColor: theme.Red.white,
              borderRadius: 100,
              padding: 8,
              flexDirection: "row",
              alignItems: "center",
              width: 110,
            }}
          >
            <MaterialIcons
              name="camera"
              size={27}
              color={theme.Red.themeBackground}
            />
            <Text style={{ color: "black", marginHorizontal: 4 }}>Camera</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => pickImage()}
          style={{
            position: "absolute",
            right: 20,
            bottom: 24,
          }}
        >
          <View
            style={{
              backgroundColor: theme.Red.white,
              borderRadius: 100,
              padding: 8,
              flexDirection: "row",
              alignItems: "center",
              width: 110,
            }}
          >
            <MaterialCommunityIcons
              name="file-image"
              size={27}
              color={theme.Red.themeBackground}
            />
            <Text style={{ color: "black", marginHorizontal: 4 }}>Gallery</Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  );
}
