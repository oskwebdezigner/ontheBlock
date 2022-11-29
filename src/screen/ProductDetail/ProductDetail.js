import React , { useContext ,useState  } from 'react'
import {  Platform,Animated, Dimensions, FlatList, Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';
import Layout from '../../Component/Layout/Layout';

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ProductDetail(props){

  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  const item = props.route.params.prod
  

    return( 
    <Layout navigation={props.navigation} withoutScroll={true} pagetitle={item?.ProductTitle} LeftIcon={true} CartIcon={true}>
    
        <View style={[styles().flex, styles().mt5]}>
            
        <View style={[styles().h140px, styles().w100, styles().overflowH, styles().bgWhite, styles().alignCenter, styles().br10, styles().mb5, styles().w100, styles().bw0, styles().pv10]}>
            <Image source={item.ProductImg} style={[styles().wh100, styles().bgWhite, styles().alignCenter, {aspectRatio:1}]}  resizeMode="cover" />
            <View style={[styles().posAbs, styles().bottom15, styles().right15, styles().flexRow]}>
                <TouchableOpacity style={[styles().wh30px, styles().mr10, styles().alignCenter, styles().boxpeshadowProduct, styles().justifyCenter, styles().br5, styles().bw0, styles(currentTheme).bgWhite]}>
                    <FontAwesome name="heart-o" size={18} color={currentTheme.black} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles().wh30px, styles().alignCenter, styles().justifyCenter, styles().boxpeshadowProduct, styles().br5, styles().bw0, styles(currentTheme).bgWhite]}>
                    <FontAwesome name="share-alt" size={18} color={currentTheme.black} />
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles().mt10}>
            <Text style={[styles().fs14, styles().fontRegular, styles().lh18, {color:currentTheme.black}]}>{item.ProductCont}</Text>
        </View>

          </View>
        </Layout>
    )
}
