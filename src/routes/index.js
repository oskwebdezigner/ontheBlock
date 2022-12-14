import React, { useContext, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import navigationService from "./navigationService";
import * as Notifications from "expo-notifications";
import ThemeContext from "../context/ThemeContext/ThemeContext";
import { theme } from "../context/ThemeContext/ThemeColor";
import { tabIcon, tabOptions } from "./customTab";
import CustomTabs from "../Component/CustomTab/CustomTab";
import { Easing } from "react-native-reanimated";
import { AuthContext } from "../context/Auth/auth";
import { UserProvider } from "../context/User/User";
import Animated from "react-native-reanimated";

// Stacks Screen
import Home from "../screen/Home/Home";
import MaintenanceDetail from "../screen/MaintenanceDetail/MaintenanceDetail";
import SinglePropertyListing from "../screen/SinglePropertyListing/SinglePropertyListing";
import InventoryCategoryList from "../screen/InventoryCategoryList/InventoryCategoryList";
import InventorySingleList from "../screen/InventorySingleList/InventorySingleList";
import DocumentListing from "../screen/DocumentListing/DocumentListing";
import PropertyData from "../screen/PropertyData/PropertyData";
import InventoryEdit from "../screen/InventoryEdit/InventoryEdit";
import DocumentEdit from "../screen/DocumentEdit/DocumentEdit";
import HandymenEdit from "../screen/HandymenEdit/HandymenEdit";
import MyHandymen from "../screen/MyHandymen/MyHandymen";
import ScheduleEdit from "../screen/ScheduleEdit/ScheduleEdit";
import AddTask from "../screen/AddTask/AddTask";
import AddNewFolder from "../screen/AddNewFolder/AddNewFolder";
import InventoryAddCategory from "../screen/InventoryAddCategory/InventoryAddCategory";
import Draws from "../screen/Draws/Draws";
import NotificationsScreen from "../screen/NotificationsScreen/NotificationsScreen";
import PrizeDetail from "../screen/PrizeDetail/PrizeDetail";
import Tickets from "../screen/Tickets/Tickets";
import Cart from "../screen/Cart/Cart";
import Profile from "../screen/Profile/Profile";
import EditProfile from '../screen/EditProfile/EditProfile';
import Wishlist from "../screen/Wishlist/Wishlist";
import PersonalDetails from "../screen/PersonalDetails/PersonalDetails";
import OurProducts from "../screen/OurProducts/OurProducts";
import ProductDetail from "../screen/ProductDetail/ProductDetail";
import Wallet from "../screen/Wallet/Wallet";
import WalletTopup from "../screen/WalletTopup/WalletTopup";
import ChangePassword from "../screen/ChangePassword/ChangePassword";
import Faq from "../screen/Faq/Faq";

// Auth Stack
import LandingScreen from "../screen/Landing/Landing";
import Login from "../screen/Login/Login";
import LetsBegin from "../screen/LetsBegin/LetsBegin";
import ChooseGoals from "../screen/ChooseGoals/ChooseGoals";
import TellAboutYourself from "../screen/TellAboutYourself/TellAboutYourself";
import TellAboutHome from "../screen/TellAboutHome/TellAboutHome";
import Verification from "../screen/Verification/Verification";
import CreatePassword from "../screen/CreatePassword/CreatePassword";
import ForgotPassword from "../screen/ForgotPassword/ForgotPassword";

import SignUp from "../screen/SignUp/SignUp";

import ResetPassword from "../screen/ResetPassword/ResetPassword";

import SideBar from "../Component/SideBar/SideBar";

const NavigationStack = createStackNavigator();
const AuthenticationStack = createStackNavigator();
const MainStack = createStackNavigator();
const SideDrawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const DrawStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const TicketStack = createStackNavigator();

function authenticationNavigator() {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="Landing" component={LandingScreen} />
      <AuthenticationStack.Screen name="Login" component={Login} />
      <AuthenticationStack.Screen name="LetsBegin" component={LetsBegin} />
      <AuthenticationStack.Screen name="ChooseGoals" component={ChooseGoals} />
      <AuthenticationStack.Screen
        name="TellAboutYourself"
        component={TellAboutYourself}
      />
      <AuthenticationStack.Screen
        name="Verification"
        component={Verification}
      />
      <AuthenticationStack.Screen
        name="CreatePassword"
        component={CreatePassword}
      />
      <AuthenticationStack.Screen
        name="TellAboutHome"
        component={TellAboutHome}
      />
      <AuthenticationStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />

      {/* <AuthenticationStack.Screen name="Signup" component={SignUp} /> */}
      {/* <AuthenticationStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <AuthenticationStack.Screen
        name="Verification"
        component={Verification}
      /> */}
      <AuthenticationStack.Screen
        name="ResetPassword"
        component={ResetPassword}
      />
    </AuthenticationStack.Navigator>
  );
}

