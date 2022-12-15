import React, { useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import {
  AntDesign,
  Ionicons,
  Feather,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import styles from "../../screen/styles";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const MenuItems = [
  {
    id: 1,
    name: "My Properties",
    Image: require("../../assets/images/my-properties.png"),
    navigateTo: "MyProperties",
  },
  {
    id: 2,
    name: "My Stuff",
    Image: require("../../assets/images/my-stuff.png"),
    navigateTo: "MyStuff",
  },
  {
    id: 3,
    name: "My Documents",
    Image: require("../../assets/images/my-documents.png"),
    navigateTo: "MyDocuments",
  },
  {
    id: 4,
    name: "Schedule Task",
    Image: require("../../assets/images/schedule-task.png"),
    // navigateTo: "ScheduleEdit",
  },
  {
    id: 5,
    name: "Finance",
    Image: require("../../assets/images/finance.png"),
    // navigateTo: 'TermsCondition'
  },
];

export default function SideBar(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // console.log('babuji keh rahe hain', props.navigation)
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  async function Logout() {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      })
    );
    await AsyncStorage.clear().then(() => console.log("async clear - logout!"));
  }

  return (
    <LinearGradient
      end={{ x: 0.2, y: 0.15 }}
      colors={currentTheme.sidebarGrad}
      style={[
        styles().flex,
        { borderBottomRightRadius: 30, borderTopRightRadius: 30 },
      ]}
    >
      <View
        style={[styles().pt35, styles().flex, styles().pl15, styles().pr15]}
      >
        <View style={styles().mb35}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={[styles().alignEnd, styles().justifyEnd, styles().backButn]}
          >
            <AntDesign name="close" size={30} color="black" />
          </TouchableOpacity>
          <View style={[styles().w200px, styles().h150px]}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles().wh100}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={MenuItems}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    item.navigateTo &&
                    props.navigation.navigate(item.navigateTo)
                  }
                  style={[
                    styles().flexRow,
                    styles().flex,
                    styles().alignCenter,
                    styles().pv10,
                    styles().mb10,
                  ]}
                >
                  <View style={[styles().mr20, styles().wh20px]}>
                    <Image
                      source={item.Image}
                      style={styles().wh100}
                      resizeMode={"contain"}
                    />
                  </View>
                  <Text
                    style={[
                      styles().fs13,
                      styles().fw600,
                      { color: currentTheme.black },
                    ]}
                  >
                    {item.name}
                  </Text>
                  {item.name === "Notifications" && (
                    <View style={[styles().flex, styles().alignEnd]}>
                      <Switch
                        trackColor={{
                          false: currentTheme.c50545D,
                          true: currentTheme.themeSecondary,
                        }}
                        thumbColor={
                          isEnabled
                            ? currentTheme.themeSecondary
                            : currentTheme.white
                        }
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity
            onPress={() => Logout()}
            style={[styles().flexRow, styles().pv10, styles().mb10]}
          >
            <View style={[styles().mr20, styles().wh20px]}>
              <Image
                source={require("../../assets/images/logout.png")}
                style={styles().wh100}
                resizeMode="contain"
              />
            </View>
            <Text
              style={[
                styles().fs13,
                styles().fw600,
                { color: currentTheme.black },
              ]}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          styles().flexRow,
          styles().alignCenter,
          styles().ph15,
          styles().pb25,
        ]}
      >
        <Text
          style={[
            styles().fs16,
            styles().mr10,
            styles().fw600,
            { color: currentTheme.textColor },
          ]}
        >
          Follow us
        </Text>
        <TouchableOpacity style={[styles().mr10]}>
          <FontAwesome5
            name="facebook-f"
            size={16}
            color={currentTheme.textColor}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles().mr10]}>
          <FontAwesome5
            name="instagram"
            size={16}
            color={currentTheme.textColor}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles().mr10]}>
          <FontAwesome5
            name="twitter"
            size={16}
            color={currentTheme.textColor}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
