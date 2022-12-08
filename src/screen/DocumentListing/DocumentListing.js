import React , { useContext ,useEffect,useState,  } from 'react'
import {  Platform,Animated, Dimensions, Modal, FlatList, Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';
import { Ionicons , Foundation, Entypo, FontAwesome5, Feather, Octicons, AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Layout from '../../Component/Layout/Layout';
import ThemeButton from '../../Component/ThemeButton/ThemeButton';


const {width, height} = Dimensions.get('window');

export default function DocumentListing(props){


    const item = props.route.params.InventoryTitle;
  
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  const DocumentList = [
    {
        id:0,
        DocumentName:'Electric Kettle Warranty',
        DocumentImg: require('../../assets/images/documentListingImg1.png')
    },
    {
        id:1,
        DocumentName:'AC Warranty Card',
        DocumentImg: require('../../assets/images/documentListingImg2.png')
    },
    {
        id:2,
        DocumentName:'Microwave Oven',
        DocumentImg: require('../../assets/images/documentListingImg1.png')
    },
    {
        id:3,
        DocumentName:'Electric Kettle Warranty',
        DocumentImg: require('../../assets/images/documentListingImg2.png')
    },
    {
        id:4,
        DocumentName:'Microwave Oven',
        DocumentImg: require('../../assets/images/documentListingImg1.png')
    },
    {
        id:5,
        DocumentName:'AC Warranty Card',
        DocumentImg: require('../../assets/images/documentListingImg2.png')
    },
    {
        id:6,
        DocumentName:'Electric Kettle Warranty',
        DocumentImg: require('../../assets/images/documentListingImg1.png')
    }
  ]

  

return( 
    <Layout navigation={props.navigation} LeftIcon={true} withoutScroll={true} pagetitle={item.SingleListName} style={[styles().ph0]} >
        <View style={[styles().flex, {marginHorizontal : width * 0.04}]}>
            <FlatList
                data={DocumentList}
                bounces={false}
                numColumns={2}
                ListHeaderComponent={<View style={styles().pt30} />}
                showsVerticalScrollIndicator={false}
                renderItem={({ item , index }) => {
                    return (
                        <TouchableOpacity key={index} onPress={()=>props.navigation.navigate('DocumentEdit')} style={[styles().mb20, {padding:5, width : width * 0.44, marginRight:index % 2 === 0 ? width * 0.04 : 0 }]}>
                            <View style={[styles().w100, styles().boxpeshadow, styles().bgWhite, styles().ph10, styles().mb10, styles().h130px, styles().br5]}>
                                <View style={[styles().wh100, styles().overflowH]}>
                                    <Image source={item.DocumentImg} resizeMode="cover" style={[styles().wh100]} />
                                    <TouchableOpacity style={[styles().top10, styles().alignCenter, styles().justifyCenter, styles().wh20px, styles().br5, styles().right10, styles().posAbs, styles().bgWhite]}>
                                        <MaterialIcons name="edit" size={16} color={currentTheme.SliderDots} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={[styles().fs12, styles().fw400, {color:currentTheme.black}]}>{item.DocumentName}</Text>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={
                    <View style={styles().mb100} />
                }
            /> 
            </View>
        
        <View style={[styles().left20, styles().right20, styles().posAbs, styles().bottom20]}>
             <ThemeButton Title={"Add New Document"} /> 
            </View>
            
            
            

    
         
    </Layout>
    )
}
