import React, { useContext } from "react";
import {
  Text,
  Image,
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome5,
  FontAwesome,
  Feather,
  Ionicons,
  Entypo,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";

import fontStyles from "../../utils/fonts/fontStyles";
import styless from "../../screen/styles";

import Home from '../../Component/CustomTab/Home';
import HomeActive from '../../Component/CustomTab/HomeActive';
import Notifications from '../../Component/CustomTab/Notifications';
import NotificationsActive from '../../Component/CustomTab/NotificationsActive';
import Draws from '../../Component/CustomTab/Draws';
import DrawsActive from '../../Component/CustomTab/DrawsActive';
import Ticket from '../../Component/CustomTab/Ticket';
import TicketActive from '../../Component/CustomTab/TicketActive';
import Cart from '../../Component/CustomTab/Cart';
import CartActive from '../../Component/CustomTab/CartActive';

const { width, height } = Dimensions.get("screen");

export default function CustomTabs(props) {

  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  

  const { state, descriptors, navigation, fill } = props;

  let routeName =
    props.state.routes[props.state.index]?.state?.routes[
      props?.state?.routes[props.state.index]?.state?.index
    ]?.name;
  // console.log("routeName", props.state.routes[props.state.index]);
  let parentName = props.state.routes[props.state.index]?.name;
  
  if(
    routeName === 'ProductListing' ||
    routeName === 'ProductDetails' ||
    routeName === 'Cart' || 
    routeName === 'Checkout' ||
    routeName === 'CheckoutSchedule' ||
    routeName === 'OrderPlaced' ||
    routeName === 'OrderDetail' || 
    routeName === 'EditAddress' ||
    
    routeName === 'EditProfile' || 
    
    routeName === 'TermsCondition' || 
    // routeName === 'Faq' ||
    routeName === 'AddressList' ||
    routeName === 'AddAddress' ||
    routeName === 'CardList' ||
    routeName === 'Topup' ||
    routeName === 'WalletHistory' ||
    routeName === 'AddCard'
  ){
    return null;
  }

  return (
    <View
      style={[
        styles(currentTheme).footerArea,
      ]}
    >
      {state.routes.length > 0 &&
        state.routes.map((d, index) => {
          // console.log(d.name)
          let icon;
          if (d.name === "Home"){
            icon = state.index === index ? <HomeActive /> : <Home />
          } else if (d.name === "Tickets"){
            icon = state.index === index ? <TicketActive /> : <Ticket />
          } else if(d.name === 'Notifications'){
            icon = state.index === index ? <NotificationsActive /> : <Notifications/>
          } else if(d.name === 'Draws'){
            icon = state.index === index ? <DrawsActive /> : <Draws/>
          } else if(d.name === 'Cart'){
            icon = state.index === index ? <CartActive /> : <Cart />
          }
          

          return (
            <TouchableOpacity
              key={index}
              style={[styles(currentTheme).footer, {width: d.name === 'Notifications' ? width * 0.22 : null }]}
              onPress={() => {
                navigation.navigate(d.name, { screen: d.name });
              }}
            >
              
              {icon}
              <Text style={[styless().fs12, styless().mt5, styless().fontRegular, {color:currentTheme.borderColor}]}>{d.name}</Text>
              
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

const styles = (props = null) =>
  StyleSheet.create({
    footerArea: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: props !== null ? props.white : "transparent",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 2.58,
      elevation: 5,
    },
    footerText: {
      fontSize: 20,
      lineHeight: 24,
      color: "#FFFFFF",
      paddingHorizontal: 10,
    },
    footer: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
