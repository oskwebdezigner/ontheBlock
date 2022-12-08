import React, { useState, useRef, useContext ,useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import styles from '../styles'

import ThemeContext from '../../context/ThemeContext/ThemeContext'
import { theme } from '../../context/ThemeContext/ThemeColor'

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AuthLayout from '../../Component/AuthLayout/AuthLayout';
import TextField from '../../Component/FloatTextField/FloatTextField';
import ThemeButton from '../../Component/ThemeButton/ThemeButton';

import { validateFunc } from '../../constraints/constraints'
import { useIsFocused } from '@react-navigation/native'
import { forgotPassword } from '../../apollo/server';
import { gql, useMutation } from '@apollo/client'
import Spinner from '../../Component/Spinner/Spinner'

const FORGOT_PASSWORD = gql`${forgotPassword}`

export default function ForgotPassword(props) {

    const themeContext = useContext(ThemeContext)
    const currentTheme = theme[themeContext.ThemeValue]

    const [PhoneNumber, setPhoneNumber] = useState('')
    const [PhoneNumbererror, setPhoneNumberError] = useState(null)

    const [loading , setLoading] = useState(false)

    const isFocused = useIsFocused()

    useEffect(() => {
        setPhoneNumber('')
        setPhoneNumberError(null)
    },[isFocused])

    function validation(){
        let status = true
        const emailError = validateFunc(Username ? { email: Username } : null,'email')
        if(emailError){
            setPhoneNumberError(...emailError.email)
            status = false
        }
        return status
    }

    const [mutate, { client }] = useMutation(FORGOT_PASSWORD, { onCompleted, onError })

    async function onCompleted(data){
        try {
            props.navigation.navigate('Verification',{ email : Username })
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
        <AuthLayout navigation={props.navigation}>
      
        <View style={styles().flex}>
            <View style={[styles().w150px, styles().h100px]}>
                <Image source={require('../../assets/images/logo.png')} resizeMode="cover" style={styles().wh100} />
            </View>

            <View style={[styles().mt25]}>
                <Text style={[styles().fs24, styles().fontRegular, {color:currentTheme.black}]}>
                    Forgot
                    <Text style={[styles().fs24, styles().fontSemibold, styles().lh30, styles().fw600, {color:currentTheme.themeBackground}]}> Password</Text> 
                </Text> 
                
            </View>

            <View style={styles().mt10}>
                
                <TextField
                    keyboardType='numeric'
                    value={PhoneNumber}
                    label="Phone Number"
                    errorText={PhoneNumbererror}
                    autoCapitalize='none'
                    style
                    onChangeText={(text) => {
                        setPhoneNumberError(false)
                        setPhoneNumber(text)
                    }}
                />
            </View>

            </View>

            <View style={styles().mt20}>
             {!loading ? <ThemeButton
                    onPress={() => {
                        // setLoading(true)
                        // if(validation()){
                        //      let user = {
                        //         email : Username.toLowerCase().trim(),
                        //     }
                        //     mutate({ variables: { ...user } }) 
                        //  }
                        //  else{
                        //         setLoading(false)
                        //     }
                        props.navigation.navigate('Verification',{ email : Username })
                        }}
                    
                    Title={"Send"}
                /> : <Spinner /> }   
            </View>
       

        </AuthLayout>
    )
}