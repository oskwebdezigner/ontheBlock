import React , { useContext ,useState  } from 'react'
import { Text, TouchableOpacity, View, ScrollView, FlatList,Image, KeyboardAvoidingView } from 'react-native';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import styles from '../styles';
import { FontAwesome5, FontAwesome, Feather, Ionicons, SimpleLineIcons} from '@expo/vector-icons';
import Layout from '../../Component/Layout/Layout';
import ThemeButton from '../../Component/ThemeButton/ThemeButton';
import TextField from '../../Component/TextField/TextField';
import UserContext from '../../context/User/User';

export default function WalletTopup(props){

  const user = useContext(UserContext);
console.log("Profile user Context", user)
  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

const [Amount, SetAmount] = useState(false);
const [WalletValue, SetWalletValue] = useState('');


const PaymentMethod = props.route.params
console.log(props.route.params)
  
const TopupAmount = [
    {
        id:0,
        predefinedAmount:'AED 1500'
    },
    {
        id:1,
        predefinedAmount:'AED 2000'
    },
    {
        id:2,
        predefinedAmount:'AED 2500'
    },
    {
        id:3,
        predefinedAmount:'AED 3000'
    },
    {
        id:4,
        predefinedAmount:'AED 3500'
    },
    {
        id:5,
        predefinedAmount:'AED 2500'
    },
    {
        id:6,
        predefinedAmount:'AED 3000'
    },
    {
        id:7,
        predefinedAmount:'AED 3500'
    }
]
  
  
    return( 
      <Layout navigation={props.navigation} withoutScroll={true} LeftIcon={true} pagetitle={'Hawta Wallet'} style={styles().ph0}>
      
        <View style={[styles().flex, styles().ph20]}>
        <View style={[styles().bgWhite, styles().ph20, styles().pv15, styles().flexRow, styles().justifyBetween, styles().br5, styles().mb30, styles().alignCenter]}>
            {/* <FontAwesome name="apple" size={20} color={currentTheme.black} /> */}
            {PaymentMethod.ListIcon}
            <Text style={[styles().fs14, styles().flex, styles().ml10, styles().fontRegular, {color:currentTheme.borderColor}]}>Using {PaymentMethod.ListName}</Text>
            <TouchableOpacity>
                <Text style={[styles().fs14, styles().fontRegular, {color:currentTheme.blue}]}>Change</Text>
            </TouchableOpacity>
        </View>

       <View style={[styles().flex, styles().pb25]}>
        <Text style={[styles().fs14, styles().mb20, styles().fontMedium, {color:currentTheme.borderColor}]}>Select Top-up method</Text>
        
        <FlatList
            data={TopupAmount}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
                return (
                <TouchableOpacity
                    // onPress={()=> props.navigation.navigate('OrderDetail', { order: item })} 
                    onPress={()=> {
                        SetAmount(index)
                        SetWalletValue('')
                    }
                    }
                    style={[
                        styles().ph15, 
                        styles().h50px, 
                        // styles().alignCenter,
                        styles().justifyCenter,
                        styles().br10,
                        styles().bw2,
                        styles(currentTheme).bgWhite, 
                        styles().w100, 
                        styles().mb5, 
                        {borderColor : Amount === index ? currentTheme.blue : currentTheme.white}
                        
                    ]}>   
                    <Text style={[styles().fs14, styles().fontRegular, {color:Amount === index ? currentTheme.blue : currentTheme.borderColor }]}>{item.predefinedAmount}</Text>
                </TouchableOpacity>
                )
            }}
            // ListFooterComponent={()=> 
                
            // <View style={styles().mb25}>
            //     <TextField 
            //         SetEditinfo={(e)=> {
            //         SetUserName(e)
            //         }
            //         } 
            //         value={UserName} 
                    
            //         PlaceholderInfo={'Or enter other amount (Min. AED150.00)'} 
            //     />
            // </View>
            
            // }
            keyExtractor={(item, index) => index.toString()}
        />
        <View style={[styles().mt5]}>
                <TextField 
                    SetEditinfo={(e)=> {
                    SetWalletValue(e)
                    SetAmount(false)
                    }
                    } 
                    value={WalletValue} 
                    keyboardType="numeric"
                    PlaceholderInfo={'Or enter other amount (Min. AED150.00)'} 
                />
            </View>
        </View>
        </View>

        


        <View style={[{flex:0.15}, styles().ph20, styles().flexRow, styles().justifyBetween, styles().alignCenter, styles().bgWhite, styles().bottom0]}>
        <View style={styles().flex}>
            <Text style={[styles().fs12, styles().fontRegular, {color:currentTheme.black}]}>Total Amount</Text>
            <Text style={[styles().fs18, styles().fontBold, styles().fw700, {color:currentTheme.blue}]}>{WalletValue ? WalletValue : Amount ? TopupAmount[Amount].predefinedAmount : 'AED 1500'}</Text>
            <Text style={[styles().fs10, styles().fontRegular, {color:currentTheme.c999999}]}>This is the exact amount you will get in you wallet</Text>
        </View>
        <View style={[styles().flexRow, styles().justifyBetween]}>
            <ThemeButton Title={'Pay Now'} Style={[styles().h40px, styles().ph10]} />
        </View>
        </View>
          
      </Layout>
    )
}
