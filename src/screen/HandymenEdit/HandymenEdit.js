import React , { useContext ,useState, useCallback  } from 'react'
import {  Platform, Dimensions, FlatList, KeyboardAvoidingView, Text, TextInput, ActivityIndicator, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';

import Layout from '../../Component/Layout/Layout';
import TextField from '../../Component/FloatTextField/FloatTextField';
import ThemeButton from '../../Component/ThemeButton/ThemeButton';
import { AntDesign ,Ionicons,EvilIcons,FontAwesome} from '@expo/vector-icons';

import Spinner from '../../Component/Spinner/Spinner';

import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import Multiselect from '../../Component/Multiselect/Multiselect';
import { ScrollView } from 'react-native-gesture-handler';
import CameraComponent from '../../Component/CameraComponent/CameraComponent';
import MultipleImagePicker from '../../Component/CameraComponent/MultipleImagePicker';
import { ImageBackground } from 'react-native-web';


const {width, height} = Dimensions.get('window')
export default function HandymenEdit(props){

  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]
    
    const [Occupation, setOccupation] = useState('')

    const [PersonName, setPersonName] = useState('')
    const [PersonNameError, setPersonNameError] = useState(false)

    const [PersonPhone, setPersonPhone] = useState('')
    const [PersonPhoneError, setPersonPhoneError] = useState(false)

    const HandymenList = [
        {
            name:'Electrician',
            _id:0
        },
        {
            name:'Plumber',
            _id:1
        },
        
    ]
        
  
    return( 
        <Layout navigation={props.navigation} LeftIcon={true} withoutScroll={true} pagetitle={'Item Details'} >
            

            <View style={styles().flex}>
            

                <View style={[styles().mt15, styles().h60px, styles().br10, styles().bw1, {borderColor:currentTheme.cEFEFEF}]}>
                <Text style={[styles().ml15, styles().mt5,  styles().fs12, styles().fw400, {color:currentTheme.textColor}]}>Occupation</Text>
                    <Multiselect 
                        ListItems={HandymenList} 
                        SelectText={'Electrician'} 
                        value={Occupation} 
                        setValue={setOccupation}
                    />
                </View>
        
                <View style={styles().mt15}>
                    <TextField 
                        keyboardType='default'
                        onChangeText={(e)=> {
                            setPersonNameError(false)
                            setPersonName(e)
                            }
                        } 
                        value={PersonName} 
                        label="Person Name"
                        errorText={PersonNameError}
                        autoCapitalize='none'
                        style
                    />
                </View>

                <View style={styles().mt15}>
                    <TextField 
                        keyboardType='default'
                        onChangeText={(e)=> {
                            setPersonPhoneError(false)
                            setPersonPhone(e)
                            }
                        } 
                        value={PersonPhone} 
                        label="Person Phone Number"
                        errorText={PersonPhoneError}
                        autoCapitalize='none'
                        style
                    />
                </View>

                <View style={styles().mt15}>
                    <TouchableOpacity style={[styles().flexRow, styles().alignCenter]}>
                        <FontAwesome name="plus-square" size={20} color={currentTheme.textColor} />
                        <Text style={[styles().ml10, styles().fs14, styles().fw400, {color:currentTheme.black}]}>Add new Handymen</Text>
                    </TouchableOpacity>
                </View>
            

                </View>

            

            <View style={[styles().mt35, styles().mb20]}>
                <ThemeButton Title={"Save"} /> 
            </View>   

            
      
      
    </Layout>
    )
}


