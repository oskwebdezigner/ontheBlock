import React, { useState, useRef, useContext } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from '../styles'
import ThemeContext from '../../context/ThemeContext/ThemeContext'
import { theme } from '../../context/ThemeContext/ThemeColor'
import ThemeButton from '../../Component/ThemeButton/ThemeButton'
import { Ionicons } from '@expo/vector-icons';
import Layout from '../../Component/Layout/Layout';
import FlashMessage from '../../Component/FlashMessage/FlashMessage'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { forgotPasswordVerfication, verifyAccount } from '../../apollo/server';
import { gql, useMutation } from '@apollo/client'
import Spinner from '../../Component/Spinner/Spinner'

import AuthLayout from '../../Component/AuthLayout/AuthLayout';

const VERIFY_ACCOUNT = gql`${verifyAccount}`


const CELL_COUNT = 6;
export default function Verification(props) {
    console.log('Verification props>>>>>>>>>>>',props)
    const themeContext = useContext(ThemeContext)
    const currentTheme = theme[themeContext.ThemeValue]

    const [value, setValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const [ loading ,setLoading ]= useState(false);
    const [mutate, { client }] = useMutation(VERIFY_ACCOUNT, { onCompleted, onError })

    async function onCompleted(data){
        try {
            FlashMessage({ msg : 'Account Verified Successfully' , type: "success"})
            props.navigation.navigate('SignIn')
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }

    function onError(error){
        FlashMessage({ msg : error.toString() , type: "danger"})
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
                        Phone
                        <Text style={[styles().fs24, styles().fontSemibold, styles().lh30, styles().fw600, {color:currentTheme.themeBackground}]}> Verification</Text> 
                    </Text> 
                    <Text style={[styles().fontRegular, {color:currentTheme.textColor}, styles().fs14]}>Please enter 6 digit code send to your phone number +1 357 *****</Text>
                </View>

                <View style={[styles().mt30, styles().mb10]}>
                    
                    <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={[]}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => {
                            return <View
                                key={index}
                                style={[styles(currentTheme).verifyContainer,
                                isFocused && {
                                    borderColor: currentTheme.themeBackground,
                                    borderWidth:1
                                }]}>
                                <Text
                                    style={[
                                        styles().fs24,
                                        styles().fontRegular,
                                        {
                                            color: currentTheme.themeBackground,
                                            // backgroundColor: currentTheme.white
                                        }]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : '-')}
                                </Text>
                            </View>
                        }
                        }
                    />

                    <View style={[styles().flexRow, styles().mt15, styles().justifyCenter, styles().alignCenter]}>
                        <Text style={[styles().fontRegular,  {color : currentTheme.black}, styles().fs14]}>
                            Resend code after 
                            <Text style={{color : currentTheme.themeBackground}}> 2:15 </Text>
                            Min.
                            </Text> 
                            <TouchableOpacity onPress={()=>props.navigation.navigate('ResetPassword')}>
                                <Text style={[styles().fontSemibold, styles().fs14, styles().textDecorationUnderline, { color : currentTheme.themeBackground}]}> Resend</Text>
                                </TouchableOpacity>
                        
                    </View>
                </View>

            </View>

            <View>
             {!loading ? 
             <ThemeButton
                    // onPress={() => {
                    //     setLoading(true)
                    //     if(value.length === 4){

                    //         let user = {
                    //             email : props.route?.params?.email,
                    //             code : value,
                    //             emailCode: emailValue
                    //         }

                    //         console.log('value',user)

                    //         mutate({ variables: { ...user } }) 
                    //     }
                    //     else {
                    //         setLoading(false)
                    //     }
                    // }}
                    onPress={()=>props.navigation.navigate('CreatePassword')}
                    
                    Title={"Verify"}
                />
               : <Spinner /> }  
            </View>
        
        </AuthLayout>
    )
}