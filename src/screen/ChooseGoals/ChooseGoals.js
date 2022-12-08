import React , { useContext ,useEffect,useState,  } from 'react'
import {  Platform,Animated, Dimensions, FlatList, Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';

import ThemeButton from '../../Component/ThemeButton/ThemeButton';
import AuthLayout from '../../Component/AuthLayout/AuthLayout';
import { FontAwesome } from '@expo/vector-icons';


const {width, height} = Dimensions.get('window');


export default function ChooseGoals(props){

  
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  

  const [goal, SetGoal] = useState(false)

  const TopGoals = [
    {
        id:0,
        image:require('../../assets/images/goal1.png'),
        heading:'Goal 1',
        content:'Track my spending'
    },
    {
        id:1,
        image:require('../../assets/images/goal2.png'),
        heading:'Goal 2',
        content:'Track my spending'
    },
    {
        id:2,
        image:require('../../assets/images/goal3.png'),
        heading:'Goal 3',
        content:'Track my spending'
    },
    {
        id:3,
        image:require('../../assets/images/goal4.png'),
        heading:'Goal 4',
        content:'Track my spending'
    },
    {
        id:4,
        image:require('../../assets/images/goal5.png'),
        heading:'Goal 5',
        content:'Track my spending'
    },
  ]
  
  

return( 
    <AuthLayout navigation={props.navigation} withoutScroll={true}>

        
            <View style={[styles().w150px, styles().h100px]}>
                <Image source={require('../../assets/images/logo.png')} resizeMode="cover" style={styles().wh100} />
            </View>

            <View style={[styles().mt25, styles().mb15]}>
                <Text style={[styles().fs24, styles().fontRegular, {color:currentTheme.black}]}>Choose your <Text style={[styles().fs24, styles().textCenter, styles().fontSemibold, styles().lh30, styles().fw600, {color:currentTheme.themeBackground}]}>Top {'\n'} Goals</Text> </Text> 
            </View>

            <View style={styles().flex}>
            <FlatList
                data={TopGoals}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={()=>{
                            SetGoal(index);
                            props.navigation.navigate('TellAboutYourself')
                        }}
                            style={[
                                styles().mb20, 
                                styles().bw2,
                                styles().h150px,
                                styles().pall20,
                                {
                                    width:width * 0.42, 
                                    marginLeft: index % 2 == 0 ? 0 : width * 0.05,
                                    borderTopRightRadius:30,
                                    borderBottomLeftRadius:30,
                                    borderColor: goal === index ? currentTheme.themeBackground : currentTheme.cE5E5E5
                                }
                                ]}>
                            <View style={[styles().wh40px, styles().alignCenter, styles().justifyCenter, styles().br5, {backgroundColor:goal === index ? currentTheme.themeBackground : currentTheme.cE5E5E5}]}>
                                <Image source={item.image} style={styles().wh20px} resizeMode="contain" />
                            </View>
                            <Text style={[styles().fs14, styles().mt10, styles().fontSemibold, styles().fw600, {color:currentTheme.black}]}>{item.heading}</Text>
                            <Text style={[styles().fs11, styles().fontRegular, {color:currentTheme.textColor}]}>{item.content}</Text>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
            </View>
         
    </AuthLayout>
    )
}