function HomeNavigator() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="MaintenanceDetail"
        component={MaintenanceDetail}
      />
      <HomeStack.Screen
        name="SinglePropertyListing"
        component={SinglePropertyListing}
      />
      <HomeStack.Screen
        name="InventoryCategoryList"
        component={InventoryCategoryList}
      />
      <HomeStack.Screen
        name="InventorySingleList"
        component={InventorySingleList}
      />
      <HomeStack.Screen
        name="InventoryAddCategory"
        component={InventoryAddCategory}
      />
      <HomeStack.Screen name="DocumentListing" component={DocumentListing} />
      <HomeStack.Screen name="PropertyData" component={PropertyData} />
      <HomeStack.Screen name="InventoryEdit" component={InventoryEdit} />
      <HomeStack.Screen name="DocumentEdit" component={DocumentEdit} />
      <HomeStack.Screen name="HandymenEdit" component={HandymenEdit} />
      <HomeStack.Screen name="MyHandymen" component={MyHandymen} />
      <HomeStack.Screen name="ScheduleEdit" component={ScheduleEdit} />
      <HomeStack.Screen name="AddTask" component={AddTask} />
      <HomeStack.Screen name="PrizeDetail" component={PrizeDetail} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="AddNewFolder" component={AddNewFolder} />
      <HomeStack.Screen name="PersonalDetails" component={PersonalDetails} />
      <HomeStack.Screen name="Wishlist" component={Wishlist} />
      <HomeStack.Screen name="Wallet" component={Wallet} />
      <HomeStack.Screen name="WalletTopup" component={WalletTopup} />
      <HomeStack.Screen name="ChangePassword" component={ChangePassword} />
      <HomeStack.Screen name="Faq" component={Faq} />
      <HomeStack.Screen name="OurProducts" component={OurProducts} />
      <HomeStack.Screen name="ProductDetail" component={ProductDetail} />
      <HomeStack.Screen name="EditProfile" component={EditProfile} />
    </HomeStack.Navigator>
  );
}

function DrawNavigator() {
  return (
    <DrawStack.Navigator headerMode="none">
      <DrawStack.Screen name="Draws" component={Draws} />
    </DrawStack.Navigator>
  );
}

function NotificationNavigator() {
  return (
    <NotificationsStack.Navigator headerMode="none">
      <NotificationsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </NotificationsStack.Navigator>
  );
}

function TicketNavigator() {
  return (
    <TicketStack.Navigator headerMode="none">
      <TicketStack.Screen name="Tickets" component={Tickets} />
    </TicketStack.Navigator>
  );
}

function Drawer() {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  return (
    <UserProvider>
      <View style={{ flex: 1 }}>
        <SideDrawer.Navigator
          // screenOptions={{
          //   swipeEnabled:false
          // }}
          // screenOptions={{drawerStyle:{backgroundColor:'blue'}}}
          drawerType="front"
          drawerStyle={{
            flex: 1,
            backgroundColor: "transparent",
            borderBottomRIghtRadius: 30,
            borderTopRightRadius: 30,
            overflow: "hidden",
            // width: "80%",
          }}
          drawerContent={(props) => {
            setProgress(props.progress);
            return <SideBar {...props} />;
          }}
        >
          <SideDrawer.Screen name="Home">
            {(props) => <HomeNavigator {...props} style={animatedStyle} />}
          </SideDrawer.Screen>
        </SideDrawer.Navigator>
      </View>
    </UserProvider>
  );
}

const closeConfig = {
  animation: "timing",
  config: {
    duration: 500,
    easing: Easing.linear,
  },
};

const config = {
  animation: "spring", //spring
  config: {
    stiffness: 1000,
    damping: 500,
    duration: 900,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function MyTabs(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  return (
    <Animated.View
      style={StyleSheet.flatten([
        {
          flex: 1,
        },
        props.style,
      ])}
    >
      <Tab.Navigator
        tabBar={(props) => <CustomTabs {...props} />}
        screenOptions={({ route }) => tabIcon(route, currentTheme)}
      >
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationNavigator}
          options={{ title: "Notifications" }}
        />
        <Tab.Screen
          name="Draws"
          component={DrawNavigator}
          options={{ title: "Draws" }}
        />

        <Tab.Screen
          name="Tickets"
          component={TicketNavigator}
          options={{ title: "Tickets" }}
        />
        <Tab.Screen name="Cart" component={Cart} options={{ title: "Cart" }} />
      </Tab.Navigator>
    </Animated.View>
  );
}

function noDrawer() {
  return (
    <NavigationStack.Navigator headerMode="none">
      <NavigationStack.Screen name="Drawer" component={Drawer} />
    </NavigationStack.Navigator>
  );
}

function AppContainer(props) {
  const { token } = useContext(AuthContext);
  function _handleNotification(notification) {
    try {
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer
        // theme={DarkTheme}
        ref={(ref) => {
          navigationService.setGlobalRef(ref);
          Notifications.addNotificationReceivedListener(_handleNotification);
        }}
      >
        <MainStack.Navigator
          headerMode="none"
          screenOptions={{ gestureEnabled: false }}
          initialRouteName={token ? "noDrawer" : "Auth"}
          // initialRouteName={  "noDrawer"  }
          // screenOptions={{
          // gestureEnabled: false,

          // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // transitionSpec: {
          //   open: closeConfig, // also change with config
          //   close: closeConfig,
          // },
          // }}
        >
          <MainStack.Screen name="Auth" component={authenticationNavigator} />
          <MainStack.Screen name="noDrawer" component={noDrawer} />
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppContainer;
