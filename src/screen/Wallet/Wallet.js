import React , { useContext ,useState  } from 'react'
import { Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';
import { FontAwesome5, FontAwesome, Feather, Ionicons, SimpleLineIcons} from '@expo/vector-icons';
import Layout from '../../Component/Layout/Layout';
import UserContext from '../../context/User/User';
import HawtaIcon from '../../Component/CustomTab/Hawtalogo';

export default function Wallet(props){

  const user = useContext(UserContext);
console.log("Profile user Context", user)
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]


  

  function ProfileList(ListProfile){
    return(
      <TouchableOpacity onPress={()=>props.navigation.navigate('WalletTopup',{ListName : ListProfile.ListName, ListIcon : ListProfile.ListIcon})} style={[styles().bgWhite, styles().br5, styles().ph20, styles().pv15, styles().flexRow, styles().justifyBetween, styles().alignCenter, {marginBottom:2}]}>

        <View style={styles().w25px}>
          {ListProfile.ListIcon}
        </View>
        <Text style={[styles().fs14, styles().flex, styles().ml15, styles().fontRegular, {color:currentTheme.borderColor}]}>{ListProfile.ListName}</Text>
        <FontAwesome name="angle-right" size={20} color={currentTheme.SliderDots} />
      </TouchableOpacity>
    )
  }
  
    return( 
      <Layout navigation={props.navigation} withoutScroll={true} LeftIcon={true} pagetitle={'Hawta Wallet'}>
      
       <View style={[styles().bgWhite, styles().pv15, styles().br5, styles().mb30, styles().alignCenter]}>
            <Text style={[styles().fs9, styles().mb5, styles().fontRegular, {color:currentTheme.borderColor}]}>Available Balance in Hawta Wallet</Text>
            <Text style={[styles().fs14, styles().fontBold, {color:currentTheme.blue}]}>AED10.40</Text>
       </View>

       <View>
        <Text style={[styles().fs14, styles().mb20, styles().fontMedium, {color:currentTheme.borderColor}]}>Select Top-up method</Text>

        <ProfileList ListName={'Apple Pay'}  ListIcon={<FontAwesome name="apple" size={20} color={currentTheme.black} />} />
        <ProfileList ListName={'Credit/Debit Cards'} ListIcon={<FontAwesome name="credit-card-alt" size={20} color={currentTheme.black} />} />
        <ProfileList ListName={'Credit Code'} ListIcon={<HawtaIcon />} />
        <ProfileList ListName={'Crypto'} ListIcon={<FontAwesome name="bitcoin" size={20} color={currentTheme.black} />} />
        
        </View>

        



    
          
      </Layout>
    )
}
