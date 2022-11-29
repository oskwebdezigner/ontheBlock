import React , { useContext ,useState, useEffect  } from 'react'
import {  Platform,Animated, Dimensions, ScrollView, Button, FlatList, Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';
import Layout from '../../Component/Layout/Layout';
import { Feather, Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import ThemeButton from '../../Component/ThemeButton/ThemeButton';
import CartComponent from '../../Component/CartComponent/CartComponent'
import { CurrentRenderContext } from '@react-navigation/native';

const { width } = Dimensions.get('window');


const CountDownList = [
  {
      id:0,
      totalNo:1950, 
      SoldNo:855,
      amountIn:'AED',
      amount:'30000',
      Image: require('../../assets/images/closingPrizeImg.png'),
      Title:'Win Studio Apartment in Dubai or',
      OtherAmount:'AED 50.00'
  },
  {
      id:1,
      totalNo:1500, 
      SoldNo:750,
      amountIn:'AED',
      amount:'30000',
      Image: require('../../assets/images/closingPrizeImg.png'),
      Title:'Win Studio Apartment in Dubai or',
      OtherAmount:'AED 50.00'
  },
  {
      id:2,
      totalNo:1200, 
      SoldNo:480,
      amountIn:'AED',
      amount:'30000',
      Image: require('../../assets/images/closingPrizeImg.png'),
      Title:'Win Studio Apartment in Dubai or',
      OtherAmount:'AED 50.00'
  },
  {
      id:3,
      totalNo:3500, 
      SoldNo:1140,
      amountIn:'AED',
      amount:'30000',
      Image: require('../../assets/images/closingPrizeImg.png'),
      Title:'Win Studio Apartment in Dubai or',
      OtherAmount:'AED 50.00'
  },
  {
      id:4,
       totalNo:1950, 
      SoldNo:855,
      amountIn:'AED',
      amount:'30000',
      Image: require('../../assets/images/closingPrizeImg.png'),
      Title:'Win Studio Apartment in Dubai or',
      OtherAmount:'AED 50.00'
  },
  {
      id:5,
      totalNo:2000, 
      SoldNo:186,
      amountIn:'AED',
      amount:'30000',
      Image: require('../../assets/images/closingPrizeImg.png'),
      Title:'Win Studio Apartment in Dubai or',
      OtherAmount:'AED 50.00'
  },
]

const PeopleViewed = [
  {
    id:0,
    Image:require('../../assets/images/prize-img.png'),
    amount:'30,000',
    name:'Product Name',
    productPrice : '20.00'
  }
]



export default function Cart(props){
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  const [count, SetCount] = useState(0);

function MinusCount(){
    SetCount((old)=> old > 0 ? old - 1 : old)
}

function PlusCount(){
    SetCount((old)=> old + 1)
}
 
    return( 
    <Layout navigation={props.navigation} withoutScroll={true} headerShown={false} style={styles().ph0}>
      
      <View style={[styles().ph20, styles(currentTheme).bgWhite, styles().pt10, styles().pb15, {borderTopWidth:1, borderTopColor:currentTheme.bodyBg}]}>
        <Text style={[styles().fs18, styles().fw700, styles().fontBold, {color:currentTheme.borderColor}]}>My Cart</Text>
        <View style={[styles().flexRow, styles().mv10, styles().justifyBetween]}>
          <Text style={[styles().fs14, styles().fontMedium, styles().fw600, {color:currentTheme.borderColor}]}>Total Amount <Text style={[styles().fs10, styles().fontRegular, styles().fw400]}>(Inclusive of VAT)</Text></Text>
          <Text style={[styles().fs18, styles().fw600, styles().fontMedium, {color:currentTheme.borderColor}]}>AED20.00</Text>
        </View>
        <Text style={[styles().fs12, styles().fontRegular, {color:currentTheme.blue}]}>Show Summary</Text>

      </View>
      
        <ScrollView showsVerticalScrollIndicator={false} style={[styles().flex, styles().ph20, {backgroundColor:currentTheme.bodyBg}]}>
        
        <FlatList
          data={CountDownList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={()=> <View style={styles().h30px} />}
          renderItem={({ item , index }) => {
              
              return (
                <CartComponent item={item} index={index}/>
              )
              
            }}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles().mb25}>
          <Text style={[styles().fs14, styles().fontMedium, {color:currentTheme.borderColor}]}>People have also bought this together</Text>
        </View>

        <FlatList
          data={PeopleViewed}
          
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          // ListHeaderComponent={()=> <View style={styles().h30px} />}
          renderItem={({ item , index }) => {
              
              return (
                <TouchableOpacity style={[styles().pall15, styles().mb25, styles().br10, styles().bgWhite, styles().bw1, {borderColor:currentTheme.closingPrizeBd, width : width * 0.42, marginRight : index % 2 === 0 ? width * 0.05 : 0}]}>
                  <Image source={item.Image} style={styles().mb10} />
                  <Text style={[styles().fs14, styles().mb5, styles().fontBold, styles().fw700, {color:currentTheme.black}]}>AED{item.amount} Cash</Text>
                  <Text style={[styles().fs12, styles().fontRegular, styles().lh18, styles().fw400, {color:currentTheme.black}]}>{item.name}</Text>
                  <Text style={[styles().fs12, styles().fontMedium, styles().fw600, {color:currentTheme.themeBackground}]}>AED{item.productPrice}</Text>
                </TouchableOpacity>
              )
              
            }}
          keyExtractor={(item, index) => index.toString()}
        />


      
        
        </ScrollView>
        <View style={[{flex:0.15}, styles().ph20, styles().flexRow, styles().justifyBetween, styles().alignCenter, styles().bgWhite, styles().bottom0]}>
        <View style={styles().flex}>
            <Text style={[styles().fs10, styles().lh18, styles().fontRegular, {color:currentTheme.borderColor}]}>Minimum order of <Text style={[styles().fontMedium, {color:currentTheme.blue}]}>AED40.00</Text> applies. Add <Text style={[styles().fontMedium, {color:currentTheme.blue}]}>AED20.00</Text> more to complete this purchase</Text>
        </View>
        <View style={[styles().flexRow, styles().justifyBetween]}>
            <ThemeButton Title={'Go to Shopping'} Style={[styles().h40px, styles().ph10]} />
        </View>
        </View>
      
    </Layout>
    )
}
