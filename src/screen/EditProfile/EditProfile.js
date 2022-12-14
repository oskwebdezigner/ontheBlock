import React, { useContext, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  Switch,
  Image,
  KeyboardAvoidingView
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
import TextField from "../../Component/FloatTextField/FloatTextField";
import Layout from "../../Component/Layout/Layout";
import UserContext from "../../context/User/User";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import { ScrollView } from "react-native-gesture-handler";


export default function EditProfile(props) {
  const user = useContext(UserContext);
  console.log("Profile user Context", user);
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  
 const [fname, setFname] = useState('');
 const [fnameError, setFnameError] = useState(false)

 const [lname, setLname] = useState('')
 const [lnameError, setLnameError] = useState(false)

 const [email, setEmail] = useState('')
 const [emailError, setEmailError] = useState(false)

 const [phone, setPhone] = useState('')
 const [phoneError, setPhoneError] = useState(false)

 const [address, setAddress] = useState('')
 

  return (
    <Layout
      navigation={props.navigation}
      LeftIcon={true}
      pagetitle={"Edit Profile"}
    //   style={styles().ph20}
    >
<View style={styles().flex}>
      
<KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "height"}
        keyboardVerticalOffset={100}

      >
        <ScrollView showsVerticalScrollIndicator={false}>
            
        <View style={styles().mb20}>
            <TextField
            keyboardType="default"
            value={fname}
            label="First Name"
            errorText={fnameError}
            autoCapitalize="none"
            style
            onChangeText={(text) => {
                setFnameError(false);
                setFname(text);
            }}
            />
        </View>

        <View style={styles().mb20}>
            <TextField
            keyboardType="default"
            value={lname}
            label="Last Name"
            errorText={lnameError}
            autoCapitalize="none"
            style
            onChangeText={(text) => {
                setLnameError(false);
                setLname(text);
            }}
            />
        </View>

        <View style={styles().mb20}>
            <TextField
            keyboardType="default"
            value={email}
            label="Email"
            errorText={emailError}
            autoCapitalize="none"
            style
            onChangeText={(text) => {
                setEmailError(false);
                setEmail(text);
            }}
            />
        </View>

        <View style={styles().mb20}>
            <TextField
            keyboardType="numeric"
            value={phone}
            label="Phone Number"
            errorText={phoneError}
            autoCapitalize="none"
            style
            onChangeText={(text) => {
                setPhoneError(false);
                setPhone(text);
            }}
            />
        </View>

        <View style={styles().mb20}>
            <TextField
            keyboardType="default"
            value={address}
            label="Address (optional)"
           autoCapitalize="none"
            style
            stylesInput={styles().h100px}
            onChangeText={(text) => {
                
                setAddress(text);
            }}
            />
        </View>

        </ScrollView>
        </KeyboardAvoidingView>
        
        </View>

      <View>
            <ThemeButton Title={'Save'} Style={styles().mb20} />
      </View>
      
    </Layout>
  );
}
