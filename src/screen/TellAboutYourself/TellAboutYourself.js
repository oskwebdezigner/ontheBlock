import React , { useContext ,useEffect,useState,  } from 'react'
import {  Platform,Animated, Dimensions, FlatList, Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';
import { CommonActions } from '@react-navigation/native';
import { Ionicons , Foundation, FontAwesome5, Feather, Octicons, AntDesign, FontAwesome } from '@expo/vector-icons';

// import TextField from '../../Component/TextField/TextField';
import ThemeButton from '../../Component/ThemeButton/ThemeButton';
import AuthLayout from '../../Component/AuthLayout/AuthLayout';
import TextField from '../../Component/FloatTextField/FloatTextField';

const {width, height} = Dimensions.get('window');


export default function TellAboutYourself(props){

  
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  
  const [FirstName, SetFirstName] = useState('')
  const [FirstNameError, SetFirstNameError] = useState(false)

  const [LastName, SetLastName] = useState('')
  const [LastNameError, SetLastNameError] = useState(false)

  const [Email, SetEmail] = useState('')
  const [EmailError, SetEmailError] = useState(false)

  const [PhoneNumber, SetPhoneNumber] = useState('')
  const [PhoneNumberError, SetPhoneNumberError] = useState(false)

//   function validate(){
//     let status = true
//     if(UserName === ''){
//       setUserError(true)
//       status = false
//     }
//     if(Password === ''){
//       setPasswordError(true)
//       status = false
//     }
//     return status
//   }
  

return( 
    <AuthLayout navigation={props.navigation}>
        
    <View style={[styles().w150px, styles().h100px]}>
      <Image source={require('../../assets/images/logo.png')} resizeMode="cover" style={styles().wh100} />
    </View>

    <View style={[styles().mt25, styles().mb15]}>
        <Text style={[styles().fs24, styles().fontRegular, {color:currentTheme.black}]}>Tell us About</Text> 
         <Text style={[styles().fs24, styles().fontSemibold, styles().lh30, styles().fw600, {color:currentTheme.themeBackground}]}>Yourself</Text> 
    </View>

    <View style={styles().mb20}>
      <TextField
            keyboardType='default'
            value={FirstName}
            label="First Name"
            errorText={FirstNameError}
            autoCapitalize='none'
            style
            onChangeText={(text) => {
              SetFirstNameError(false)
              SetFirstName(text)
            }}
        />
    </View>

    <View style={styles().mb20}>
      <TextField
            keyboardType='default'
            value={LastName}
            label="Last Name"
            errorText={LastNameError}
            autoCapitalize='none'
            style
            onChangeText={(text) => {
                SetLastNameError(false)
              SetLastName(text)
            }}
        />
    </View>

    <View style={styles().mb20}>
      <TextField
            keyboardType='default'
            value={Email}
            label="Email"
            errorText={EmailError}
            autoCapitalize='none'
            style
            onChangeText={(text) => {
                SetEmailError(false)
              SetEmail(text)
            }}
        />
    </View>

    <View style={styles().mb20}>
      <TextField
            keyboardType='numeric'
            value={PhoneNumber}
            label="Phone Number"
            errorText={PhoneNumberError}
            autoCapitalize='none'
            style
            onChangeText={(text) => {
              SetPhoneNumberError(false)
              SetPhoneNumber(text)
            }}
        />
    </View>

    <View style={styles().mb20}>
      <TextField
            keyboardType='default'
            value={''}
            label="Address (optional)"
            // errorText={UserError}
            autoCapitalize='none'
            style
            onChangeText={(text) => {
            //   setUserError(false)
            //   SetUserName(text)
            }}
        />
    </View>

    <View style={styles().mt10}>
      <ThemeButton Title={'Next'} onPress={()=>props.navigation.navigate('Verification')} />
      <ThemeButton Title={'Back'} withoutBg={true} Style={styles().mt20} onPress={()=>props.navigation.goBack()} />
    </View>
    
         
    </AuthLayout>
    )
}
