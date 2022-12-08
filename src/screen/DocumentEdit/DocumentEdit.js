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
export default function DocumentEdit(props){

    

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
    
    const [ItemCat, setItemCat] = useState('')

    const [ItemName, setItemName] = useState('')
    const [ItemNameError, setItemNameError] = useState(false)

    const [ItemBrand, setItemBrand] = useState('')
    const [ItemBrandError, setItemBrandError] = useState(false)

    const [ItemModel, setItemModel] = useState('')
    const [ItemModelError, setItemModelError] = useState(false)

    const [ItemSerial, setItemSerial] = useState('')
    const [ItemSerialError, setItemSerialError] = useState(false)

    const [ItemDocName, setItemDocName] = useState('')
    const [ItemDocNameError, setItemDocNameError] = useState(false)

    const [profilePicLoading , setProfilePicLoading ] = useState(false)
    const [profilePic , setProfilePic ] = useState('')

    
    

    const ItemCategList = [
        {
            name:'Kitchen',
            _id:0
        },
        {
            name:'Systems',
            _id:1
        },
        {
            name:'Utilities',
            _id:2
        }
    ]
        
  
    return( 
        <Layout navigation={props.navigation} LeftIcon={true} withoutScroll={true} pagetitle={'Document Details'} >
            {/* <View style={[styles().h250px, styles().w100, styles().overflowH]}>
            <View style={{ 
                height: "100%",
                width: "100%",
                alignItems:'center',
                transform: [{ scaleX:2 }],
                borderBottomLeftRadius: width,
                borderBottomRightRadius: width,
                backgroundColor:'red',
                overflow: "hidden",
                }}>
            <View style={{
                
                 transform: [{ scaleX: 0.5 }],
                 backgroundColor: "yellow",
                 justifyContent:'center',
                 width:'100%',
                 height:'100%'

            }} >
            <Image source={{uri:'https://www.w3schools.com/html/pic_trulli.jpg'}} style={{
                
                flex:1,
                height:null,
                width:null,
                

            }} />
</View>
                
                </View>
                </View> */}

            <View style={styles().flex}>
            
        
               


                

            

            <View style={styles().mt15}>
               
                    <TextField 
                        keyboardType='default'
                        onChangeText={(e)=> {
                            setItemDocNameError(false)
                            setItemDocName(e)
                            }
                        } 
                        value={ItemDocName} 
                        label="Documents Name"
                        errorText={ItemDocNameError}
                        autoCapitalize='none'
                        style
                    />
                </View>
               

            <View style={[styles().mt15, styles().pb10, styles().br10, styles().bw1, {borderColor:currentTheme.cEFEFEF}]}>
                <Text style={[styles().ml15, styles().mt5, styles().fs12, styles().fw400, {color:currentTheme.textColor}]}>Upload Documents</Text>
               
                <View style={[styles().flexRow, styles().ml10, styles().mr15, styles().flexWrap, styles().alignCenter]}>
                    {!profilePicLoading ? <CameraComponent loading={(e) => setProfilePicLoading(e)} update={(e) =>  {
                        setProfilePic(e)
                        }}>
                    {profilePic !== ''  ? <View style={[styles().mt10, styles().justifyCenter, styles().alignCenter, styles().br5, styles().bw1, styles().wh40px, {top:-3, borderStyle:'dashed', borderColor:currentTheme.textColor}]}>
                    <Image source={{uri : profilePic}} style={styles().wh100} />
                    {/* <EvilIcons name="image" size={30} color={currentTheme.iconColor} /> */}
                    </View> : <View style={[styles().mt10, styles().justifyCenter, styles().alignCenter, styles().br5, styles().bw1, styles().wh40px, {borderStyle:'dashed', borderColor:currentTheme.textColor}]}>
                            <EvilIcons name="image" size={20} color={currentTheme.textColor} /> 
                        </View>}
                    
                    </CameraComponent> : 
                    <ActivityIndicator color={currentTheme.themeBackground} />
                    } 
                    <View style={[styles().ml5, styles().mt10, styles().justifyCenter, styles().alignCenter, styles().br5, styles().bw1, styles().wh40px, {borderStyle:'dashed', borderColor:currentTheme.textColor}]}>
                        <EvilIcons name="image" size={20} color={currentTheme.textColor} /> 
                    </View>
                    <View style={[styles().ml10, styles().mt10, styles().justifyCenter, styles().alignCenter, styles().br5, styles().bw1, styles().wh40px, {borderStyle:'dashed', borderColor:currentTheme.textColor}]}>
                        <EvilIcons name="image" size={20} color={currentTheme.textColor} /> 
                    </View>
                    <View style={[styles().ml10, styles().mt10, styles().justifyCenter, styles().alignCenter, styles().br5, styles().bw1, styles().wh40px, {borderStyle:'dashed', borderColor:currentTheme.textColor}]}>
                        <EvilIcons name="image" size={20} color={currentTheme.textColor} /> 
                    </View>
                    <View style={[styles().ml10, styles().mt10, styles().justifyCenter, styles().alignCenter, styles().br5, styles().bw1, styles().wh40px, {borderStyle:'dashed', borderColor:currentTheme.textColor}]}>
                        <EvilIcons name="image" size={20} color={currentTheme.textColor} /> 
                    </View>
                    <View style={[styles().ml10, styles().mt10, styles().justifyCenter, styles().alignCenter, styles().br5, styles().bw1, styles().wh40px, {borderStyle:'dashed', borderColor:currentTheme.textColor}]}>
                        <EvilIcons name="image" size={20} color={currentTheme.textColor} /> 
                    </View>
                    <View style={[styles().ml5, styles().mt10, styles().justifyCenter, styles().alignCenter, styles().br5, styles().bw1, styles().wh40px, {borderStyle:'dashed', borderColor:currentTheme.textColor}]}>
                        <EvilIcons name="image" size={20} color={currentTheme.textColor} /> 
                    </View>
                    <View style={[styles().ml10, styles().mt10, styles().justifyCenter, styles().alignCenter, styles().br5, styles().bw1, styles().wh40px, {borderStyle:'dashed', borderColor:currentTheme.textColor}]}>
                        <EvilIcons name="image" size={20} color={currentTheme.textColor} /> 
                    </View>
                    <View style={[styles().ml10, styles().mt10, styles().justifyCenter, styles().alignCenter, styles().br5, styles().bw1, styles().wh40px, {borderStyle:'dashed', borderColor:currentTheme.textColor}]}>
                        <EvilIcons name="image" size={20} color={currentTheme.textColor} /> 
                    </View>
                    <View style={[styles().ml10, styles().mt10, styles().justifyCenter, styles().alignCenter, styles().br5, styles().bw1, styles().wh40px, {borderStyle:'dashed', borderColor:currentTheme.textColor}]}>
                        <EvilIcons name="image" size={20} color={currentTheme.textColor} /> 
                    </View>
                    <View style={[styles().ml10, styles().mt10, styles().justifyCenter, styles().alignCenter, styles().br5, styles().bw1, styles().wh40px, {borderStyle:'dashed', borderColor:currentTheme.textColor}]}>
                        <EvilIcons name="image" size={20} color={currentTheme.textColor} /> 
                    </View>
                    <View style={[styles().ml10, styles().mt10, styles().justifyCenter, styles().alignCenter, styles().br5, styles().bw1, styles().wh40px, {borderStyle:'dashed', borderColor:currentTheme.textColor}]}>
                        <EvilIcons name="image" size={20} color={currentTheme.textColor} /> 
                    </View>
                </View>
                <View style={[styles().ml15, styles().mt10]}>
                    <Text style={[styles().fs11, styles().fw300, {color:currentTheme.lightRed}]}>You Can Upload Pdf, Word Or Picture</Text>
                </View>
            </View> 
            

            </View>

            

            <View style={[styles().mt35, styles().mb20]}>
                <ThemeButton Title={"Save"} /> 
            </View>   

            
      
    </Layout>
    )
}


