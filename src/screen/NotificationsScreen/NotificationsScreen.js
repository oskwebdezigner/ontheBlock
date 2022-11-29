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

const {width, height} = Dimensions.get('window');



const ClosingSoonPrize = [
    {
        id:0,
        totalNo:1950, 
        SoldNo:855,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png'),
        notifDate:'20 October 2022, 10:30 AM'
    },
    {
        id:1,
        totalNo:1500, 
        SoldNo:750,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png'),
        notifDate:'20 October 2022, 10:30 AM'
    },
    {
        id:2,
        totalNo:1200, 
        SoldNo:480,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png'),
        notifDate:'20 October 2022, 10:30 AM'
    },
    {
        id:3,
        totalNo:2500, 
        SoldNo:1140,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png'),
        notifDate:'20 October 2022, 10:30 AM'
    },
    {
        id:4,
        totalNo:1950, 
        SoldNo:855,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png'),
        notifDate:'20 October 2022, 10:30 AM'
    },
    {
        id:5,
        totalNo:2000, 
        SoldNo:186,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png'),
        notifDate:'20 October 2022, 10:30 AM'
    },
]

export default function NotificationsScreen(props){

  
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  

return( 
    <Layout navigation={props.navigation} withoutScroll={true} LeftIcon={false} pagetitle={'Notifications'} homeGrad={true} ProfileImg={false} >
        
    <View style={styles().flex}>
    <FlatList
      data={ClosingSoonPrize}

      
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        
        return (
          <TouchableOpacity
            // onPress={()=> props.navigation.navigate('OrderDetail', { order: item })} 
            style={[
                styles().ph15, 
                styles().pv10, 
                styles().bw1, 
                styles().br10, 
                styles(currentTheme).bgWhite, 
                styles().w100, 
                styles().mb20, 
                styles().flexRow,
                styles().justifyBetween,
                styles().alignCenter,
                { borderColor: currentTheme.closingPrizeBd}
            ]}>

            
            <View style={[styles().w100px, styles().h70px, styles().mr10, styles().mb5]}>
              <Image source={item.Image} style={styles().wh100} resizeMode="cover" />
            </View>
            <View style={styles().flex}>
                <Text style={[styles().fs12, styles().lh20, styles().fontRegular, styles().fw400, { color: currentTheme.black }]}>
                Get a chance to <Text style={[styles().textUpper, styles().fw700, { fontStyle: 'italic', color: currentTheme.themeBackground }]}>Win </Text>
                <Text style={[styles().fs14, styles().fontBold, styles().fw700]}>{item.amount} Cash</Text>
                </Text>
                <Text style={[styles().fs12, styles().mb10, styles().fontRegular, {color:currentTheme.black}]}>Shop new and make it YOURS!</Text>
                <Text style={[styles().fs10, styles().fontRegular, {color:currentTheme.c999999}]}>{item.notifDate}</Text>
            </View>


          </TouchableOpacity>

        )
      }}
      keyExtractor={(item, index) => index.toString()}
    />
    </View>

    

    



    
         
    </Layout>
    )
}
