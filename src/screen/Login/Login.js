import React , { useContext ,useEffect,useState,  } from 'react'
import {  Platform,Animated, Dimensions, FlatList, Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';
import { CommonActions } from '@react-navigation/native';
import { Ionicons , Foundation, FontAwesome5, Feather, Octicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import Layout from '../../Component/Layout/Layout';
import TextField from '../../Component/TextField/TextField';
import ThemeButton from '../../Component/ThemeButton/ThemeButton';

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
    <Layout navigation={props.navigation} LeftIcon={true} withoutScroll={true} pagetitle={'Login'} homeGrad={true} ProfileImg={false} >
        
    <View>
      <TextField 
        SetEditinfo={(e)=> {
          setUserError(false)
          SetUserName(e)
        }
        } 
        value={UserName} 
        StyleError={{borderColor: UserError ? currentTheme.red : currentTheme.white, borderWidth: 1}}
        PlaceholderInfo={'UserName'} 
      />
    </View>
    <View style={[styles().mt5, styles().mb25]}>
      <TextField 
        SetEditinfo={(e)=> {
          setPasswordError(false)
          SetPassword(e)
        }
        } 
        value={Password} 
        PlaceholderInfo={'Password'} 
        eye={true}
        StyleError={{borderColor: passError ? currentTheme.red : currentTheme.white, borderWidth: 1}}
      />
    </View>
    <TouchableOpacity onPress={()=>props.navigation.navigate('ForgotPassword')}>
      <Text style={[styles().fs14, styles().fontRegular, {color:currentTheme.blue}]}>Forget Password</Text>
    </TouchableOpacity>

    <View style={[styles().flexRow, styles().mt20, styles().justifyBetween]}>
      <ThemeButton Title={'Register'} onPress={()=> props.navigation.navigate('Signup')} Style={[styles().w48, {backgroundColor:currentTheme.borderColor, borderColor:currentTheme.borderColor}]} />
      <ThemeButton Title={'Sign in'} 
        onPress={()=> 
          {
            if(validate()){
              // console.log('asd')
              props.navigation.dispatch(
                CommonActions.reset({
                  index:0, routes:[{name:'Home'}]
                })
                )
            }
          }
        } 
        Style={styles().w48} />
    </View>

    

    



    
         
    </Layout>
    )
}
