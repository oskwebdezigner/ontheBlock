import React , { useContext ,useState, useCallback  } from 'react'
import {  Platform, Dimensions, FlatList, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';

import AuthLayout from '../../Component/AuthLayout/AuthLayout';
import TextField from '../../Component/FloatTextField/FloatTextField';
import ThemeButton from '../../Component/ThemeButton/ThemeButton';
import { AntDesign ,Ionicons,FontAwesome} from '@expo/vector-icons';

import Spinner from '../../Component/Spinner/Spinner';

import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import Multiselect from '../../Component/Multiselect/Multiselect';



export default function TellAboutHome(props){

  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

    const [PropertyNick, setPropertyNick] = useState('')
    const [PropertyNickError, setPropertyNickError] = useState(false)

    const [Bedrooms, setBedrooms] = useState('')
    const [BedroomsError, setBedroomsError] = useState(false)

    const [Bathroom, setBathroom] = useState('')
    const [BathroomError, setBathroomError] = useState(false)

     const [value, setValue] = useState(0);

     const [PropertyType, setPropertyType] = useState('')
     
     const PropertyTypeList = [
        {
            name: 'Apartment',
            _id: 0
        },
        {
            name: 'Bangalow',
            _id: 1
        },
        ]

  
    return( 
        <AuthLayout navigation={props.navigation}>
      
        <View style={styles().flex}>
            <View style={[styles().w150px, styles().h100px]}>
                <Image source={require('../../assets/images/logo.png')} resizeMode="cover" style={styles().wh100} />
            </View>

            <View style={[styles().mt25]}>
                <Text style={[styles().fs24, styles().fontRegular, {color:currentTheme.black}]}>
                Tell Me About 
                </Text> 
                <Text style={[styles().fs24, styles().fontSemibold, styles().lh30, styles().fw600, {color:currentTheme.themeBackground}]}> Your Home</Text> 
                
            </View>

            <View style={styles().mt15}>
                <TextField 
                    keyboardType='default'
                    onChangeText={(e)=> {
                        setPropertyNickError(false)
                        setPropertyNick(e)
                        }
                    } 
                    value={PropertyNick} 
                    label="Property Nickname"
                    errorText={PropertyNickError}
                    autoCapitalize='none'
                    style
                />
            </View>

            <View style={[styles().mt15, styles().h60px, styles().br10, styles().bw1, {borderColor:currentTheme.cEFEFEF}]}>
            <Text style={[styles().ml15, styles().mt5,  styles().fs12, styles().fw400, {color:currentTheme.textColor}]}>Property type (optional)</Text>
                <Multiselect 
                    ListItems={PropertyTypeList} 
                    SelectText={'Apartment'} 
                    value={PropertyType} 
                    setValue={setPropertyType}
                />
            </View>
        
            <View style={styles().mt15}>
                <TextField 
                    keyboardType='numeric'
                    onChangeText={(e)=> {
                        setBedroomsError(false)
                        setBedrooms(e)
                        }
                    } 
                    value={Bedrooms} 
                    label="Bedroom(s)"
                    errorText={BedroomsError}
                    autoCapitalize='none'
                    style
                />
            </View>

            <View style={styles().mt15}>
                <TextField 
                    keyboardType='numeric'
                    onChangeText={(e)=> {
                        setBathroomError(false)
                        setBathroom(e)
                        }
                    } 
                    value={Bathroom} 
                    label="Bathroom(s)"
                    errorText={BathroomError}
                    autoCapitalize='none'
                    style
                />
            </View>

            

            <View style={[styles().mt15, styles().h70px, styles().br10, styles().bw1, {borderColor:currentTheme.cEFEFEF}]}>
                <Text style={[styles().ml15, styles().mt5, styles().mb5, styles().fs12, styles().fw400, {color:currentTheme.textColor}]}>How long have you owned your home?</Text>
                <View style={[styles().flexRow, styles().justifyCenter, styles().overflowH, styles().h40px, styles().alignCenter]}>
                    <Slider 
                        min={0} 
                        max={100} 
                        step={1}
                        valueOnChange={value => setValue(value)}
                        showValueLabels={false}
                        showRangeLabels={false}
                        knobColor={currentTheme.themeBackground}
                        knobSize={12}
                        styleSize={'small'}
                        inRangeBarColor={currentTheme.EEEEEE}
                        outOfRangeBarColor={currentTheme.EEEEEE}
                        barHeight={40}
                        containerStyle={{alignItems:'center', justifyContent:'center'}}
                    />
                    <Text style={[styles().fs13, styles().fontRegular, styles().mr15, {color:currentTheme.black}]}>{value}</Text>
                </View>
            </View>

            <View style={styles().mt15}>
                <ThemeButton Title={"Create"} onPress={()=>props.navigation.navigate('noDrawer')} /> 
            </View>   

      </View>
    </AuthLayout>
    )
}


