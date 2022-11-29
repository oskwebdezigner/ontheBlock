import React, { useState, useRef, useContext , useEffect } from 'react'
import { View, Text, TouchableOpacity, ImageBackground ,ScrollView, KeyboardAvoidingView } from 'react-native'
import styles from '../styles'

import ThemeContext from '../../context/ThemeContext/ThemeContext'
import { theme } from '../../context/ThemeContext/ThemeColor'
import ThemeButton from '../../Component/ThemeButton/ThemeButton'
import { AntDesign ,Ionicons,FontAwesome} from '@expo/vector-icons';

import { useIsFocused } from '@react-navigation/native'
import { validateFunc } from '../../constraints/constraints'
import PhoneInput from "react-native-phone-input";
import Layout from '../../Component/Layout/Layout';
import TextField from '../../Component/TextField/TextField';
import { createUser } from '../../apollo/server';
import { gql, useMutation } from '@apollo/client'
import Spinner from '../../Component/Spinner/Spinner'
import FlashMessage from '../../Component/FlashMessage/FlashMessage'
const CREATE_USER = gql`${createUser}`

export default function Signup(props) {

    const themeContext = useContext(ThemeContext)
    const currentTheme = theme[themeContext.ThemeValue]

    const [firstname, setFirstname] = useState('')
    const [firstnameErr, setFirstnameErr] = useState(null)

    const [lastname, setLastname] = useState('')
    const [lastnameErr, setLastnameErr] = useState(null)

    const [email, SetEmail] = useState('')
    const [emailError, SetemailError] = useState(false)

    const [number, setNumber] = useState('')
    const [numberErr, setNumberErr] = useState(null)

    const [referralId, setReferralId] = useState('')
    const [referralIdErr, setReferralIdErr] = useState(null)
    const numberRef = useRef(null);

    const [Username, setUsername] = useState('')
    const [Usererror, setUserError] = useState(null)

    const [Password, setPassword] = useState('')
    const [PasswordError, setPasswordError] = useState(null)
    const [iconEye, setIconEye] = useState("eye-slash")

    const [modalVisible, setModalVisible] = useState(false);

    const [loading , setLoading ] = useState(false)

    const [terms, SetTerms] = useState(false);

    const isFocused = useIsFocused()

    useEffect(() =>{
        emptyField()
    },[isFocused])


    function emptyField(){
        setFirstname('')
        setFirstnameErr(null)
        setLastname('')
        setLastnameErr(null)
        setNumber('')
        setNumberErr(null)
        setUsername('')
        setUserError(null)
        setPassword('')
        setPasswordError(null)
        setReferralId('')
        setReferralIdErr(null)
    }

    function validation(){
        let status = true

        const firstnameErr = validateFunc(firstname ? { firstname } : null,'firstname')
        const lastNameErr = validateFunc(lastname ? { lastname } : null,'lastname')
        const numberErr = validateFunc(number ? { mobile : number } : null,'mobile')
        const emailError = validateFunc(Username ? { email: Username } : null,'email')
        const passError = validateFunc(Password ? { password: Password } : null,'password')
        const referralIdErr = validateFunc(referralId ? { referralId : referralId } : null , 'referralId')
        if(firstnameErr){
            setFirstnameErr(...firstnameErr.firstname)
            status = false
        }
        if(numberErr){
            setNumberErr(...numberErr.mobile)
            status = false
        }
        if(emailError){
            setUserError(...emailError.email)
            status = false
        }
        if(passError){
            setPasswordError(...passError.password)
            status = false
        }
        if(referralIdErr){
            setReferralIdErr(...referralIdErr.referralId)
            status = false
        }
        return status
    }

    function onChangeIcon  () {
        if(iconEye === 'eye'){
            setIconEye('eye-slash')
        } else{
            setIconEye('eye')
        }
    }

    const [mutate, { client }] = useMutation(CREATE_USER, { onCompleted, onError })

    async function onCompleted(data){
        try {
            FlashMessage({ msg : 'Account Verified Successfully' , type: "success"})
            props.navigation.navigate('Verification' , {email: Username} )
            // setModalVisible(!modalVisible)
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
        FlashMessage({ msg : error.toString() , type: "danger"})
        console.log('error',error)
    }

    const {ref} = useRef();

    return (
        <Layout navigation={props.navigation} LeftIcon={true} withoutScroll={true} pagetitle={'Create Account'} homeGrad={true} ProfileImg={false} >
     
     
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView showsVerticalScrollIndicator={false} >
                
                <View style={[styles().mb5]}>
                    <TextField
                        keyboardType='default'
                        value={firstname}
                        PlaceholderInfo="First Name"
                        errorText={firstnameErr}
                        autoCapitalize='none'
                        SetEditinfo={(text) => {
                            setFirstnameErr(null)
                            setFirstname(text)
                        }}
                    />
                </View>

                <View style={[styles().mb5]}>
                    <TextField
                        keyboardType='default'
                        value={lastname}
                        PlaceholderInfo="Last Name"
                        errorText={lastnameErr}
                        autoCapitalize='none'
                        SetEditinfo={(text) => {
                            setLastnameErr(null)
                            setLastname(text)
                        }}
                    />
                    
                </View>

                <View style={[styles().mb5]}>
                    
                    <PhoneInput ref={ref} initialCountry={'pk'}
                    // flagStyle={{display : 'none'}}
                        style={[
                            styles().h50px,
                            styles().pl15,
                            styles(currentTheme).bgWhite,
                            styles().br5,
                            {
                            color: currentTheme.borderColor,
                            backgroundColor: currentTheme.white,
                            }
                        ]}
                    />
                </View>
                
                <View style={[styles().mb5]}>
                    <TextField
                        keyboardType='default'
                        value={email}
                        PlaceholderInfo="Email Address"
                        errorText={emailError}
                        autoCapitalize='none'
                        SetEditinfo={(text) => {
                            SetemailError(null)
                            SetEmail(text)
                        }}
                    />
                </View>
                <View style={[styles().mb5]}>
                    <TextField
                        value={Password}
                        PlaceholderInfo="Password"
                        errorText={PasswordError}
                        autoCapitalize='none'
                        SetEditinfo={(text) => {
                            setPasswordError(null)
                            setPassword(text)
                        }}
                        eye={true}
                    />
            </View>

            <View style={[styles().mt10, styles().flexRow, styles().alignCenter, styles().justifyBetween, styles().mb10]}>
                <TouchableOpacity onPress={()=>SetTerms(!terms)} style={[styles().wh25px, styles().mr10, styles().alignCenter, styles().justifyCenter, styles().bgWhite, styles().br5, styles().overflowH]}>
                    {terms && <FontAwesome name="check" size={16} color={currentTheme.themeBackground} /> }
                </TouchableOpacity>
                <Text style={[styles().flex, styles().fs12, styles().fontRegular, {color:currentTheme.borderColor}]}>I agree to use <Text style={styles().textDecorationUnderline}>Usage and Terms</Text> and <Text style={styles().textDecorationUnderline}>Privacy Policy</Text></Text>
            </View>
            
            <View style={[styles().flexRow, styles().justifyBetween, styles().alignCenter, styles().mt20]}>
              <TouchableOpacity onPress={()=> props.navigation.navigate('Login')}>
                <Text style={[styles().fs14, styles().fontRegular, {color:currentTheme.blue}]}>Existing User</Text>
              </TouchableOpacity>
              {!loading ?  <ThemeButton
                    onPress={() => {
                        setLoading(true)
                        if(validation()){
                            const user = {
                                name: firstname.toLowerCase(),
                                lastname : lastname,
                                email: Username.toLowerCase().trim(),
                                password: Password,
                                phone: number,
                                referral_id:referralId
                            }
                            // console.log('user',user)
                            mutate({ variables: { ...user } }) 
                        }
                        else{
                            setLoading(false)
                        }
                        // props.navigation.navigate('SignIn')
                    }
                    }
                    Style={styles().w48}
                    Title={"Continue"}
                /> : <Spinner />
                 } 

            </View>
            
            </ScrollView>
            </KeyboardAvoidingView>
        

        </Layout>
    )
}