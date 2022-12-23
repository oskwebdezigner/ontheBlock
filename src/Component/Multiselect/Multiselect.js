import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../../screen/styles";
import {
  Entypo,
  Foundation,
  Feather,
  Octicons,
  MaterialIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import Header from "../Header/Header";
import { LinearGradient } from "expo-linear-gradient";
import fontStyles from "../../utils/fonts/fontStyles";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

export default function Multiselect({
  value,
  setValue,
  ListItems,
  SelectText,
  stylesWrapper,
}) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  return (
    <SectionedMultiSelect
      styles={{
        button: {
          backgroundColor: currentTheme.themeBackground,
        },
        modalWrapper: {
          justifyContent: "center",
        },
        container: {
          // flex: 0.25,
        },
        selectToggle: [
          {
            paddingTop: 5,
            // paddingBottom:20,
            // backgroundColor:currentTheme.black,
            paddingLeft: 15,
            height: 40,
            justifyContent: "flex-end",
            // borderWidth:2
          },
          stylesWrapper,
        ],
        selectToggleText: {
          fontFamily: fontStyles.PoppinsRegular,
          fontSize: 12,
          color: currentTheme.black,
          // borderWidth:2,
          // height:'100%',
        },
        itemText: {
          paddingTop: 10,
          fontSize: 14,
          fontWeight: "400",
          fontFamily: fontStyles.PoppinsRegular,
        },
      }}
      showCancelButton={true}
      hideSearch={true}
      items={ListItems}
      selectToggleIconComponent={
        <AntDesign
          name="caretdown"
          size={14}
          color={currentTheme.black}
          style={{ right: 10 }}
        />
      }
      IconRenderer={MaterialIcons}
      uniqueKey="_id"
      displayKey="name"
      // subKey="children"
      single={true}
      selectText={SelectText}
      showDropDowns={true}
      readOnlyHeadings={false}
      onSelectedItemsChange={(item) => setValue(item)}
      selectedItems={value}
    />
  );
}
