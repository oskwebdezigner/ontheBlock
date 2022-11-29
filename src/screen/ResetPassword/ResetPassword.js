import React, { useState, useRef, useContext , useEffect} from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

import styles from '../styles'
import fontStyles from '../../utils/fonts/fontStyles'
import ThemeContext from '../../context/ThemeContext/ThemeContext'
import { theme } from '../../context/ThemeContext/ThemeColor'
import ThemeButton from '../../Component/ThemeButton/ThemeButton'
import { Ionicons ,FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { validateFunc } from '../../constraints/constraints'
import { useIsFocused } from '@react-navigation/native'
import { newPassword } from '../../apollo/server';
import { gql, useMutation } from '@apollo/client'
import Spinner from '../../Component/Spinner/Spinner'
import { CommonActions } from '@react-navigation/native';
import Layout from '../../Component/Layout/Layout';
import TextField from '../../Component/TextField/TextField';


const NEW_PASSWORD = gql`${newPassword}`

export default function ResetPassword(props) {

    const themeContext = useContext(ThemeContext)
    const currentTheme = theme[themeContext.ThemeValue]

    const [password, setPassword] = useState('')
    const [passwordError, setpasswordError] = useState(null)

    const [cpassword, setCpassword] = useState('')
    const [cpasswordErr, setCpasswordErr] = useState(null)

    const [iconEye, setIconEye] = useState("eye-slash")
    const [CiconEye, setCIconEye] = useState("eye-slash")

    const isFocused = useIsFocused()

    const [ loading ,setLoading ]= useState(false);


    useEffect(() =>{
        setPassword('')
        setpasswordError(null)
        setCpassword('')
        setCpasswordErr(null)
    },[isFocused])

    function onChangeIcon  (status) {

        if(status === 'password')
        {
            if(iconEye === 'eye'){
                setIconEye('eye-slash')
            } else{
                setIconEye('eye')
            }
        }
        else{
            if(CiconEye === 'eye'){
                setCIconEye('eye-slash')
            } else{
                setCIconEye('eye')
            }
        }
        
    }

    function validation(){
        let status = true
       
        const passwordErr = validateFunc(password ? { password } : null,'password')
        const cpasswordErr = validateFunc(cpassword ? { password, confirmPassword : cpassword } : null,'confirmPassword')

        if(passwordErr){
            setpasswordError(...passwordErr.password)
            status = false
        }
        if(cpasswordErr){
            setCpasswordErr(...cpasswordErr.confirmPassword)
            status = false
        }
        return status
    }


    const [mutate, { client }] = useMutation(NEW_PASSWORD, { onCompleted, onError })

    async function onCompleted(data){
        try {
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Auth'}],
                })
            );
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }

    function onError(error){
        setLoading(false)
        console.log('error',error)
    }

    return (
        <Layout navigation={props.navigation} LeftIcon={true} withoutScroll={true} pagetitle={'Reset Password'} homeGrad={true} ProfileImg={false} >
          
            <View style={[styles().mt10]}>
                <Text style={[styles().fs14, styles().fontRegular, styles().lh22, {color:currentTheme.borderColor}]}>Your new password must be different 
                from previous used password.</Text>
            </View>

            <View style={styles().mt10}>
                 <TextField
                    value={password}
                    PlaceholderInfo="Password"
                    errorText={passwordError}
                    eye={true}
                    onChangeText={(text) => {
                        setpasswordError(null)
                        setPassword(text)
                    }}
                    SetEditinfo={(text) => {
                        setpasswordError(null)
                        setPassword(text)
                    }}
                    
                />
            </View>
            <View style={styles().mt5}>
               <TextField
                    value={cpassword}
                    PlaceholderInfo="Confirm password"
                    errorText={cpasswordErr}
                    eye={true}
                    onChangeText={(text) => {
                        setCpasswordErr(null)
                        setCpassword(text)
                    }}
                    SetEditinfo={(text) => {
                        setCpasswordErr(null)
                        setCpassword(text)
                    }}
                    
                />
            </View>

            <View style={styles().mt20}>
                {!loading ? <ThemeButton
                    onPress={() => {
                        setLoading(true)
                        if(validation()){

                            let user = {
                                email : props.route?.params?.email,
                                newPassword : password
                            }

                            mutate({ variables: { ...user } }) 
                        }
                        else{
                            setLoading(false)
                        }
                    }}
                    
                    
                    Title={"Reset Password"}
                /> : <Spinner />
            } 
            </View>
        </Layout>

    )
}