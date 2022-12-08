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


export default function Login(props){

  
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  const [UserName, SetUserName] = useState('');
  const [UserError, setUserError] = useState(false)
  const [Password, SetPassword] = useState('');
  const [passError, setPasswordError] = useState(false)


  function validate(){
    let status = true
    if(UserName === ''){
      setUserError(true)
      status = false
    }
    if(Password === ''){
      setPasswordError(true)
      status = false
    }
    return status
  }
  

return( 
    <AuthLayout navigation={props.navigation}>
        
    <View style={[styles().w150px, styles().h100px]}>
      <Image source={require('../../assets/images/logo.png')} resizeMode="cover" style={styles().wh100} />
    </View>

    <View style={[styles().mt25, styles().mb35]}>
      <Text style={[styles().fs20, styles().fontSemibold, styles().lh30, styles().fw600, {color:currentTheme.themeBackground}]}>Howdy,</Text>
      <Text style={[styles().fs20, styles().fontRegular, {color:currentTheme.black}]}>Welcome</Text>
    </View>

    <View style={styles().mb20}>
      <TextField
            keyboardType='default'
            value={UserName}
            label="Email/ Phone number"
            errorText={UserError}
            autoCapitalize='none'
            style
            onChangeText={(text) => {
              setUserError(false)
              SetUserName(text)
            }}
        />
    </View>

    <View style={[styles().mb25]}>
      <TextField 
        keyboardType='default'
        onChangeText={(e)=> {
          setPasswordError(false)
          SetPassword(e)
        }
        } 
        value={Password} 
        label="Password"
        errorText={passError}
        autoCapitalize='none'
        style
      />
    </View>
    <TouchableOpacity onPress={()=>props.navigation.navigate('ForgotPassword')} style={[styles().alignEnd]}>
      <Text style={[styles().fs13, styles().fontRegular, styles().textDecorationUnderline, {color:currentTheme.textColor}]}>Forget Password</Text>
    </TouchableOpacity>

    <View style={[styles().mt20]}>
      <ThemeButton Title={'Sign in'} 
        // onPress={()=> 
        //   {
        //     if(validate()){
        //       // console.log('asd')
        //       props.navigation.dispatch(
        //         CommonActions.reset({
        //           index:0, routes:[{name:'Home'}]
        //         })
        //         )
        //     }
        //   }
        // } 
        onPress={()=>props.navigation.navigate('noDrawer')}
        />
    </View>

    <View style={[styles().flexRow, styles().mv25, styles().justifyBetween, styles().alignCenter]}>
      <View style={[styles().flex, {height:2, backgroundColor:currentTheme.cEFEFEF}]} />
      <Text style={[styles().fs12, styles().mh20, styles().fontRegular, {color:currentTheme.textColor}]}>Or Sign in with</Text>
      <View style={[styles().flex, {height:2, backgroundColor:currentTheme.cEFEFEF}]} />
    </View>

    <View style={styles().mb25}>
      <TouchableOpacity style={[styles().bw1, styles().br50, styles().h50px, styles().alignCenter, styles().justifyCenter]}>
        <Text style={[styles().fs14, styles().fontRegular, styles().lh30, {color:currentTheme.black}]}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>

    <View style={[styles().flexRow, styles().justifyCenter, styles().alignCenter]}>
      <Text style={[styles().fs12, styles().fontRegular, {color:currentTheme.lightBlue}]}>Dont Have an account ? </Text>
      <TouchableOpacity onPress={()=>props.navigation.navigate('LetsBegin')}>
        <Text style={[styles().fs12, styles().fontSemibold, styles().fw600, {color:currentTheme.themeBackground}]}>Sign up</Text>
      </TouchableOpacity>
    </View>



    

    



    
         
    </AuthLayout>
    )
}
