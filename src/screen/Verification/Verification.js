import React, { useState, useRef, useContext } from 'react'
import { View, Text } from 'react-native'
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
import { TouchableOpacity } from 'react-native-gesture-handler'

const VERIFY_ACCOUNT = gql`${verifyAccount}`


const CELL_COUNT = 4;
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
        <Layout navigation={props.navigation} LeftIcon={true} withoutScroll={true} pagetitle={'Verification'} homeGrad={true} ProfileImg={false} >
         
            <View style={[styles().mt10]}>
                <Text style={[styles().fontRegular, {color:currentTheme.borderColor}, styles().fs14]}>Enter the email address link with your 
                account to reset your password.</Text>
            </View>

            <View style={[styles().mt30, styles().mb25]}>
                
                <Text style={[styles().fs14, styles().fw400, styles().mb10, {color:currentTheme.c111111}]}>Enter Code From Phone Number</Text>
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
                                        backgroundColor: currentTheme.white
                                    }]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        </View>
                    }
                    }
                />

            <View style={[styles().mt35, styles().alignCenter]}>
                <Text style={[styles().fontRegular,  {color : currentTheme.borderColor}, styles().fs14]}>
                    Resend code after 
                    <Text style={{color : currentTheme.themeBackground}}>2:15 </Text>
                    Min. 
                    <TouchableOpacity onPress={()=>props.navigation.navigate('ResetPassword')}>
                        <Text style={[styles().textDecorationUnderline, { color : currentTheme.themeBackground}]}>Resend</Text>
                        </TouchableOpacity>
                </Text>
            </View>

                

            </View>

            <View>
             {!loading ? 
             <ThemeButton
                    onPress={() => {
                        setLoading(true)
                        if(value.length === 4){

                            let user = {
                                email : props.route?.params?.email,
                                code : value,
                                emailCode: emailValue
                            }

                            console.log('value',user)

                            mutate({ variables: { ...user } }) 
                        }
                        else {
                            setLoading(false)
                        }
                    }}
                    StyleText={{ textTransform: 'uppercase' }}
                   
                    Title={"Verify"}
                />
               : <Spinner /> }  
            </View>
        
        </Layout>
    )
}