import React , { useContext ,useState, useCallback  } from 'react'
import {  Platform, Dimensions, FlatList, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';

import Layout from '../../Component/Layout/Layout';
import TextField from '../../Component/FloatTextField/FloatTextField';
import ThemeButton from '../../Component/ThemeButton/ThemeButton';
import { AntDesign ,Ionicons,FontAwesome} from '@expo/vector-icons';

import Spinner from '../../Component/Spinner/Spinner';

import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import Multiselect from '../../Component/Multiselect/Multiselect';
import { ScrollView } from 'react-native-gesture-handler';



export default function PropertyData(props){

    const Title = props.route.params.pageTitle;


  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

    const [PropertyNick, setPropertyNick] = useState('')
    const [PropertyNickError, setPropertyNickError] = useState(false)

     const [value, setValue] = useState(0);
     const [PropertyType, setPropertyType] = useState('')
     const [Residence, setResidence] = useState('')

     const [Street, setStreet] = useState('')
     const [StreetError, setStreetError] = useState(false)

     const [City, setCity] = useState('')
     const [CityError, setCityError] = useState(false)

     const [State, setState] = useState('')
     const [StateError, setStateError] = useState(false)

     const [Zipcode, setZipcode] = useState('')
     const [ZipcodeError, setZipcodeError] = useState(false)
     
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
        const ResidenceList = [
            {
                name: 'Primary Residence',
                _id: 0
            },
            {
                name: 'Secondary Residence',
                _id: 1
            },
            ]
        
  
    return( 
        <Layout navigation={props.navigation} LeftIcon={true} withoutScroll={true} pagetitle={Title} >
            
            <KeyboardAvoidingView style={styles().flex}>
            <ScrollView showsVerticalScrollIndicator={false}>
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

            <View style={[styles().mt15, styles().h60px, styles().br10, styles().bw1, {borderColor:currentTheme.cEFEFEF}]}>
            <Text style={[styles().ml15, styles().mt5,  styles().fs12, styles().fw400, {color:currentTheme.textColor}]}>Property Use (optional)</Text>
                <Multiselect 
                    ListItems={ResidenceList} 
                    SelectText={'Primary Residence'} 
                    value={Residence} 
                    setValue={setResidence}
                />
            </View>
        
            <View style={styles().mt15}>
                <TextField 
                    keyboardType='default'
                    onChangeText={(e)=> {
                        setStreetError(false)
                        setStreet(e)
                        }
                    } 
                    value={Street} 
                    label="Street Address (optional)"
                    errorText={StreetError}
                    autoCapitalize='none'
                    style
                />
            </View>

            <View style={styles().mt15}>
                <TextField 
                    keyboardType='default'
                    onChangeText={(e)=> {
                        setCityError(false)
                        setCity(e)
                        }
                    } 
                    value={City} 
                    label="City"
                    errorText={CityError}
                    autoCapitalize='none'
                    style
                />
            </View>

            <View style={styles().mt15}>
                <TextField 
                    keyboardType='default'
                    onChangeText={(e)=> {
                        setStateError(false)
                        setState(e)
                        }
                    } 
                    value={State} 
                    label="State (optional)"
                    errorText={StateError}
                    autoCapitalize='none'
                    style
                />
            </View>

            <View style={styles().mt15}>
                <TextField 
                    keyboardType='numeric'
                    onChangeText={(e)=> {
                        setZipcodeError(false)
                        setZipcode(e)
                        }
                    } 
                    value={Zipcode} 
                    label="Zipcode (optional)"
                    errorText={ZipcodeError}
                    autoCapitalize='none'
                    style
                />
            </View>

            

            

            <View style={styles().mt35}>
                <ThemeButton Title={"Save"} onPress={()=>props.navigation.navigate('noDrawer')} /> 
            </View>   

            </ScrollView>
      </KeyboardAvoidingView>
      
    </Layout>
    )
}


