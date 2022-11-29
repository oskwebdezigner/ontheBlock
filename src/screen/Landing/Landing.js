import React, { useState, useRef, useContext ,useEffect } from 'react'
import { View, Text, Image, ImageBackground, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import styles from '../styles'
import ThemeContext from '../../context/ThemeContext/ThemeContext'
import { theme } from '../../context/ThemeContext/ThemeColor'
import ThemeButton from '../../Component/ThemeButton/ThemeButton'
import Layout from '../../Component/Layout/Layout'

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export default function Landing(props) {
    const themeContext = useContext(ThemeContext)
    const currentTheme = theme[themeContext.ThemeValue]
    
   
    return (
        <Layout navigation={props.navigation}>
            <View style={[styles().flex, styles().alignCenter, styles().justifyCenter]}>
                <View style={[styles().w100, styles().ph35, styles().h100px]}>
                    <Image source={require('../../assets/images/logo.png')} style={styles().wh100} resizeMode="contain" />
                </View>
            </View>
            <View style={[styles().bottom15, styles().ph20]}>
                <ThemeButton Title={'Continue'} onPress={()=>props.navigation.navigate('noDrawer')} withoutBg={false} />
            </View>
        </Layout>
    )
}