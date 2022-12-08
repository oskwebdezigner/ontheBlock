import React, { useEffect, useRef, useState ,useContext } from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native'
import ThemeContext from '../../context/ThemeContext/ThemeContext'
import { theme } from '../../context/ThemeContext/ThemeColor'
import Styles from '../../screen/styles';
const TextField = (props) => {
  const {
    label,
    errorText,
    value,
    style,
    onBlur,
    onFocus,
    stylesInput,
    childrenPassword,
    ...restOfProps
  } = props
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = useRef(null)
  const focusAnim = useRef(new Animated.Value(0)).current

  const themeContext = useContext(ThemeContext)
  const currentTheme = theme[themeContext.ThemeValue]

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start()
  }, [focusAnim, isFocused, value])

  let color = isFocused ? currentTheme.textColor : currentTheme.black
  if (errorText) {
    color = '#B00020'
  }

  return (
    <View style={[style]}>
      <TextInput
        style={[
          Styles().h60px,
          Styles().justifyCenter,
          Styles().alignCenter,
          Styles().fs14,
          Styles().br10,
          Styles().ph20,
          Styles().bw1,
          {
            borderColor: currentTheme.cEFEFEF,
            color :currentTheme.borderColor,
           
            
          },
          stylesInput
        ]}
        placeholderTextColor={'black'}
        ref={inputRef}
        {...restOfProps}
        value={value}
        onBlur={(event) => {
          setIsFocused(false)
          onBlur?.(event)
        }}
        onFocus={(event) => {
          setIsFocused(true)
          onFocus?.(event)
        }}
      />
      <TouchableWithoutFeedback
      onPress={() => inputRef.current?.focus()}>
        <Animated.View
          style={[
            styles.labelContainer,
            // isFocused && { backgroundColor : 'white' },
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.86],
                    // outputRange: [1, 1],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, 10],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 20],
                  }),
                },
              ],
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color
                
              },
              // isFocused && {
              //   fontSize : 12
              // }
            ]}
          >
            {label}
            {errorText ? '*' : ''}
          </Text>
        </Animated.View>
     
      </TouchableWithoutFeedback>
            
      {childrenPassword}
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    // padding: 18,
    // height : 50,
    // justifyContent :'center',
    // alignContent :'center',
    // borderRadius: 4,
    fontSize: 14,
    // borderBottomWidth : 1
  },
  labelContainer: {
    position: 'absolute',
    top : -5,
    // paddingHorizontal: 10,
  },
  label: {
    // fontSize: 16,
    fontSize : 12,
    
  },
  error: {
    // marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    color: '#B00020',
    
  },
})

export default TextField