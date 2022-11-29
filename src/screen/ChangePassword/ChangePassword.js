import React , { useContext ,useState  } from 'react'
import {  Platform, Dimensions, FlatList, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';
import { gql, useMutation } from '@apollo/client'
import Layout from '../../Component/Layout/Layout';
import TextField from '../../Component/TextField/TextField';
import ThemeButton from '../../Component/ThemeButton/ThemeButton';
import { resetPassword, profile } from '../../apollo/server';
import Spinner from '../../Component/Spinner/Spinner';
import { useQuery } from '@apollo/react-hooks';
import FlashMessage from '../../Component/FlashMessage/FlashMessage';

const RESET_PASSWORD = gql`${resetPassword}`
const PROFILE = gql`${profile}`
export default function ChangePassword(props){

  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  const [OldPassword, setOldPassword] = useState('')
  const [NewPassword, setNewPassword] = useState('')
  const [NewPasswordTwo, setNewPasswordTwo] = useState('')
  const [ loading ,setLoading ]= useState(false);
  const [ errorMisMatch ,setErrorMisMatch ]= useState('');

  const [mutate, { client }] = useMutation(RESET_PASSWORD, { onCompleted, onError })
  const { loading: loadingProfile, error: errorProfile, data: dataProfile } = useQuery(PROFILE ,{ fetchPolicy: "no-cache"})
  async function onCompleted(data){
    try {
       console.log(" data ",data?.resetPassword?.result)
       if(data?.resetPassword?.result === true){
        setErrorMisMatch('')
        FlashMessage({ msg : 'Password Reset Successfull' , type: "success"})
       }else{
        FlashMessage({ msg : 'Something went wrong' , type: "danger"})
       }
       setLoading(false)
    }
    catch (e) {
        console.log(e)
    }
    finally {
        setLoading(false)
    }
  }

  function onError(error){
    FlashMessage({ msg : 'Something went wrong' , type: "danger"})
    setErrorMisMatch('')
      setLoading(false)
      console.log('error',error)
  }

  function validation (){
    console.log('validation',NewPassword)
    console.log('NewPasswordTwo',NewPasswordTwo)
    if(NewPassword.toString() !== NewPasswordTwo.toString()){
      setErrorMisMatch('New Password and re-enter Password should be same.')
      setLoading(false)
      return false
    }
    return true
  }

  
    return( 
    <Layout navigation={props.navigation} withoutScroll={true} LeftIcon={true} pagetitle={'Change Password'} style={[styles().mb0]}>
      
      <View> 
        <TextField 
          title={'Enter Old Password'} 
          SetEditinfo={(e)=> setOldPassword(e)} 
          value={OldPassword} 
          secureEntry={true}
          PlaceholderInfo={'Existing Password'} 
          eye={true}
        />
      </View>
        
      <View style={styles().mt15}>
        <TextField 
          title={'Enter New Password'} 
          SetEditinfo={(e)=> setNewPassword(e)} 
          value={NewPassword} 
          secureEntry={true}
          PlaceholderInfo={'New Password'} 
          eye={true}
        />
      </View>
        
        
      <View style={styles().mt5}>
        <TextField 
          title={'Enter New Password Again'} 
          SetEditinfo={(e)=> setNewPasswordTwo(e)} 
          value={NewPasswordTwo} 
          PlaceholderInfo={'Confirm New Password'}
          eye={true} 
        />

        
      </View>
      {
        errorMisMatch ? 
        <Text style = {{color: 'red'}} >{errorMisMatch}</Text>
        : null 
      }
      <View style={[styles().justifyEnd, styles().mt15, styles().flexRow]}>
        {!loading ?
        <ThemeButton Style={styles().w48} Title={"Update"} 
         onPress={() => {
          setLoading(true)

            if(validation()){
              let user = {
                password: OldPassword,
                email :dataProfile?.profile?.email,
                newPassword : NewPasswordTwo
            }
console.log("data",user);
            mutate({ variables: { ...user } }) 
            }
              

      }}
        
        /> : <Spinner />
    }
      </View>
    
     
    </Layout>
    )
}


