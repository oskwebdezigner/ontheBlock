import React, { useContext, useState, useEffect } from "react";
import {
  Dimensions,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import Layout from "../../Component/Layout/Layout";
import TextField from "../../Component/FloatTextField/FloatTextField";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import Spinner from "../../Component/Spinner/Spinner";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { addFolder } from "../../apollo/server";
import * as DocumentPicker from "expo-document-picker";
import { EvilIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import UserContext from "../../context/User/User";
import { uploadToImageKit } from "../../Component/CameraComponent/CloudUpload";

export default function DocumentEdit(props) {
  const ADD_FOLDER = gql`
    ${addFolder}
  `;
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  //   let docs = props.route?.params?.docs;
  const property = props.route.params.property;
  const user = useContext(UserContext);
  const [Loading, setLoading] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folderNameErr, setFolderNameErr] = useState(false);
  const [Documentfile, setDocumentfile] = useState([]);

  const [mutate, { client }] = useMutation(ADD_FOLDER, {
    onCompleted,
    onError,
  });

  async function onCompleted(data) {
    try {
      FlashMessage({ msg: "New Folder Added!", type: "success" });
      console.log("addFolder res :", data.addFolder);
      props.navigation.navigate("DocumentListing");
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
    console.log("addFolder error  :", error);
  }

  const setFile = async () => {
    let document = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });
    if (document.type === "success") {
      await uploadToImageKit(document).then((file) => {});
      setDocumentfile((prevfiles) => [...prevfiles, file]);
    }
  };

  async function Addfolder() {
    let status = true;
    if (folderName === "") {
      FlashMessage({ msg: "Enter Folder Name!", type: "warning" });
      status = false;
      return;
    }
    if (status) {
      setLoading(true);
      let data = {
        inputFolder: {
          added_by: user?._id,
          // files: Documentfile ? Documentfile : null,
          // inventory: null,
          name: folderName,
          property: property?._id,
        },
      };
      console.log("folder data :", data);
      await mutate({
        variables: data,
      });
    }
  }

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"Add Folder Details"}
    >
      <View style={styles().flex}>
        <View style={styles().mt15}>
          <TextField
            keyboardType="default"
            onChangeText={(e) => {
              setFolderNameErr(false);
              setFolderName(e);
            }}
            value={folderName}
            label="Folder Name"
            errorText={folderNameErr}
            autoCapitalize="none"
            style
          />
        </View>

        {/* <View
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
              onPress={() => setFile()}
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
              You Can Upload Pdf, Word etc
            </Text>
          </View>
        </View> */}
      </View>
      <View style={[styles().mt35, styles().mb20]}>
        {Loading ? (
          <Spinner />
        ) : (
          <ThemeButton onPress={() => Addfolder()} Title={"Add"} />
        )}
      </View>
    </Layout>
  );
}
