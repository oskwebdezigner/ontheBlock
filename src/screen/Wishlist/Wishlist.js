import React , { useContext ,useEffect,useState,  } from 'react'
import {  Platform,Animated, Dimensions, FlatList, Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';
import { Ionicons , Foundation, FontAwesome5, Feather, Octicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import Layout from '../../Component/Layout/Layout';
import ThemeButton from '../../Component/ThemeButton/ThemeButton';

const {width, height} = Dimensions.get('window');





export default function Wishlist(props){

  
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  const [ClosingSoonPrize, SetClosingSoonPrize] = useState ([
    {
        id:0,
        totalNo:1950, 
        SoldNo:855,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png'),
        ProductName: 'H2H t-shirt'
    },
    {
        id:1,
        totalNo:1500, 
        SoldNo:750,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png'),
        ProductName: 'H2H t-shirt'
    },
    {
        id:2,
        totalNo:1200, 
        SoldNo:480,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png'),
        ProductName: 'H2H t-shirt'
    },
    {
        id:3,
        totalNo:2500, 
        SoldNo:1140,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png'),
        ProductName: 'H2H t-shirt'
    },
    {
        id:4,
        totalNo:1950, 
        SoldNo:855,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png'),
        ProductName: 'H2H t-shirt'
    },
    {
        id:5,
        totalNo:2000, 
        SoldNo:186,
        amount:'AED30,000',
        Image: require('../../assets/images/prize-img.png'),
        ProductName: 'H2H t-shirt'
    },
])

function RemoveItem (index){
    ClosingSoonPrize.splice(index, 1)
    SetClosingSoonPrize((prev)=>[...prev])
}

return( 
    <Layout navigation={props.navigation} withoutScroll={true} LeftIcon={true} pagetitle={'Wishlist'} homeGrad={true} ProfileImg={false} >
        
    <View style={styles().flex}>
    <FlatList
      data={ClosingSoonPrize}

      
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {

        const percent = item.SoldNo / item.totalNo * 100;
        
        return (
          <View
            style={[
                styles().pall15, 
                styles().bw1, 
                styles().br10, 
                styles(currentTheme).bgWhite, 
                styles().w100, 
                styles().mb20, 
                styles().flexRow,
                styles().alignCenter,
                { borderColor: currentTheme.closingPrizeBd}
            ]}>

            <TouchableOpacity style={[styles().posAbs, styles().top10, styles().right10]} 
            onPress={()=>RemoveItem(index)}>
                <AntDesign name="close" size={16} color={currentTheme.SliderDots} />    
            </TouchableOpacity>            
            <View style={[styles().w100px, styles().h70px, styles().mr15, styles().mb5]}>
              <Image source={item.Image} style={styles().wh100} resizeMode="cover" />
            </View>
            <View style={[styles().alignSelfStart]}>
                
                <Text style={[styles().fs12, styles().lh20, styles().fontRegular, styles().fw400, { color: currentTheme.black }]}>{item.ProductName} </Text>
                <Text style={[styles().fs14, styles().fontBold, styles().fw700]}>{item.amount} Cash</Text>
                <View style={[styles().w100, styles().mt10, styles().h5px, styles().br5, { backgroundColor: currentTheme.cEFEFEF }]}>
                    <View style={[styles().h5px, styles().br5, { backgroundColor: currentTheme.blue, width: `${percent}%` }]}></View>
                </View>
                <Text style={[styles().fs11, styles().fontRegular, styles().fw400, { color: currentTheme.textColor }]}>{item.SoldNo} Sold out of {item.totalNo}</Text>
                
                <ThemeButton Title={'Add to Cart'} Style={[styles().h35px, styles().ph15, styles().mt10]} />
                
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
