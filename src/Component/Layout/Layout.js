import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, StatusBar, Platform, Animated, ScrollView, SafeAreaView } from 'react-native'
import ThemeContext from '../../context/ThemeContext/ThemeContext'
import { theme } from '../../context/ThemeContext/ThemeColor'
import styles from '../../screen/styles'
import { Entypo, Foundation, Feather, Octicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import Header from '../Header/Header';
import { LinearGradient } from 'expo-linear-gradient';
import CarouselView from '../../Component/Carousel/Carousel';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const { width, height } = Dimensions.get('window');



export default function Layout({ onPress, headerShown, homeSlider, withoutScroll, style, HomeIcon, homeGrad, children, navigation, LeftIcon, pagetitle, ProfileImg }) {

    const themeContext = useContext(ThemeContext)
    const currentTheme = theme[themeContext.ThemeValue]

    


    const Slider = [
        {
            Image: require('../../assets/images/home-slider-img.png')
        },
        {
            Image: require('../../assets/images/home-slider-img.png'),
        },
        {
            Image: require('../../assets/images/home-slider-img.png'),
        },
    ]

    
      

    return (
        <LinearGradient colors={homeGrad ? currentTheme.whiteGrad : currentTheme.singleGrad} style={[styles().flex]}>

            { homeSlider ? <ParallaxScrollView
                backgroundColor="black"
                contentBackgroundColor={currentTheme.bodyBg}
                contentContainerStyle={[styles().pt35]}
                renderForeground={() => <CarouselView Slider={Slider} />}
                renderStickyHeader={()=> <View />}
                stickyHeaderHeight={Platform.OS === 'android' ? 100 : 80} 
                renderFixedHeader={() => <Header navigation={navigation} HomeIcon={HomeIcon} ProfileImg={ProfileImg} pagetitle={pagetitle} HeaderStyle={[styles().posAbs, styles().left0, styles().right0, styles().zIndex1, Platform.OS === 'android' ? styles().top35 : styles().top15]} />}
                parallaxHeaderHeight={350}>
                    {children}
                </ParallaxScrollView> : 
        
                <SafeAreaView style={[styles().flex, {
                    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
                }]}>
                   {headerShown === undefined && <Header navigation={navigation} LeftIcon={LeftIcon} ProfileImg={ProfileImg} pagetitle={pagetitle} HeaderStyle={{backgroundColor:currentTheme.bodyBg}}/> }
                    
                    
                   {withoutScroll ? 
                   <View style={[
                        { flexGrow: 1, backgroundColor:currentTheme.bodyBg },
                        styles().ph20,
                        
                        style
                        ]}>
                        {children}
                    </View> : 
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[style, {flexGrow:1, backgroundColor:currentTheme.bodyBg}]}
                        keyboardShouldPersistTaps='handled'>
                            {children}
                    </ScrollView> 

}
                    
                </SafeAreaView>
            }

            

            
        </LinearGradient>
    )
}