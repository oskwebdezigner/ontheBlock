import React, { useContext, useEffect, useState, } from 'react'
import { Platform, Animated, Dimensions, FlatList, Text, TouchableOpacity, View, Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../../screen/styles';

const { width, height } = Dimensions.get('window');

export default function PrizeComponent(props) {
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  
  //let formau = Math.round(props.item[0].SoldNo  / props.item[0].totalNo * 100);
  
  //console.log('===================', formau)

  return (
    <FlatList
      data={props.item}

      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => {
        
        const percent = item.SoldNo / item.totalNo * 100;
        return (
          <TouchableOpacity
          onPress={props.onPress}
            // onPress={()=> props.navigation.navigate('PrizeDetail', { order: item })} 
            style={[styles().ph15, styles().pv10, styles().bw1, styles().br10, styles(currentTheme).bgWhite, { borderColor: currentTheme.closingPrizeBd, width: width * 0.4, marginLeft: index === 0 ? 0 : width * 0.03 }]}>

            <Text style={[styles().fs11, styles().fontRegular, styles().fw400, { color: currentTheme.textColor }]}>{item.SoldNo} Sold out of {item.totalNo}</Text>
            <View style={[styles().w100, styles().mt5, styles().h5px, styles().br5, { backgroundColor: currentTheme.cEFEFEF }]}>
              <View style={[styles().h5px, styles().br5, { backgroundColor: currentTheme.blue, width: `${percent}%` }]}></View>
            </View>
            <View style={[styles().h70px, styles().mb5, styles().w100]}>
              <Image source={item.Image} style={styles().wh100} resizeMode="cover" />
            </View>

            <Text style={[styles().fs12, styles().fontRegular, styles().fw400, { color: currentTheme.black }]}>
              Get a chance to <Text style={[styles().textUpper, styles().fw700, { fontStyle: 'italic', color: currentTheme.themeBackground }]}>Win </Text>
              <Text style={[styles().fs14, styles().fontBold, styles().fw700]}>{item.amount} Cash</Text>
            </Text>


          </TouchableOpacity>

        )
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}