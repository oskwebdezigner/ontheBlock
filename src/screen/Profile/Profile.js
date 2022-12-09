import React, { useContext, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  Image,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";
import {
  FontAwesome5,
  FontAwesome,
  Feather,
  Ionicons,
  SimpleLineIcons,
  AntDesign,
} from "@expo/vector-icons";
import Layout from "../../Component/Layout/Layout";
import UserContext from "../../context/User/User";

export default function Profile(props) {
  const user = useContext(UserContext);
  console.log("Profile user Context", user);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [modalVisible, setModalVisible] = useState(false);
  const [CurrentSelect, SetCurrentSelect] = useState(false);

  const CurrencyList = [
    {
      id: 0,
      currencyName: "USD - United States Dollar",
    },
    {
      id: 1,
      currencyName: "AED - Arab Emirates Dirham",
    },
    {
      id: 2,
      currencyName: "BHD - Behraini Dinaar",
    },
    {
      id: 3,
      currencyName: "INR - Indian Rupee",
    },
    {
      id: 4,
      currencyName: "KWD - Kuwaiti Dinaar",
    },
    {
      id: 5,
      currencyName: "OMR - Omani Riyal",
    },
    {
      id: 6,
      currencyName: "SAR - Saudia Riyal",
    },
    {
      id: 7,
      currencyName: "QAR - Qatari Riyal",
    },
    {
      id: 8,
      currencyName: "INR - Indian Rupee",
    },
    {
      id: 9,
      currencyName: "KWD - Kuwaiti Dinaar",
    },
    {
      id: 10,
      currencyName: "OMR - Omani Riyal",
    },
    {
      id: 11,
      currencyName: "SAR - Saudia Riyal",
    },
    {
      id: 12,
      currencyName: "QAR - Qatari Riyal",
    },
  ];

  function ProfileHeader() {
    return (
      <View
        style={[
          styles().profileHeader,
          styles().alignCenter,
          styles().mt20,
          styles().mb30,
        ]}
      >
        <View
          style={[
            styles().wh150px,
            styles().mb20,
            styles().br100,
            styles().overflowH,
            styles().bw2,
            { borderColor: currentTheme.themeBackground },
          ]}
        >
          {user?.photo ? (
            <Image source={{ uri: user?.photo }} style={styles().wh100} />
          ) : (
            <Image
              source={require("../../assets/images/default-img.png")}
              style={styles().wh100}
            />
          )}
        </View>
        <Text
          style={[
            styles().fs18,
            styles().mb15,
            styles().fontBold,
            styles().fw700,
            { color: currentTheme.borderColor },
          ]}
        >
          {user?.first_name?.toUpperCase() +
            " " +
            user?.last_name?.toUpperCase()}
        </Text>
        <Text
          style={[
            styles().fs12,
            styles().fontRegular,
            { color: currentTheme.c727477 },
          ]}
        >
          using Email
        </Text>
        <Text
          style={[
            styles().fs14,
            styles().fontRegular,
            styles().mt5,
            { color: currentTheme.borderColor },
          ]}
        >
          {user?.email}
        </Text>
      </View>
    );
  }

  function ProfileList(props) {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          styles().bgWhite,
          styles().br5,
          styles().ph20,
          styles().pv15,
          styles().flexRow,
          styles().justifyBetween,
          styles().alignCenter,
          { marginBottom: 2 },
        ]}
      >
        <View style={styles().w25px}>{props.ListIcon}</View>
        <Text
          style={[
            styles().fs14,
            styles().flex,
            styles().ml15,
            styles().fontRegular,
            { color: currentTheme.borderColor },
          ]}
        >
          {props.ListName}
        </Text>
        <FontAwesome
          name="angle-right"
          size={20}
          color={currentTheme.SliderDots}
        />
      </TouchableOpacity>
    );
  }

  function CurrencyModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={[
            styles().posAbs,
            styles().top0,
            styles().bottom0,
            styles().left0,
            styles().right0,
            { backgroundColor: currentTheme.modalShadow },
          ]}
        />
        <View style={[styles().flex, styles().bottom0, styles().justifyEnd]}>
          <View
            style={[
              styles(currentTheme).bgWhite,
              styles().h70,
              styles().modalContainer,
            ]}
          >
            <View style={[styles().pt25, styles().pb15, styles().ph25]}>
              <Text
                style={[
                  styles().fs18,
                  styles().fontBold,
                  { color: currentTheme.black },
                ]}
              >
                Select your Currency
              </Text>
            </View>
            <FlatList
              data={CurrencyList}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      SetCurrentSelect(index);
                      setModalVisible(false);
                    }}
                    style={[
                      styles().pv15,
                      styles().flexRow,
                      styles().justifyBetween,
                      styles().alignCenter,
                      styles().ph25,
                      {
                        borderTopWidth: 1,
                        borderTopColor: currentTheme.bodyBg,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles().fs16,
                        CurrentSelect === index
                          ? styles().fontBold
                          : styles().fontRegular,
                        {
                          color:
                            CurrentSelect === index
                              ? currentTheme.blue
                              : currentTheme.borderColor,
                        },
                      ]}
                    >
                      {item.currencyName}
                    </Text>
                    {CurrentSelect === index && (
                      <FontAwesome
                        name="check-circle"
                        size={24}
                        color={currentTheme.blue}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      pagetitle={"Profile"}
      style={styles().ph20}
    >
      <ProfileHeader />
      <ProfileList
        ListName={"Personal Details"}
        onPress={() => props.navigation.navigate("PersonalDetails")}
        ListIcon={<Feather name="user" size={20} color={currentTheme.black} />}
      />
      <ProfileList
        ListName={"Wishlist"}
        onPress={() => props.navigation.navigate("Wishlist")}
        ListIcon={<Feather name="heart" size={20} color={currentTheme.black} />}
      />
      <ProfileList
        ListName={"Hawta Wallet"}
        onPress={() => props.navigation.navigate("Wallet")}
        ListIcon={
          <Ionicons
            name="ios-wallet-outline"
            size={20}
            color={currentTheme.black}
          />
        }
      />
      <ProfileList
        ListName={"Logout"}
        onPress={() => props.navigation.navigate("Login")}
        ListIcon={
          <Feather
            name="log-out"
            size={20}
            color={currentTheme.black}
            style={{ transform: [{ rotate: "-180deg" }] }}
          />
        }
      />

      <View style={[styles().mt35, styles().mb25]}>
        <Text
          style={[
            styles().fs18,
            styles().textCenter,
            styles().mb20,
            styles().fontBold,
            styles().fw700,
            { color: currentTheme.borderColor },
          ]}
        >
          Settings
        </Text>
        <ProfileList
          ListName={"Language"}
          ListIcon={
            <SimpleLineIcons
              name="globe"
              size={24}
              color={currentTheme.black}
            />
          }
        />
        <ProfileList
          ListName={"Currency"}
          onPress={() => setModalVisible(!modalVisible)}
          ListIcon={
            <FontAwesome name="dollar" size={20} color={currentTheme.black} />
          }
        />
        <ProfileList
          ListName={"Saved Cards and Debit Cards"}
          ListIcon={
            <Feather name="credit-card" size={20} color={currentTheme.black} />
          }
        />
        <ProfileList
          ListName={"Change Password"}
          onPress={() => props.navigation.navigate("ChangePassword")}
          ListIcon={
            <Feather name="lock" size={20} color={currentTheme.black} />
          }
        />
      </View>

      <View style={[styles().mt35, styles().mb25]}>
        <Text
          style={[
            styles().fs18,
            styles().textCenter,
            styles().mb20,
            styles().fontBold,
            styles().fw700,
            { color: currentTheme.borderColor },
          ]}
        >
          General
        </Text>
        <ProfileList
          ListName={"How it Works"}
          ListIcon={
            <Feather name="info" size={24} color={currentTheme.black} />
          }
        />
        <ProfileList
          ListName={"Our Products"}
          onPress={() => props.navigation.navigate("OurProducts")}
          ListIcon={<Feather name="box" size={20} color={currentTheme.black} />}
        />
        <ProfileList
          ListName={"Our Charity Work"}
          ListIcon={
            <FontAwesome5
              name="hand-holding-heart"
              size={20}
              color={currentTheme.black}
            />
          }
        />
      </View>

      <View
        style={[
          styles().h50px,
          styles().mb25,
          styles().bgWhite,
          styles().br5,
          styles().alignCenter,
          styles().justifyCenter,
        ]}
      >
        <Text>Sponsor Logo here</Text>
      </View>

      <View
        style={[
          styles().mb25,
          styles().flexRow,
          styles().justifyBetween,
          styles().alignCenter,
        ]}
      >
        <View
          style={[
            styles().w48,
            styles().alignCenter,
            styles().justifyCenter,
            styles().h50px,
            styles().bgWhite,
            styles().br5,
          ]}
        >
          <Text
            style={[
              styles().fs14,
              styles().fontRegular,
              { color: currentTheme.borderColor },
            ]}
          >
            Call us
          </Text>
        </View>
        <View
          style={[
            styles().w48,
            styles().alignCenter,
            styles().justifyCenter,
            styles().h50px,
            styles().bgWhite,
            styles().br5,
          ]}
        >
          <Text
            style={[
              styles().fs14,
              styles().fontRegular,
              { color: currentTheme.borderColor },
            ]}
          >
            Email us
          </Text>
        </View>
      </View>

      <View
        style={[
          styles().mb25,
          styles().flexRow,
          styles().justifyBetween,
          styles().alignCenter,
        ]}
      >
        <View
          style={[
            styles().alignCenter,
            styles().wh40px,
            styles().justifyCenter,
            styles(currentTheme).bgWhite,
            styles().br5,
          ]}
        >
          <FontAwesome
            name="instagram"
            size={20}
            color={currentTheme.c999999}
          />
        </View>
        <View
          style={[
            styles().alignCenter,
            styles().wh40px,
            styles().justifyCenter,
            styles(currentTheme).bgWhite,
            styles().br5,
          ]}
        >
          <FontAwesome
            name="facebook-f"
            size={20}
            color={currentTheme.c999999}
          />
        </View>
        <View
          style={[
            styles().alignCenter,
            styles().wh40px,
            styles().justifyCenter,
            styles(currentTheme).bgWhite,
            styles().br5,
          ]}
        >
          <FontAwesome name="whatsapp" size={20} color={currentTheme.c999999} />
        </View>
        <View
          style={[
            styles().alignCenter,
            styles().wh40px,
            styles().justifyCenter,
            styles(currentTheme).bgWhite,
            styles().br5,
          ]}
        >
          <FontAwesome name="linkedin" size={20} color={currentTheme.c999999} />
        </View>
        <View
          style={[
            styles().alignCenter,
            styles().wh40px,
            styles().justifyCenter,
            styles(currentTheme).bgWhite,
            styles().br5,
          ]}
        >
          <FontAwesome name="twitter" size={20} color={currentTheme.c999999} />
        </View>
        <View
          style={[
            styles().alignCenter,
            styles().wh40px,
            styles().justifyCenter,
            styles(currentTheme).bgWhite,
            styles().br5,
          ]}
        >
          <FontAwesome5 name="tiktok" size={24} color={currentTheme.c999999} />
        </View>
      </View>

      <View style={styles().mb25}>
        <TouchableOpacity style={styles().mb10}>
          <Text
            style={[
              styles().fs14,
              styles().fontRegular,
              { color: currentTheme.borderColor },
            ]}
          >
            User Agreement
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles().mb10}>
          <Text
            style={[
              styles().fs14,
              styles().fontRegular,
              { color: currentTheme.borderColor },
            ]}
          >
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Faq")}
          style={styles().mb10}
        >
          <Text
            style={[
              styles().fs14,
              styles().fontRegular,
              { color: currentTheme.borderColor },
            ]}
          >
            Frequently Asked Questions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles().mb10}>
          <Text
            style={[
              styles().fs14,
              styles().fontRegular,
              { color: currentTheme.borderColor },
            ]}
          >
            Delete my account
          </Text>
        </TouchableOpacity>
      </View>
      <CurrencyModal />
    </Layout>
  );
}
