import React, { useContext, useState, useEffect } from "react";
import {
  Dimensions,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
  Alert,
  Image,
  Linking,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import Layout from "../../Component/Layout/Layout";
import TextField from "../../Component/FloatTextField/FloatTextField";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import { EvilIcons, Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import Spinner from "../../Component/Spinner/Spinner";
import CameraAndFileComponent from "../../Component/CameraComponent/CameraAndFileComponent";
import DocumentComponent from "../../Component/DocumentPicker/DocumentPicker";
import * as DocumentPicker from "expo-document-picker";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  addFile,
  addMultipleFiles,
  getImageKitToken,
} from "../../apollo/server";
import { uploadToImageKit, uploadImageToImageKit } from "../../Component/CameraComponent/CloudUpload";
import FlashMessage from "../../Component/FlashMessage/FlashMessage";


export default function DocumentEdit(props) {
  const ADD_MULTIPLE_FILES = gql`
    ${addMultipleFiles}
  `;
  // const ADD_FILES = gql`
  //   ${addFile}
  // `;

  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  let docs = props.route?.params?.docs;
  const [ItemDocName, setItemDocName] = useState("");
  const [ItemDocNameError, setItemDocNameError] = useState(false);
  const [DocumentfileLoading, setDocumentfileLoading] = useState(false);
  const [Documentfile, setDocumentfile] = useState([]);
  const [UploadNewDocs, setUploadNewDocs] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [deletedFiles, setDeletedFiles] = useState([]);
  // const { loading, error, data, refetch } = useQuery(GET_IMAGEKIT_TOKEN, {
  //   fetchPolicy: "cache-and-network",
  //   onCompleted: ({ getImageKitToken }) => {
  //     console.log("getImageKitToken res :", getImageKitToken);
  //   },
  //   onError: (err) => {
  //     console.log("error in getImageKitToken :", err);
  //   },
  // });
  const [modalVisible, setModalVisible] = useState(false);
  const [mutate, { client }] = useMutation(ADD_MULTIPLE_FILES, {
    onCompleted,
    onError,
  });

  async function onCompleted(data) {
    try {
      FlashMessage({ msg: "Folder Updated!", type: "success" });
      console.log("addFile res :", data.addFile);
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
    console.log("addFile error  :", error);
  }

  useEffect(() => {
    setDocumentfile(docs?.files);
  }, []);

  const DeleteFile = (i) => {
    let newArr = [...Documentfile];
    let deleted = newArr.splice(i, 1);
    setDocumentfile(() => [...newArr]);
    setDeletedFiles((prevfile) => [...prevfile, deleted[0]]);
  };

  const DeleteFilePrev = (i) => {
    let newArr = [...UploadNewDocs];
    let deleted = newArr.splice(i, 1);
    setUploadNewDocs(() => [...newArr]);
    setDeletedFiles((prevfile) => [...prevfile, deleted[0]]);
  };


  async function Addfiles() {
    let DEL = deletedFiles?.map((file) => {
      return file._id;
    });
    console.log(DEL);
    let data = {
      folderId: docs?._id,
      inputMultipleFiles: {
        deletedFiles: DEL ? DEL : [],
        files: UploadNewDocs,
      },
    };
    console.log("file data :", data);
    setLoading(true);
    await mutate({
      variables: data,
    });
  }

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      withoutScroll={true}
      pagetitle={"Document Details"}
    >
      {/* <View style={[styles().h250px, styles().w100, styles().overflowH]}>
            <View style={{ 
                height: "100%",
                width: "100%",
                alignItems:'center',
                transform: [{ scaleX:2 }],
                borderBottomLeftRadius: width,
                borderBottomRightRadius: width,
                backgroundColor:'red',
                overflow: "hidden",
                }}>
            <View style={{
                
                 transform: [{ scaleX: 0.5 }],
                 backgroundColor: "yellow",
                 justifyContent:'center',
                 width:'100%',
                 height:'100%'

            }} >
            <Image source={{uri:'https://www.w3schools.com/html/pic_trulli.jpg'}} style={{
                
                flex:1,
                height:null,
                width:null,
                

            }} />
</View>
                
                </View>
                </View> */}

      <View style={styles().flex}>
        <View style={styles().mt15}>
          <TextField
            keyboardType="default"
            onChangeText={(e) => {
              setItemDocNameError(false);
              setItemDocName(e);
            }}
            // value={ItemDocName}
            value={docs?.name?.toUpperCase()}
            editable={false}
            label="Documents Name"
            errorText={ItemDocNameError}
            autoCapitalize="none"
            style
          />
        </View>

        <View
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
            {UploadNewDocs.map((file, i) => {
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
                  <TouchableOpacity
                    onPress={() => DeleteFilePrev(i)}
                    activeOpacity={0.6}
                    style={[
                      styles().posAbs,
                      // styles().zIndex10,
                      {
                        right: -7,
                        top: -5,
                      },
                    ]}
                  >
                    <Entypo
                      color={"black"}
                      size={15}
                      name={"circle-with-cross"}
                    />
                  </TouchableOpacity>
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
      <CameraAndFileComponent 
      loading = { (e) => {setDocumentfileLoading(e)}} 
      fileUpload = {async(document)=>{
        if (document.type === "success") {
          await uploadToImageKit(document).then((file) => {
            console.log('file>>>1234',file)
            setDocumentfileLoading(false);
            setUploadNewDocs((prevfile) => [
              ...prevfile,
              {
                name: file.name,
                mimetype: document.mimeType,
                path: file.url,
              },
            ]);
          });
        }
        if (document.type === "cancel") {
          setDocumentfileLoading(false);
        }
      }}
      update = {async (image) => {console.log('responsesssss>>>',image)
      uploadImageToImageKit(image)
      await uploadImageToImageKit(image).then((img) => {
        console.log('img>>>',img)
        setUploadNewDocs((prevfile) => [
              ...prevfile,
              {
                name: img.name,
                mimetype: 'image/jpeg',
                path: img.url,
              },
            ]);
      });
      }} > 
            {/* <TouchableOpacity
              // onPress={() => setFile()}
              onPress={() => setModalVisible(true) }
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
            > */}
            <View 
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
            {DocumentfileLoading ? (
                <ActivityIndicator size={"small"} />
              ) : (
                <AntDesign
                  name="addfile"
                  color={currentTheme.c727477}
                  size={20}
                />
              )}
            </View>
            
            {/* </TouchableOpacity> */}
            </CameraAndFileComponent>
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
        </View>

        <View
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
            Your Documents
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
            {Documentfile.length !== 0 ? (
              Documentfile.map((file, i) => {
                return (
                  <TouchableOpacity
                    // activeOpacity={1}
                    onPress={() => {
                      Linking.openURL(file.path).catch((err) =>
                        console.error("Error in linking", err)
                      );
                    }}
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
                    <TouchableOpacity
                      onPress={() => DeleteFile(i)}
                      activeOpacity={0.6}
                      style={[
                        styles().posAbs,
                        // styles().zIndex10,
                        {
                          right: -7,
                          top: -5,
                        },
                      ]}
                    >
                      <Entypo
                        color={"black"}
                        size={15}
                        name={"circle-with-cross"}
                      />
                    </TouchableOpacity>
                    <Ionicons
                      name="document-attach"
                      color={currentTheme.themeBackground}
                      size={20}
                    />
                    <Text style={{ fontSize: 7 }} numberOfLines={1}>
                      {file.name}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text
                style={[
                  styles().fs11,
                  styles().fw300,
                  { color: currentTheme.lightRed, marginLeft: 5 },
                ]}
              >
                No Docs
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={[styles().mt35, styles().mb20]}>
        {Loading ? (
          <Spinner />
        ) : (
          <ThemeButton onPress={() => Addfiles()} Title={"Save"} />
        )}
      </View>
    </Layout>
  );
}


const style = StyleSheet.create({
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