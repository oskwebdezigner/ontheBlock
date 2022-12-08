import React , { useContext ,useState  } from 'react'
import {  Platform, Dimensions, FlatList, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';

import AuthLayout from '../../Component/AuthLayout/AuthLayout';
import TextField from '../../Component/FloatTextField/FloatTextField';
import ThemeButton from '../../Component/ThemeButton/ThemeButton';
import { AntDesign ,Ionicons,FontAwesome} from '@expo/vector-icons';

import Spinner from '../../Component/Spinner/Spinner';



export default function CreatePassword(props){

  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  const [Password, SetPassword] = useState('');
  const [passError, setPasswordError] = useState(false)

  const [ConfirmPassword, SetConfirmPassword] = useState('')
  const [ConfirmPasswordError, SetConfirmPasswordError] = useState(false)

  const [iconEye, setIconEye] = useState("eye-slash")
  function onChangeIcon  () {
    if(iconEye === 'eye'){
        setIconEye('eye-slash')
    } else{
        setIconEye('eye')
    }
}
const [ConfirmiconEye, setConfirmIconEye] = useState("eye-slash")
function onChangeIconConfirm  () {
    if(ConfirmiconEye === 'eye'){
        setConfirmIconEye('eye-slash')
    } else{
        setConfirmIconEye('eye')
    }
}

  
    return( 
        <AuthLayout navigation={props.navigation}>
      
        <View style={styles().flex}>
            <View style={[styles().w150px, styles().h100px]}>
                <Image source={require('../../assets/images/logo.png')} resizeMode="cover" style={styles().wh100} />
            </View>

            <View style={[styles().mt25]}>
                <Text style={[styles().fs24, styles().fontRegular, {color:currentTheme.black}]}>
                    Create Your
                    <Text style={[styles().fs24, styles().fontSemibold, styles().lh30, styles().fw600, {color:currentTheme.themeBackground}]}> New {'\n'} Password</Text> 
                </Text> 
                
            </View>

            <View style={styles().mt15}>
                <TextField 
                    keyboardType='default'
                    secureTextEntry={iconEye === 'eye' ? false : true}
                    onChangeText={(e)=> {
                    setPasswordError(false)
                    SetPassword(e)
                    }
                    } 
                    value={Password} 
                    label="Password"
                    errorText={passError}
                    childrenPassword={
                        <TouchableOpacity 
                        onPress = {onChangeIcon.bind()} 
                        style={[
                            styles().passEye
                            ]}>
                              <FontAwesome name={iconEye} size={16} color={currentTheme.textColor} />
                        </TouchableOpacity>
                    }
                    autoCapitalize='none'
                    style
                />
            </View>
        
        
      <View style={styles().mt5}>
      
      <TextField 
                    keyboardType='default'
                    onChangeText={(e)=> {
                    SetConfirmPasswordError(false)
                    SetConfirmPassword(e)
                    }
                    } 
                    value={ConfirmPassword} 
                    label="Retype Password"
                    secureTextEntry={ConfirmiconEye === 'eye' ? false : true}
                    errorText={ConfirmPasswordError}
                    childrenPassword={
                        <TouchableOpacity 
                        onPress = {onChangeIconConfirm.bind()} 
                        style={[
                            styles().passEye
                            ]}>
                              <FontAwesome name={ConfirmiconEye} size={16} color={currentTheme.textColor} />
                        </TouchableOpacity>
                    }
                    autoCapitalize='none'
                    style
                />
        
      </View>

      </View>
      
      <View style={[ styles().mt15]}>
        
        <ThemeButton Title={"Next"} 
        onPress={()=>props.navigation.navigate('TellAboutHome')}
         
        
        /> 
      </View>
    
     
    </AuthLayout>
    )
}


