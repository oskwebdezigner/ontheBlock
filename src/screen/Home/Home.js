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
        Image: require('../../assets/images/prize-img.png')
    },
    {
        id:1,
        totalNo:1500, 
        SoldNo:750,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png')
    },
    {
        id:2,
        totalNo:1200, 
        SoldNo:480,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png')
    },
    {
        id:3,
        totalNo:2500, 
        SoldNo:1140,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png')
    },
    {
        id:4,
        totalNo:1950, 
        SoldNo:855,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png')
    },
    {
        id:5,
        totalNo:2000, 
        SoldNo:186,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png')
    },
]

const CountDownList = [
    {
        id:0,
        totalNo:1950, 
        SoldNo:855,
        amount:'AED30,000',
        Image: require('../../assets/images/closingPrizeImg.png'),
        Title:'Win Studio Apartment in Dubai or',
        OtherAmount:'AED 50.00'
    },
    {
        id:1,
        totalNo:1500, 
        SoldNo:750,
        amount:'AED30,000',
        Image: require('../../assets/images/closingPrizeImg.png'),
        Title:'Win Studio Apartment in Dubai or',
        OtherAmount:'AED 50.00'
    },
    {
        id:2,
        totalNo:1200, 
        SoldNo:480,
        amount:'AED30,000',
        Image: require('../../assets/images/closingPrizeImg.png'),
        Title:'Win Studio Apartment in Dubai or',
        OtherAmount:'AED 50.00'
    },
    {
        id:3,
        totalNo:3500, 
        SoldNo:1140,
        amount:'AED30,000',
        Image: require('../../assets/images/closingPrizeImg.png'),
        Title:'Win Studio Apartment in Dubai or',
        OtherAmount:'AED 50.00'
    },
    {
        id:4,
         totalNo:1950, 
        SoldNo:855,
        amount:'AED30,000',
        Image: require('../../assets/images/closingPrizeImg.png'),
        Title:'Win Studio Apartment in Dubai or',
        OtherAmount:'AED 50.00'
    },
    {
        id:5,
        totalNo:2000, 
        SoldNo:186,
        amount:'AED30,000',
        Image: require('../../assets/images/closingPrizeImg.png'),
        Title:'Win Studio Apartment in Dubai or',
        OtherAmount:'AED 50.00'
    },
]

const SoldPrizeList = [
    {
        id:0,
        amount:'AED30,000',
        Image: require('../../assets/images/sold-prize.png'),
        sku: 'CG-01661',
        SoldDate:'October 25, 2022',
        
    },
    {
        id:1,
        amount:'AED30,000',
        Image: require('../../assets/images/sold-prize.png'),
        sku: 'CG-01661',
        SoldDate:'October 25, 2022',
    },
    {
        id:2,
        amount:'AED30,000',
        Image: require('../../assets/images/sold-prize.png'),
        sku: 'CG-01661',
        SoldDate:'October 25, 2022',
    },
    {
        id:3,
        amount:'AED30,000',
        Image: require('../../assets/images/sold-prize.png'),
        sku: 'CG-01661',
        SoldDate:'October 25, 2022',
    },
    {
        id:4,
        amount:'AED30,000',
        Image: require('../../assets/images/sold-prize.png'),
        sku: 'CG-01661',
        SoldDate:'October 25, 2022',
    },
    {
        id:5,
        amount:'AED30,000',
        Image: require('../../assets/images/sold-prize.png'),
        sku: 'CG-01661',
        SoldDate:'October 25, 2022',
    },
]

