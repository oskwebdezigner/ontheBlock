import React , { useContext ,useEffect,useState,  } from 'react'
import {  Platform,Animated, Dimensions, FlatList, Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';
import { Ionicons , Foundation, FontAwesome5, Feather, Octicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import Layout from '../../Component/Layout/Layout';
import PrizeComponent from '../../Component/PrizeComponent/PrizeComponent';
import CountDownComponent from '../../Component/CountDownComponent/CountDownComponent';
import SoldPrize from '../../Component/SoldPrize/SoldPrize';
import Winners from '../../Component/Winners/Winners';
import { ScrollView } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const TabHeadList = [
    {
        id:0,
        tabName: 'Prize Details',
        totalNo:2000, 
        SoldNo:186,
        amount:'AED30,000',
        SubTitle: 'Get a Chance to Win',
        Title: 'Win Studio Apartment in Dubai or',
        TItle2: 'Cash',
        Image: require('../../assets/images/closingPrizeImg.png'),
        PrizeDetail:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
        // component: <CountDownComponent item={CountDownList} />
    },
    {
        id:1,
        tabName:'Product Details',
        totalNo:850, 
        SoldNo:755,
        
        SubTitle: 'Product type',
        Title: 'H2H Hoodie',
        
        Image: require('../../assets/images/closing-product-img.png'),
        PrizeDetail:'asdf Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. asdf Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. asdf Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. asdf Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
        // component : <Winners item={WinnersList} />
    },
]

export default function PrizeDetail(props){



  
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  const [TabActive, SetTabActive] = useState(0);

  const percent = TabHeadList[TabActive].SoldNo / TabHeadList[TabActive].totalNo * 100;
//   console.log(percent)

const [count, SetCount] = useState(0);

function MinusCount(){
    SetCount((old)=> old > 0 ? old - 1 : old)
}

function PlusCount(){
    SetCount((old)=> old + 1)
}

return( 
    <Layout navigation={props.navigation} withoutScroll={true} LeftIcon={true} homeGrad={true} ProfileImg={false} style={styles().ph0} >
        
    <View style={[styles().flex, styles().ph20, styles().pb20]}>
        
        <View style={[styles().flexRow, styles().mb15, styles().justifyBetween, styles().alignCenter]}>
            <View style={styles().w50}>
                <Text style={[styles().fs11, styles().fontRegular, styles().fw400, {color:currentTheme.textColor}]}>{TabHeadList[TabActive].SoldNo} Sold out of {TabHeadList[TabActive].totalNo}</Text>
                <View style={[styles().w100, styles().mt5, styles().h5px, styles().br5, { backgroundColor: currentTheme.cEFEFEF }]}>
                    <View style={[styles().h5px, styles().br5, { backgroundColor: currentTheme.blue, width: `${percent}%` }]}></View>
                </View>
            </View>
            
        </View>

        <View style={[styles().flexRow, styles().pv5, styles().br5, styles().ph10, styles().mb15, styles(currentTheme).bgWhite, styles().alignCenter]}>
            <View style={[styles().wh35px, styles().mr5]}>
                <Image source={require('../../assets/images/prize-date.png')} style={styles().wh100} />
            </View>
            <View style={styles().flex}>
                <Text style={[styles().fs12, styles().fontMedium, {color:currentTheme.textColor}]}>Max draw date November 29, 2022</Text>
                <Text style={[styles().fs9, styles().fw400, styles().fontRegular, {color:currentTheme.textColor}]}>or when the campaign is sold out, Whichever is earlier</Text>
            </View>
        </View>

        <View style={[styles().h140px, styles().w100, styles().overflowH, styles().bgWhite, styles().alignCenter, styles().br10, styles().mb5, styles().w100, styles().bw0, TabHeadList[TabActive].tabName === 'Product Details' && styles().pv10]}>
            <Image source={TabHeadList[TabActive].Image} style={[styles().wh100, styles().bgWhite, styles().alignCenter, TabHeadList[TabActive].tabName === 'Product Details' && {aspectRatio:1}]}  resizeMode="cover" />
            <View style={[styles().posAbs, styles().bottom15, styles().right15, styles().flexRow]}>
                <TouchableOpacity style={[styles().wh30px, styles().mr10, styles().alignCenter, styles().boxpeshadowProduct, styles().justifyCenter, styles().br5, styles().bw0, styles(currentTheme).bgWhite]}>
                    <FontAwesome name="heart-o" size={18} color={currentTheme.black} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles().wh30px, styles().alignCenter, styles().justifyCenter, styles().boxpeshadowProduct, styles().br5, styles().bw0, styles(currentTheme).bgWhite]}>
                    <FontAwesome name="share-alt" size={18} color={currentTheme.black} />
                </TouchableOpacity>
            </View>
        </View>

        <View style={[styles().TabHead, styles().mt10, styles().mb20,  styles().flexRow, styles().alignCenter, styles().ph5, styles().br10, styles().pv5, styles(currentTheme).bgWhite, styles().justifyBetween]}>
            {TabHeadList.map((item, i) =>
                <TouchableOpacity key={i} onPress={()=> SetTabActive(i)} style={[styles().pv15, styles().w48, styles().br10, styles().alignCenter, {backgroundColor: TabActive === i ? currentTheme.blue : currentTheme.white}]}>
                    <Text style={[styles().fs14, styles().fontMedium, styles().fw600, {color:TabActive === i ? currentTheme.white : currentTheme.black}]}>{item.tabName}</Text>
                </TouchableOpacity>
                )
            }
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles().fs14, styles().fontRegular, styles().fw400, {color:currentTheme.borderColor}]}>{TabHeadList[TabActive].SubTitle}</Text>
            <Text style={[styles().fs18, styles().mt5, styles().mb5, styles().fontBold, styles().fw700, {color:currentTheme.borderColor}]}>{TabHeadList[TabActive].Title} <Text style={{color:currentTheme.themeBackground}}>{TabHeadList[TabActive].amount}</Text> {TabHeadList[TabActive].TItle2}</Text>
            <Text style={[styles().fs13, styles().fontRegular, styles().lh18, {color:currentTheme.black}]}>{TabHeadList[TabActive].PrizeDetail}</Text>
        </ScrollView>

    </View>

    <View style={[{flex:0.1}, styles().pv5, styles().ph20, styles().flexRow, styles().justifyBetween, styles().alignCenter, styles().bgWhite, styles().bottom0]}>
        <View>
            <Text style={[styles().fs14, styles().fontRegular, {color:currentTheme.black}]}>Buy a Rosa Set</Text>
            <Text style={[styles().fs14, styles().fontMedium, {color:currentTheme.blue}]}>AED 50.00 <Text style={[styles().fs10, styles().fontRegular, {color:currentTheme.borderColor}]}>(Inclusive of VAT)</Text></Text>
        </View>
        <View style={[styles().flexRow, styles().justifyBetween]}>
            <TouchableOpacity onPress={()=>MinusCount()} style={[styles().wh40px, styles().alignCenter, styles().justifyCenter, styles().br5, {backgroundColor:currentTheme.EBEBEB}]}>
                <FontAwesome name="minus" size={16} color={currentTheme.black} />
            </TouchableOpacity>
            <Text style={[styles().fs14, styles().fontRegular, styles().fs400, styles().w50px, styles().h40px, styles().lh36, styles().textCenter]}>{count}</Text>
            <TouchableOpacity onPress={()=>PlusCount()} style={[styles().wh40px, styles().alignCenter, styles().justifyCenter, styles().br5, {backgroundColor:currentTheme.themeBackground}]}>
                <FontAwesome name="plus" size={16} color={currentTheme.white} />
            </TouchableOpacity>
        </View>
        
    </View>

    

    



    
         
    </Layout>
    )
}
