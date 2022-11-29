
import React , { useContext ,useState, useRef  } from 'react'
import {  Platform, Dimensions, FlatList, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';

import styles from '../styles';
import { Feather , Entypo, FontAwesome5, FontAwesome} from '@expo/vector-icons';
import Layout from '../../Component/Layout/Layout';
import { Transition , Transitioning  } from 'react-native-reanimated'

const transition = (
    <Transition.Together>
      <Transition.In type='fade' durationMs={200}  />
      <Transition.Change />
      <Transition.Out type='fade' durationMs={200}/> 
    </Transition.Together>
  )

export default function Faq(props) {

    const themeContext = useContext(ThemeContext)
    const currentTheme = theme[themeContext.ThemeValue]

    const [FaqShow, SetFaqShow] = useState(false)

  const Transref = useRef()
  
  const FaqSections = [
    {
        id : 1,
        FaqHeading : 'Lorem Ipsum Dolor Sit Amet',
        FaqContent : 'Whether its plumbing services, driving schools, or anything in between, our platform helps businesses cut the cost of advertisement to entice and retain loyal customers. We list trusted organizations on our website and let customers choose and coordinate with their desired service providers. Our modus operandi of connecting clients to service providers maintains a connection of authenticity, promoting trustworthy and unbiased reviews of customers.'
    },
    {
        id : 2,
        FaqHeading : 'Lorem Ipsum Dolor Sit Amet',
        FaqContent : 'Whether its plumbing services, driving schools, or anything in between, our platform helps businesses cut the cost of advertisement to entice and retain loyal customers. We list trusted organizations on our website and let customers choose and coordinate with their desired service providers. Our modus operandi of connecting clients to service providers maintains a connection of authenticity, promoting trustworthy and unbiased reviews of customers.'
    },
    {
        id : 3,
        FaqHeading : 'Lorem Ipsum Dolor Sit Amet',
        FaqContent : 'Whether its plumbing services, driving schools, or anything in between, our platform helps businesses cut the cost of advertisement to entice and retain loyal customers. We list trusted organizations on our website and let customers choose and coordinate with their desired service providers. Our modus operandi of connecting clients to service providers maintains a connection of authenticity, promoting trustworthy and unbiased reviews of customers.'
    },
    {
        id : 4,
        FaqHeading : 'Lorem Ipsum Dolor Sit Amet',
        FaqContent : 'Whether its plumbing services, driving schools, or anything in between, our platform helps businesses cut the cost of advertisement to entice and retain loyal customers. We list trusted organizations on our website and let customers choose and coordinate with their desired service providers. Our modus operandi of connecting clients to service providers maintains a connection of authenticity, promoting trustworthy and unbiased reviews of customers.'
    },
    {
        id : 5,
        FaqHeading : 'Lorem Ipsum Dolor Sit Amet',
        FaqContent : 'Whether its plumbing services, driving schools, or anything in between, our platform helps businesses cut the cost of advertisement to entice and retain loyal customers. We list trusted organizations on our website and let customers choose and coordinate with their desired service providers. Our modus operandi of connecting clients to service providers maintains a connection of authenticity, promoting trustworthy and unbiased reviews of customers.'
    },
    {
        id : 6,
        FaqHeading : 'Lorem Ipsum Dolor Sit Amet',
        FaqContent : 'Whether its plumbing services, driving schools, or anything in between, our platform helps businesses cut the cost of advertisement to entice and retain loyal customers. We list trusted organizations on our website and let customers choose and coordinate with their desired service providers. Our modus operandi of connecting clients to service providers maintains a connection of authenticity, promoting trustworthy and unbiased reviews of customers.'
    },
    {
        id : 7,
        FaqHeading : 'Lorem Ipsum Dolor Sit Amet',
        FaqContent : 'Whether its plumbing services, driving schools, or anything in between, our platform helps businesses cut the cost of advertisement to entice and retain loyal customers. We list trusted organizations on our website and let customers choose and coordinate with their desired service providers. Our modus operandi of connecting clients to service providers maintains a connection of authenticity, promoting trustworthy and unbiased reviews of customers.'
    },
    {
        id : 8,
        FaqHeading : 'Lorem Ipsum Dolor Sit Amet',
        FaqContent : 'Whether its plumbing services, driving schools, or anything in between, our platform helps businesses cut the cost of advertisement to entice and retain loyal customers. We list trusted organizations on our website and let customers choose and coordinate with their desired service providers. Our modus operandi of connecting clients to service providers maintains a connection of authenticity, promoting trustworthy and unbiased reviews of customers.'
    },
    {
        id : 9,
        FaqHeading : 'Lorem Ipsum Dolor Sit Amet',
        FaqContent : 'Whether its plumbing services, driving schools, or anything in between, our platform helps businesses cut the cost of advertisement to entice and retain loyal customers. We list trusted organizations on our website and let customers choose and coordinate with their desired service providers. Our modus operandi of connecting clients to service providers maintains a connection of authenticity, promoting trustworthy and unbiased reviews of customers.'
    },
    {
        id : 10,
        FaqHeading : 'Lorem Ipsum Dolor Sit Amet',
        FaqContent : 'Whether its plumbing services, driving schools, or anything in between, our platform helps businesses cut the cost of advertisement to entice and retain loyal customers. We list trusted organizations on our website and let customers choose and coordinate with their desired service providers. Our modus operandi of connecting clients to service providers maintains a connection of authenticity, promoting trustworthy and unbiased reviews of customers.'
    },
    {
        id : 11,
        FaqHeading : 'Lorem Ipsum Dolor Sit Amet',
        FaqContent : 'Whether its plumbing services, driving schools, or anything in between, our platform helps businesses cut the cost of advertisement to entice and retain loyal customers. We list trusted organizations on our website and let customers choose and coordinate with their desired service providers. Our modus operandi of connecting clients to service providers maintains a connection of authenticity, promoting trustworthy and unbiased reviews of customers.'
    },
  ]

    return (
        <Layout navigation={props.navigation} withoutScroll={true} LeftIcon={true} pagetitle={'Frequently Asked Questions'}>
            

                
            
            <Transitioning.View style={[styles().flex, styles().mb15]} transition={transition} ref={Transref}>
            <FlatList
                data={FaqSections}
            
                showsVerticalScrollIndicator={false}
                renderItem={({ item , index }) => {
                    return (
                        <View style={[styles().br5, styles().overflowH, styles().mb5, styles(currentTheme).bgWhite]}>
                            <TouchableOpacity key={index} 
                            onPress={()=>{
                                    Transref.current.animateNextTransition()
                                    FaqShow === index ? SetFaqShow(null) : SetFaqShow(index)
                                }
                                } 

                            style={[styles().flexRow, styles().justifyBetween, styles().alignCenter, styles().ph20, styles().bgWhite, styles().pt15, styles().pb15, styles().boxpeshadowProduct]}>
                                <Text style={[styles().fs14, styles().fontRegular, {color:currentTheme.borderColor}]}>{item.FaqHeading}</Text>
                                <FontAwesome name={FaqShow === index ? 'angle-down' : 'angle-right'} size={20} color={currentTheme.SliderDots} />
                            </TouchableOpacity>
                            {FaqShow === index ? <View style={[styles().pt15, styles(currentTheme).bgWhite, {borderTopColor:currentTheme.bodyBg, borderTopWidth:1}, styles().pb15, styles().ph20]}>
                                <Text style={[styles().fs13, styles().fontRegular, styles().lh18, {color:currentTheme.c999999}]}>{item.FaqContent}</Text>
                            </View> : null }
                        </View>
                    )
                }}
                keyExtractor={(item,index) => index.toString()}
                />
                </Transitioning.View>
               
           
        
        </Layout>
    )

}