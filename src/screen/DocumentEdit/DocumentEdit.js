import React, { useContext, useState, useCallback } from "react";
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
import { EvilIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import Spinner from "../../Component/Spinner/Spinner";
import CameraComponent from "../../Component/CameraComponent/CameraComponent";
import DocumentComponent from "../../Component/DocumentPicker/DocumentPicker";
import * as DocumentPicker from "expo-document-picker";

export default function DocumentEdit(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [ItemDocName, setItemDocName] = useState("");
  const [ItemDocNameError, setItemDocNameError] = useState(false);

  const [DocumentfileLoading, setDocumentfileLoading] = useState(false);
  const [Documentfile, setDocumentfile] = useState([]);

  console.log("state=======>", Documentfile);

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
            value={ItemDocName}
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
                    {file.name + "rishta hojaega naam brara hogea to"}
                  </Text>
                </View>
              );
            })}
            <TouchableOpacity
              onPress={async () => {
                let document = await DocumentPicker.getDocumentAsync({
                  type: "*/*",
                });
                setDocumentfile((prevfiles) => [...prevfiles, document]);
              }}
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
        </View>
      </View>

      <View style={[styles().mt35, styles().mb20]}>
        <ThemeButton Title={"Save"} />
      </View>
    </Layout>
  );
}
