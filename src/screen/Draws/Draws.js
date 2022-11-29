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
        totalNo:2500, 
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

const TabHeadList = [
    {
        id:0,
        tabName: 'Draws',
        component: <CountDownComponent item={CountDownList} />
    },
    {
        id:1,
        tabName:'Winners',
        component : <Winners item={WinnersList} />
    },
]

export default function Draws(props){

  
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  const [TabActive, SetTabActive] = useState(0);

return( 
    <Layout navigation={props.navigation} LeftIcon={false} pagetitle={'Live Draws'} homeGrad={true} ProfileImg={false} >
        
    <View style={[styles().flex, styles().mb20, styles().pl20]}>
        <PrizeComponent  item={ClosingSoonPrize} />
    </View>

    <View style={[styles().flex, styles().ph20]}>
        <View style={[styles().TabHead, styles().mb20, styles().flex, styles().flexRow, styles().alignCenter, styles().ph5, styles().br10, styles().pv5, styles(currentTheme).bgWhite, styles().justifyBetween]}>
            {TabHeadList.map((item, i) =>
                <TouchableOpacity key={i} onPress={()=> SetTabActive(i)} style={[styles().pv15, styles().w48, styles().br10, styles().alignCenter, {backgroundColor: TabActive === i ? currentTheme.blue : currentTheme.white}]}>
                    <Text style={[styles().fs14, styles().fontMedium, styles().fw600, {color:TabActive === i ? currentTheme.white : currentTheme.black}]}>{item.tabName}</Text>
                </TouchableOpacity>
                )
            }
        </View>
        <View style={[styles().tabContent, styles().flex, styles().mb20]}>
            {TabHeadList[TabActive].component}
        </View>
    </View>

    



    
         
    </Layout>
    )
}
