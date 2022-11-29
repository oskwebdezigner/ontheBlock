import React , { useContext ,useEffect,useState,  } from 'react'
import {  Platform,Animated, Dimensions, FlatList, Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';
import { Ionicons , Foundation, FontAwesome5, Feather, Octicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import Layout from '../../Component/Layout/Layout';
import PrizeComponent from '../../Component/PrizeComponent/PrizeComponent';
import CountDownComponent from '../../Component/CountDownComponent/CountDownComponent';
import SoldPrize from '../../Component/SoldPrize/SoldPrize';
import Winners from '../../Component/Winners/Winners';
import TicketIcon from '../../Component/CustomTab/TicketLargeFile';

const {width, height} = Dimensions.get('window');

export default function Tickets(props){

  
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  

return( 
    <Layout navigation={props.navigation} withoutScroll={true} LeftIcon={false} pagetitle={'Tickets'} homeGrad={true} ProfileImg={false} >
        
    <View style={[styles().flex, styles().ph25, styles().alignCenter, styles().justifyCenter]}>
      <View style={[styles().wh100px, styles().alignCenter, styles().justifyCenter, styles().mb35, styles().br50, styles().overflowH, styles().bgWhite]}>
        <TicketIcon />
      </View>
      <Text style={[styles().fs14, styles().fontRegular, styles().lh22, styles().textCenter, styles().fw400, {color:currentTheme.borderColor}]}>You can see your active tickets here after you have made a purchase</Text>
    </View>

    

    



    
         
    </Layout>
    )
}
