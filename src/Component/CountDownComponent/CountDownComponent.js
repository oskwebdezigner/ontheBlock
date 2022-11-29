import React , { useContext ,useEffect,useState,  } from 'react'
import {  Platform,Animated, Dimensions, FlatList, Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import { Ionicons , Foundation, FontAwesome5, Feather, Octicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import styles from '../../screen/styles';
import ThemeButton from '../ThemeButton/ThemeButton';

const {width, height} = Dimensions.get('window');


export default function CountDownComponent(props){
    const themeContext = useContext(ThemeContext)
    const currentTheme = theme[themeContext.ThemeValue]

  return(
    <FlatList
    data={props.item}
    showsVerticalScrollIndicator={false}
    renderItem={({ item , index }) => {
       
        const percent = item.SoldNo / item.totalNo * 100;
        return (
            <TouchableOpacity 
            // onPress={()=> props.navigation.navigate('OrderDetail', { order: item })} 
            style={[styles().ph15, styles().pt10, styles().pb20, styles().bw1, styles().br10, styles(currentTheme).bgWhite, styles().mb20, {borderColor:currentTheme.closingPrizeBd}]}>
               <View style={[styles().flexRow, styles().mb10, styles().justifyBetween, styles().alignCenter]}>
                    <View style={styles().w50}>
                        <Text style={[styles().fs11, styles().fontRegular, styles().fw400, {color:currentTheme.textColor}]}>{item.SoldNo} Sold out of {item.totalNo}</Text>
                        <View style={[styles().w100, styles().mt5, styles().h5px, styles().br5, { backgroundColor: currentTheme.cEFEFEF }]}>
                            <View style={[styles().h5px, styles().br5, { backgroundColor: currentTheme.blue, width: `${percent}%` }]}></View>
                        </View>
                    </View>
                    <View style={styles().alignEnd}>
                        <Text style={[styles().fs11, styles().fontRegular, styles().fw400, {color:currentTheme.textColor}]}>Closing in</Text>
                        <Text style={[styles().fs16, styles().fw700, styles().fontBold, {color:currentTheme.themeBackground}]}>{'76 : 42 : 23'}</Text>
                    </View>
                </View>
                <View style={[styles().h250px, styles().overflowH, styles().br10, styles().mb5, styles().w100, styles().bw0]}>
                    <Image source={item.Image} style={styles().wh100} resizeMode="cover" />
                    <View style={[styles().posAbs, styles().bottom15, styles().right15, styles().flexRow]}>
                        <TouchableOpacity style={[styles().wh30px, styles().mr10, styles().alignCenter, styles().justifyCenter, styles().br5, styles().bw0, styles(currentTheme).bgWhite]}>
                            <FontAwesome name="heart-o" size={18} color={currentTheme.black} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles().wh30px, styles().alignCenter, styles().justifyCenter, styles().br5, styles().bw0, styles(currentTheme).bgWhite]}>
                            <FontAwesome name="share-alt" size={18} color={currentTheme.black} />
                        </TouchableOpacity>
                    </View>
                </View>
               
                <View>
                    <Text style={[styles().fs18, styles().mb5, styles().fontBold, styles().fw700, {color:currentTheme.borderColor}]}>{item.Title} <Text style={{color:currentTheme.themeBackground}}>{item.amount}</Text> Cash</Text>
                    <Text style={[styles().fs14, styles().mb10, styles().fontRegular, {color:currentTheme.black}]}>Buy a Rosa Set for: <Text style={[styles().fontMedium, {color:currentTheme.blue}]}>{item.OtherAmount}</Text></Text>
                    <ThemeButton Title={'Add to Cart'} Style={styles().mb15} />
                    <ThemeButton Title={'Prize Details'} Style={styles().mb15} withoutBg={true} />
                </View>
                <View style={[styles().flexRow, styles().alignCenter]}>
                    <View style={[styles().wh35px, styles().mr5]}>
                        <Image source={require('../../assets/images/prize-date.png')} style={styles().wh100} />
                    </View>
                    <View style={styles().flex}>
                        <Text style={[styles().fs12, styles().fontMedium, {color:currentTheme.textColor}]}>Max draw date November 29, 2022</Text>
                        <Text style={[styles().fs9, styles().fw400, styles().fontRegular, {color:currentTheme.textColor}]}>or when the campaign is sold out, Whichever is earlier</Text>
                    </View>
                </View>
              
                
            </TouchableOpacity>

        )
      }}
    keyExtractor={(item, index) => index.toString()}
  />
  )
}