const WinnersList = [
    {
        id:0,
        amount:'AED30,000',
        Image: require('../../assets/images/sold-prize.png'),
        name:'Biju Vijayan',
        coupon: 'CG-01654-01897-O',
        announcedDate:'11:12 AM 06 October, 2022',
        
    },
    {
        id:1,
        amount:'AED30,000',
        Image: require('../../assets/images/sold-prize.png'),
        name:'Biju Vijayan',
        coupon: 'CG-01654-01897-O',
        announcedDate:'11:12 AM 06 October, 2022',
    },
    {
        id:2,
        amount:'AED30,000',
        Image: require('../../assets/images/sold-prize.png'),
        name:'Biju Vijayan',
        coupon: 'CG-01654-01897-O',
        announcedDate:'11:12 AM 06 October, 2022',
    },
    {
        id:3,
        amount:'AED30,000',
        Image: require('../../assets/images/sold-prize.png'),
        name:'Biju Vijayan',
        coupon: 'CG-01654-01897-O',
        announcedDate:'11:12 AM 06 October, 2022',
    },
    {
        id:4,
        amount:'AED30,000',
        Image: require('../../assets/images/sold-prize.png'),
        name:'Biju Vijayan',
        coupon: 'CG-01654-01897-O',
        announcedDate:'11:12 AM 06 October, 2022',
    },
    {
        id:5,
        amount:'AED30,000',
        Image: require('../../assets/images/sold-prize.png'),
        name:'Biju Vijayan',
        coupon: 'CG-01654-01897-O',
        announcedDate:'11:12 AM 06 October, 2022',
    },
]

export default function Home(props){

  
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]
  

return( 
    <Layout navigation={props.navigation} HomeIcon={true} homeSlider={true} homeGrad={true} ProfileImg={true}>
        
        <TouchableOpacity style={[styles().ph20, styles().mb20]} onPress={()=>props.navigation.navigate('Login')}>
            <Text style={[styles().fs20, styles().fontBold, {color:currentTheme.themeBackground}]}>Login</Text>
        </TouchableOpacity>
    <View style={[styles().flex, styles().mb20, styles().pl20]}>
        <Text style={[styles().fs18, styles().fontBold, styles().fw700, styles().mb10, {color:currentTheme.borderColor}]}>Closing Soon</Text>
        <PrizeComponent  item={ClosingSoonPrize} onPress={()=>props.navigation.navigate('PrizeDetail')} />
    </View>

    <View style={[styles().w100, styles().ph20, styles().mb10, styles().h100px, styles().br10, styles().overflowH, {borderWidth:0}]}>
        <Image source={require('../../assets/images/home-banner.png')} style={styles().wh100} resizeMode="contain" />
    </View>

    <View style={[styles().flex, styles().ph20, styles().mb20]}>
        <CountDownComponent item={CountDownList} />
    </View>

    <View style={[styles().h300px, styles().ph20, styles().pt35, {backgroundColor:currentTheme.themeBackground}]}>
        <Text style={[styles().fs24, styles().fontBold, styles().fw700, styles().textUpper, styles().mb5, styles(currentTheme).bgTextWhite]}>Sold Out</Text>
        <Text style={[styles().fs12, styles().fontMedium, styles().lh18, styles(currentTheme).bgTextWhite]}>All our sold out campaigns along with their corresponding draw dates are listed here.</Text>
    </View>

    <View style={[styles().ph20, styles().mt_170]}>
        <SoldPrize item={SoldPrizeList} />
    </View>

    <View style={[styles().w100, styles().ph20, styles().mb20, styles().h100px, styles().br10, styles().overflowH, {borderWidth:0}]}>
        <Image source={require('../../assets/images/home-banner.png')} style={styles().wh100} resizeMode="contain" />
    </View>

    <View style={[styles().h300px, styles().ph20, styles().pt35, {backgroundColor:currentTheme.blue}]}>
        <Text style={[styles().fs24, styles().fontBold, styles().fw700, styles().textUpper, styles().mb5, styles(currentTheme).bgTextWhite]}>Winners</Text>
        <Text style={[styles().fs12, styles().fontMedium, styles().lh18, styles(currentTheme).bgTextWhite]}>All our winners are announced in this section.</Text>
    </View>

    <View style={[styles().ph20, styles().mt_170]}>
        <Winners item={WinnersList} />
    </View>
        
         
    </Layout>
    )
}
