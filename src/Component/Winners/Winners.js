import React , { useContext ,useEffect,useState,  } from 'react'
import {  Platform,Animated, Dimensions, FlatList, Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import { Ionicons , Foundation, FontAwesome5, Feather, Octicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import styles from '../../screen/styles';
import ThemeButton from '../ThemeButton/ThemeButton';

const {width, height} = Dimensions.get('window');

export default function Winners(props){
    const themeContext = useContext(ThemeContext)
    const currentTheme = theme[themeContext.ThemeValue]


   

    

   
    
  return(
    <FlatList
    data={props.item}
    showsVerticalScrollIndicator={false}
    renderItem={({ item , index }) => {
        
        return (
            <TouchableOpacity 
            // onPress={()=> props.navigation.navigate('OrderDetail', { order: item })} 
            style={[styles().ph15, styles().pt15, styles().pb20, styles().bw1, styles().br10, styles(currentTheme).bgWhite, styles().mb20, {borderColor:currentTheme.closingPrizeBd}]}>
               
                <View style={[styles().h140px, styles().overflowH, styles().br10, styles().mb5, styles().w100, styles().bw0]}>
                    <Image source={item.Image} style={styles().wh100} resizeMode="cover" />
                </View>
               
                <View>
                    <Text style={[styles().fs20, styles().fontBold, styles().fw700, {color:currentTheme.themeBackground}]}>Congratulations</Text>
                    <Text style={[styles().fs16, styles().fontRegular, styles().fw400, {color:currentTheme.black}]}><Text style={[styles().fontBold, styles().fw700]}>{item.name}</Text> on winning</Text>
                    <Text style={[styles().fs14, styles().fontRegular, styles().fw400, {color:currentTheme.black}]}>{item.amount} Cash</Text>
                    <Text style={[styles().fs12, styles().fontRegular, {color:currentTheme.textColor}]}>Coupon no: {item.coupon}</Text>
                    <Text style={[styles().fs12, styles().mt5, styles().fontRegular, {color:currentTheme.c999999}]}>Announced : {item.announcedDate}</Text>
                    
                   
                </View>
            </TouchableOpacity>

        )
      }}
    keyExtractor={(item, index) => index.toString()}
  />
  )
}