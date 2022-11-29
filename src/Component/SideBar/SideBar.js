import React, {useState, useContext} from 'react'
import {View , Text, FlatList, Switch, TouchableOpacity } from 'react-native'
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';
import {AntDesign, Ionicons, Feather, MaterialIcons, FontAwesome5} from '@expo/vector-icons';
import styles from '../../screen/styles';


const MenuItems = [
    {
        id: 1,
        name: 'Notifications',
        icon : <Ionicons name="notifications-circle" size={30} color="white" />,
       
    },
    {
        id:2,
        name : 'Ticket History',
        icon : <FontAwesome5 name="ticket-alt" size={20} color="white" />,
        navigateTo:'TicketHistory'
    },
    {
        id:3,
        name:'Change Password',
        icon:<Feather name="lock" size={20} color="white" />,
        navigateTo: 'ChangePassword'
    },
    {
        id:4,
        name:'Terms & Privacy',
        icon: <Feather name="file" size={20} color="white" />,
        navigateTo: 'TermsCondition'
    }
]




export default function SideBar(props) {

    const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(previousState => !previousState);
// console.log('babuji keh rahe hain', props.navigation)
const themeContext = useContext(ThemeContext)
const currentTheme = theme[themeContext.ThemeValue]

    return (
        <View style={[styles().mt50, styles().flex,  styles().pl15, styles().pr15]}>
            
            <View style={styles().mb50}>
                <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={[
            styles().alignCenter,
            styles().justifyCenter,
            styles().backButn
            ]}>
    
                
                <AntDesign name="arrowleft" size={30} color="white" />
            
            </TouchableOpacity>
          </View>

          <View style={[styles().alignCenter, styles().mb30]}>
              <Text style={[styles().SidebarHeading, styles().fs20, styles().fontBold, styles().bgTextWhite]}>Menu</Text>
          </View>
          <View>
            <FlatList
            data={MenuItems}
            
            showsHorizontalScrollIndicator={false}
            
            renderItem={({ item , index }) => {
                return (
                    <TouchableOpacity onPress={()=>item.navigateTo && props.navigation.navigate(item.navigateTo)} style={[styles().flexRow, styles().flex,  styles().alignCenter, styles().pv10, styles().mb10]}>
                        <View style={[styles().mr10, {width:30}]}>
                            {item.icon}
                        </View>
                        <Text style={[styles().bgTextWhite, styles().fs16, styles().fontRegular]}>{item.name}</Text>
                    {item.name === 'Notifications' && 
                    <View style={[styles().flex, styles().alignEnd]}>
                    <Switch
                    trackColor={{ false: currentTheme.c50545D, true: currentTheme.themeSecondary  }}
                    thumbColor={isEnabled ? currentTheme.themeSecondary  : currentTheme.white}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                  </View>
                    }
                    </TouchableOpacity>
                )
            }}
            keyExtractor={(item,index) => index.toString()}
            />
            <TouchableOpacity style={[styles().flexRow, styles().pv10, styles().mb10]}>
                <View style={[styles().mr10, {width:30}]}>
                    <MaterialIcons name="logout" size={20} color="white" />
                </View>
                <Text style={[styles().bgTextWhite, styles().fs16, styles().fontRegular]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
    )

}