import React , { useContext ,useEffect,useState,  } from 'react'
import {  Platform,Animated, Dimensions, Modal, FlatList, Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';
import { Ionicons , Foundation, Entypo, FontAwesome5, Feather, Octicons, AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Layout from '../../Component/Layout/Layout';
import ThemeButton from '../../Component/ThemeButton/ThemeButton';


const {width, height} = Dimensions.get('window');

export default function InventorySingleList(props){


    const item = props.route.params.InventoryTitle;
  
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  const InventoryName = props.route.params.inventoryListing;

  

return( 
    <Layout navigation={props.navigation} LeftIcon={true} withoutScroll={true} pagetitle={InventoryName.InventoryCategoryTitle} style={[styles().ph0]} >
        <View style={[styles().flex, {marginHorizontal : width * 0.04}]}>
            <FlatList
                data={InventoryName.InventoryCategoryList}
                bounces={false}
                numColumns={2}
                ListHeaderComponent={<View style={styles().pt30} />}
                showsVerticalScrollIndicator={false}
                renderItem={({ item:InventoryCategoryTitle , index }) => {
                    return (
                        <TouchableOpacity key={index} onPress={()=>props.navigation.navigate('InventoryEdit')} style={[styles().mb20, {width : width * 0.44, marginRight:index % 2 === 0 ? width * 0.04 : 0 }]}>
                            <View style={[styles().w100, styles().mb10, styles().overflowH, styles().h130px, styles().br5]}>
                                <Image source={InventoryCategoryTitle.InventoryListImg} resizeMode="cover" style={[styles().wh100]} />
                                <TouchableOpacity style={[styles().top10, styles().alignCenter, styles().justifyCenter, styles().wh20px, styles().br5, styles().right10, styles().posAbs, styles().bgWhite]}>
                                    <MaterialIcons name="edit" size={16} color={currentTheme.SliderDots} />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles().fs12, styles().fw400, {color:currentTheme.black}]}>{InventoryCategoryTitle.InventoryListName}</Text>
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
             <ThemeButton Title={"Add New Inventory"} /> 
            </View>
            
            
            

    
         
    </Layout>
    )
}
