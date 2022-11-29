import React, { useState, useRef, useContext ,useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import styles from '../styles'

import ThemeContext from '../../context/ThemeContext/ThemeContext'
import { theme } from '../../context/ThemeContext/ThemeColor'

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Layout from '../../Component/Layout/Layout';
import TextField from '../../Component/TextField/TextField';
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

    const [Username, setUsername] = useState('')
    const [Usererror, setUserError] = useState(null)

    const [loading , setLoading] = useState(false)

    const isFocused = useIsFocused()

    useEffect(() => {
        setUsername('')
        setUserError(null)
    },[isFocused])

    function validation(){
        let status = true
        const emailError = validateFunc(Username ? { email: Username } : null,'email')
        if(emailError){
            setUserError(...emailError.email)
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
        <Layout navigation={props.navigation} LeftIcon={true} withoutScroll={true} pagetitle={'Forgot Password'} homeGrad={true} ProfileImg={false} >
            
            <View style={styles().mt10}>
                <Text style={[styles().fs14, styles().fontRegular,{color:currentTheme.borderColor}]}>
                    Enter the email address link with your account to reset your password.
                </Text>
            </View>

            <View style={styles().mt10}>
                <TextField
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={Username}
                    PlaceholderInfo="Email Address"
                    errorText={Usererror}
                    style
                    SetEditinfo={(e)=> {
                        setUserError(null)
                        setUsername(text)
                      }
                      } 
                    onChangeText={(text) => {
                        setUserError(null)
                        setUsername(text)
                    }}
                />
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
                    
                    Title={"Send Instruction"}
                /> : <Spinner /> }   
            </View>
       

        </Layout>
    )
}