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



export default function AuthLayout({ withoutScroll, style, children, navigation}) {

    const themeContext = useContext(ThemeContext)
    const currentTheme = theme[themeContext.ThemeValue]

    

    return (
        <LinearGradient colors={currentTheme.authGradient} style={[styles().flex]}>

        <SafeAreaView style={[styles().flex, {
                    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                    
                }]}>
                  
                   {withoutScroll ? 
                   <View style={[
                        { flexGrow: 1, },
                        styles().ph20, styles().pt35,
                        
                        style
                        ]}>
                        {children}
                    </View> : 
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[style, styles().ph20, styles().pb20, styles().pt35, {flexGrow:1,}]}
                        keyboardShouldPersistTaps='handled'>
                            {children}
                    </ScrollView> 

}
                    
        </SafeAreaView>

        </LinearGradient>
            

            

            
        
    )
}