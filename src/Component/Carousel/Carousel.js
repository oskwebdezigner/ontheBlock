import React , { useContext ,useEffect,useState,  } from 'react'
import {  Platform,Animated, Dimensions, FlatList, Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../../screen/styles';
import { Ionicons , Foundation, FontAwesome5, Feather, Octicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import ThemeButton from '../ThemeButton/ThemeButton';
import Carousel , { Pagination } from 'react-native-snap-carousel';

const DATA = [];
for (let i = 0; i < 3; i++) {
  DATA.push(i)
}

const {height, width} = Dimensions.get('window');
const numColumns = 3;
const itemHeight = Dimensions.get('window').width / numColumns
const ITEM_HEIGHT = Math.round(height * 0.154)


export default function CarouselView(props){

  
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  const [ activeSlide , setActiveSlide] = useState(0)

function pagination () {
  // const [Slider, activeSlide] = useState([])
return (
    <Pagination
      dotsLength={props.Slider.length}
      activeDotIndex={activeSlide}
      containerStyle={{
          backgroundColor:'transparent'
      }}
      dotStyle={[styles(currentTheme).SliderdotStyle]}
      inactiveDotStyle={styles(currentTheme).SliderInActivedot}
      inactiveDotOpacity={0.8}
      inactiveDotScale={0.8}
      
    />
);
}

function SliderContent(){
  return(
      <View style={styles().flex}>
          <Text style={[styles().fs30, styles().fontBold, styles().fw700, styles().lh36, styles(currentTheme).bgTextWhite]}>Win Studio {'\n'} Apartment In Dubai</Text>
          <Text style={[styles().fs14, styles().fontBold, styles().fw700, styles(currentTheme).bgTextWhite]}>Buy our Rosa Set, and make it yours!</Text>
          <ThemeButton Title={'See Details'} Style={[styles().mv10, styles().h40px, styles().alignSelfStart]} />
      </View>
  )
}


  
  

    return( 
        <View style={props.SliderStyle}>
        <Carousel
                        data={props.Slider}
                        renderItem={({ item, i }) => {
                            return (
                                <View style={[{
                                    height:350,
                                    width :width * 1,
                                }]}>
                                    <Image
                                        resizeMode='cover'
                                        style={[styles().wh100, {zIndex:-1}]}
                                        source={item.Image}
                                />
                                    <View style={{position:'absolute',flex:1, bottom:50, left:20, right:20}}>
                                         {/* <ProductHeader /> */}
                                        <SliderContent />
                                    </View>
                                </View>
                            )
                        }}
                        sliderWidth={width * 1}
                        itemWidth={width * 1}
                        inactiveSlideShift={0}
                        onSnapToItem={(index) => setActiveSlide(index)}
                        useScrollView={true}          
                    />
                    <View style={{position:'absolute', bottom:0, left:0, right:0}}>
                    {pagination()}
                    </View>
                    </View>
    )
}
