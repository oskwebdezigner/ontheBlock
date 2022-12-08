import React , { useContext ,useEffect,useState,  } from 'react'
import {  Platform,Animated, Dimensions, FlatList, Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';
import { Ionicons , Foundation, FontAwesome5, Feather, Octicons, AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';
import Layout from '../../Component/Layout/Layout';
import ThemeButton from '../../Component/ThemeButton/ThemeButton';

const {width, height} = Dimensions.get('window');

const HomeTopList = [
    {
        Image: require('../../assets/images/home-top-img1.png'),
        title:'Add Document'
    },
    {
        Image: require('../../assets/images/home-top-img2.png'),
        title:'Add Item'
    },
    {
        Image: require('../../assets/images/home-top-img3.png'),
        title:'More'
    },
]

const PropertiesList = [
    {
        id:0,
        Image:require('../../assets/images/home-property-img1.jpg'),
        GridImage:require('../../assets/images/home-property-grid-img1.jpg'),
        title:'Nacoa Apartment',
        address:'Alexander City, New York'
    },
    {
        id:1,
        Image:require('../../assets/images/home-property-img2.jpg'),
        GridImage:require('../../assets/images/home-property-grid-img1.jpg'),
        title:'Astute Homes',
        address:'Alexander City, New York'
    },
    {
        id:2,
        Image:require('../../assets/images/home-property-img1.jpg'),
        GridImage:require('../../assets/images/home-property-grid-img1.jpg'),
        title:'Nacoa Apartment',
        address:'Alexander City, New York'
    },
    {
        id:3,
        Image:require('../../assets/images/home-property-img2.jpg'),
        GridImage:require('../../assets/images/home-property-grid-img1.jpg'),
        title:'Astute Homes',
        address:'Alexander City, New York'
    },
    {
        id:4,
        Image:require('../../assets/images/home-property-img1.jpg'),
        GridImage:require('../../assets/images/home-property-grid-img1.jpg'),
        title:'Nacoa Apartment',
        address:'Alexander City, New York'
    }
]

const UpcomingMaintenance = [
    {
        id:0,
        upcomingImage:require('../../assets/images/upcoming-maintenance-home-img1.jpg'),
        upcomingDetailImage:require('../../assets/images/upcoming-maintenance-detail-img1.jpg'),
        title:'Floor Maintenance',
        address:'Astute Homes',
        publishedDate:'November 16, 2022',
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    },
    {
        id:1,
        upcomingImage:require('../../assets/images/upcoming-maintenance-home-img2.jpg'),
        title:'Roof Maintenance',
        address:'Astute Homes',
        publishedDate:'November 16, 2022',
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    },
    {
        id:2,
        upcomingImage:require('../../assets/images/upcoming-maintenance-home-img1.jpg'),
        title:'Floor Maintenance',
        address:'Astute Homes',
        publishedDate:'November 16, 2022',
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    },
    {
        id:3,
        upcomingImage:require('../../assets/images/upcoming-maintenance-home-img2.jpg'),
        title:'Floor Maintenance',
        address:'Astute Homes',
        publishedDate:'November 16, 2022',
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    },
    {
        id:4,
        upcomingImage:require('../../assets/images/upcoming-maintenance-home-img1.jpg'),
        title:'Floor Maintenance',
        address:'Astute Homes',
        publishedDate:'November 16, 2022',
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    }
]

export default function Home(props){

  
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  const [Grid, SetGrid] = useState(false);
  

return( 
    <Layout navigation={props.navigation} NotiIcon={true} withoutScroll={true} ProfileImg={true} pagetitle={'Hi, John Smith'} style={styles().ph0}>
        <View style={[styles().flex, {paddingLeft:width * 0.06}]}>
        <FlatList
            data={UpcomingMaintenance}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <View>
                    <View style={[{paddingRight:width * 0.06}, styles().pl5, styles().mt25, styles().pv5]}>
                        <View style={[styles(currentTheme).boxpeshadow, styles().mb20, styles().ph25, styles().pv35, styles().br10]}>
                            <FlatList
                                data={HomeTopList}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item , index }) => {
                                    return (
                                        <View style={[styles().justifyCenter, index === 0 ? null : styles().alignCenter, { width :index === 0 ? width * 0.28 : width * 0.24}]}>
                                            <View style={[styles().wh30px, styles().justifyCenter,  styles().mb10, styles().overflowH, index === 0 ? styles().alignSelfCenter : null]}>
                                                <Image source={item.Image} resizeMode="contain" style={styles().wh100} />
                                            </View>
                                            <Text>{item.title}</Text>
                                        </View>

                                    )
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>

                    <View style={[styles().flexRow, styles().justifyBetween, styles().alignCenter, {paddingRight:width * 0.06}]}>
                        <Text style={[styles().fs16, styles().fontSemibold, styles().lh26, {color:currentTheme.black}]}>Your Properties</Text>
                        <TouchableOpacity onPress={()=>SetGrid(!Grid)}>
                            <Text style={[styles().fs14, styles().fontRegular, {color:currentTheme.textColor}]}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        Grid ? 
                        <View style={[styles().mb20, styles().mt5]}>
                            <FlatList
                                data={PropertiesList}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item , index }) => {
                                    return (
                                        <TouchableOpacity onPress={()=>props.navigation.navigate('SinglePropertyListing', {singleList:item})} style={[styles().justifyCenter, { width :width * 0.85, marginLeft:index === 0 ? 0 : width * 0.03}]}>
                                            <View style={[styles().h150px, styles().br10, styles().overflowH, styles().justifyCenter,  styles().mb10]}>
                                                <Image source={item.GridImage} resizeMode="contain" style={styles().wh100} />
                                            </View>
                                            <Text style={[styles().fs14, styles().fontSemibold, {color:currentTheme.black}]}>{item.title}</Text>
                                            <View style={[styles().flexRow, styles().alignCenter, styles().justifyStart, styles().flex, styles().flexWrap]}>
                                                <FontAwesome name="map-marker" size={16} color={currentTheme.themeBackground} style={styles().mr5}/>
                                                <Text style={[styles().fs10, styles().fontRegular, {color:currentTheme.textColor}]}>{item.address}</Text>
                                            </View>
                                        </TouchableOpacity>

                                    )
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View> : <View style={[styles().mb20, styles().mt5]}>
                            <FlatList
                                data={PropertiesList}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item , index }) => {
                                    return (
                                        <TouchableOpacity onPress={()=>props.navigation.navigate('SinglePropertyListing', {singleList:item})} style={[styles().justifyCenter, { width :width * 0.43, marginLeft:index === 0 ? 0 : width * 0.03}]}>
                                            <View style={[styles().h150px, styles().br10, styles().overflowH, styles().justifyCenter,  styles().mb10]}>
                                                <Image source={item.Image} resizeMode="contain" style={styles().wh100} />
                                            </View>
                                            <Text style={[styles().fs14, styles().fontSemibold, {color:currentTheme.black}]}>{item.title}</Text>
                                            <View style={[styles().flexRow, styles().alignCenter, styles().justifyStart, styles().flex, styles().flexWrap]}>
                                                <FontAwesome name="map-marker" size={16} color={currentTheme.themeBackground} style={styles().mr5}/>
                                                <Text style={[styles().fs10, styles().fontRegular, {color:currentTheme.textColor}]}>{item.address}</Text>
                                            </View>
                                        </TouchableOpacity>

                                    )
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View> 
                    }
                    {/* <View style={[styles().mb20, styles().mt5]}>
                        <FlatList
                            data={PropertiesList}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item , index }) => {
                                return (
                                    <TouchableOpacity onPress={()=>props.navigation.navigate('SinglePropertyListing', {singleList:item})} style={[styles().justifyCenter, { width :width * 0.43, marginLeft:index === 0 ? 0 : width * 0.03}]}>
                                        <View style={[styles().h150px, styles().br10, styles().overflowH, styles().justifyCenter,  styles().mb10]}>
                                            <Image source={item.Image} resizeMode="contain" style={styles().wh100} />
                                        </View>
                                        <Text style={[styles().fs14, styles().fontSemibold, {color:currentTheme.black}]}>{item.title}</Text>
                                        <View style={[styles().flexRow, styles().alignCenter, styles().justifyStart, styles().flex, styles().flexWrap]}>
                                            <FontAwesome name="map-marker" size={16} color={currentTheme.themeBackground} style={styles().mr5}/>
                                            <Text style={[styles().fs10, styles().fontRegular, {color:currentTheme.textColor}]}>{item.address}</Text>
                                        </View>
                                    </TouchableOpacity>

                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View> */}

                    <View style={[styles().flexRow, styles().justifyBetween, styles().alignCenter, {paddingRight:width * 0.06}]}>
                        <Text style={[styles().fs16, styles().fontSemibold, styles().lh26, {color:currentTheme.black}]}>Upcoming Maintenance</Text>
                        <TouchableOpacity>
                            <Text style={[styles().fs14, styles().fontRegular, {color:currentTheme.textColor}]}>See All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            renderItem={({ item , index }) => {
                return (
                    <View style={{paddingHorizontal:3}}>
                        <View style={[styles().justifyBetween, styles().flexRow, styles().boxpeshadow, styles().br10, styles().ph15, styles().pv15, styles().mb20, index === 0 ? styles().mt5 : null, { width : width * 0.88}]}>
                            <View style={[styles().w100px, styles().h110px, styles().br10, styles().overflowH]}>
                                <Image source={item.upcomingImage} resizeMode="cover" style={styles().wh100} />
                            </View>
                            <View style={[styles().flex, styles().justifyBetween, styles().ml10]}>
                                <Text style={[styles().fs14, styles().fontSemibold, {color:currentTheme.black}]}>{item.title}</Text>
                                <View style={[styles().flexRow, styles().alignCenter, styles().justifyStart]}>
                                    <View style={styles().mtminus5}>
                                        <Entypo name="home" size={10} color={currentTheme.textColor} style={styles().mr5}/>
                                    </View>
                                    <Text style={[styles().fs10, styles().fontRegular, {color:currentTheme.textColor}]}>{item.address}</Text>
                                </View>
                                <View style={[styles().flexRow,  styles().alignCenter]}>
                                    <View style={styles().mtminus5}>
                                        <Entypo name="calendar" size={10} color={currentTheme.textColor} style={styles().mr5}/>
                                    </View>
                                    <Text style={[styles().fs10, styles().fontRegular, {color:currentTheme.textColor}]}>{item.publishedDate}</Text>
                                </View>
                                <ThemeButton onPress={()=>props.navigation.navigate('MaintenanceDetail', {maintenance:item})} Title={'View Details'} Style={[styles().h40px, styles().mt10, styles().w98]} StyleText={styles().fs12} />
                            </View>
                            <TouchableOpacity style={[styles().wh20px, styles().alignCenter, styles().justifyCenter, styles().br5, {backgroundColor:currentTheme.themeSecondary}]}>
                                <FontAwesome5 name="ellipsis-h" size={12} color={currentTheme.black} />
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                )
            }}
            keyExtractor={(item, index) => index.toString()}
        />
        </View>
        
         
    </Layout>
    )
}
