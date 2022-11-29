import React , { useContext } from 'react'
import {  View , Text , Image, Platform, TouchableOpacity } from 'react-native'
import {  FontAwesome } from '@expo/vector-icons';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../../screen/styles';
import { gql, useMutation } from '@apollo/client'
import { useQuery } from '@apollo/react-hooks';
import { getCartItems } from '../../apollo/client';
import UserContext from '../../context/User/User';
const GETCARTITEMS = gql`${getCartItems}`

export default function Header(props){

    const user = useContext(UserContext);

    const themeContext = useContext(ThemeContext)
    const currentTheme = theme[themeContext.ThemeValue]
    const {StyleHead} = props
    const { data, loading } = useQuery(GETCARTITEMS)

   

    

    function Back(){
        return(
            <TouchableOpacity
          onPress={() => props.navigation.goBack()}
           style={[
          styles().alignCenter,
          styles().justifyCenter,
          styles().h50px,
          styles().w25px,
           
        //   styles().ph20,
        //   styles().backButn
          ]}>
            <FontAwesome name="angle-left" size={30} color="black" />
        </TouchableOpacity>
        )
    }

    function HomeLogo(){
        return(
            <View>
                <Image source={require('../../assets/images/home-logo.png')} />
            </View>
        )
    }

    function ProfileImg(){
        return(
            <TouchableOpacity onPress={()=>props.navigation.navigate('Profile')} style={[styles().wh30px, styles().br15]}>
                <Image source={require('../../assets/images/user-img.png')} resizeMode={'cover'} style={styles().wh100}/>
            </TouchableOpacity>
        )
    }

    

    return (
        <View style={[
            styles().flexRow,
            Platform.OS === 'ios' ? styles().mt20 : styles().mt0,
            styles().alignCenter,
            styles().justifyBetween,
            styles().h50px, 
           styles().ph20, 
           StyleHead, props.HeaderStyle,
            
            ]}>
               
                {
                    props.LeftIcon ? <Back/> : null
                }
                {
                    props.HomeIcon ? <HomeLogo/> : null
                }
                
                <Text style={[styles().fs18, styles().fw700, styles().fontBold, {color:currentTheme.borderColor}]}>{props.pagetitle}</Text>
                
                <View>
                {
                    props.ProfileImg ? <ProfileImg/> : null
                }
                </View>
                
          
          
          </View>
    )
}