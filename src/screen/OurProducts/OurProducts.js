import React , { useContext ,useState  } from 'react'
import {  Platform,Animated, Dimensions, FlatList, Text, TouchableOpacity, View ,Image } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';
import Layout from '../../Component/Layout/Layout';






const { width } = Dimensions.get('window');



let StateTerms = [
  {
      ProductTitle:'H2H Hoodie',
      ProductImg:require('../../assets/images/our-product-img1.png'),
      ProductPrice:'AED8253.00',
      ProductCont:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
  },
  {
    ProductTitle:'H2H Hoodie 2',
    ProductImg:require('../../assets/images/our-product-img2.png'),
    ProductPrice:'AED8253.00',
    ProductCont:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
  },
  {
    ProductTitle:'H2H Hoodie 3',
    ProductImg:require('../../assets/images/our-product-img3.png'),
    ProductPrice:'AED8253.00',
    ProductCont:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
  },
  {
    ProductTitle:'H2H Hoodie 4',
    ProductImg:require('../../assets/images/our-product-img4.png'),
    ProductPrice:'AED8253.00',
    ProductCont:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
},
{
  ProductTitle:'H2H Hoodie 5',
  ProductImg:require('../../assets/images/our-product-img5.png'),
  ProductPrice:'AED8253.00',
  ProductCont:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
},
{
  ProductTitle:'H2H Hoodie 6',
  ProductImg:require('../../assets/images/our-product-img6.png'),
  ProductPrice:'AED8253.00',
  ProductCont:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
},
]

export default function OurProducts(props){

  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  
  

    return( 
    <Layout navigation={props.navigation} withoutScroll={true} pagetitle={'Our Products'} LeftIcon={true} CartIcon={true}>
    
        <View style={[styles().flex, styles().mt5]}>
     <FlatList
          data={StateTerms}
          showsVerticalScrollIndicator={false}
        numColumns={2}
          renderItem={({ item , index }) => {
            return (
                <TouchableOpacity onPress={()=> props.navigation.navigate('ProductDetail', {prod:item})}
                    style={[styles().bgWhite, styles().mb25, styles().alignCenter, styles().pv20, styles().ph25, styles().br10, styles().bw1, 
                        {
                            borderColor:currentTheme.closingPrizeBd,
                            width : width * 0.415,
                            marginRight: index % 2 === 0 ? width * 0.06 : 0
                        }
                    ]}    
                >
                    <View style={[styles().wh130px, styles().mb10]}>
                        <Image source={item.ProductImg} style={styles().wh100} />
                    </View>
                    <Text style={[styles().fs14, styles().mb5, styles().fontBold, styles().fw700, {color:currentTheme.black}]}>{item.ProductTitle}</Text>
                    <Text style={[styles().fs16, styles().fontBold, styles().fw700, {color:currentTheme.blue}]}>{item.ProductPrice}</Text>
                </TouchableOpacity>
            )
          }}
          keyExtractor={(item,index) => index.toString()}
        />
          </View>
        </Layout>
    )
}
