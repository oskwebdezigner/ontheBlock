import {Text , Image , View} from 'react-native'
import styles from '../../screen/styles'
import CameraComponent from './CameraComponent'
import React , {useContext} from 'react'
import Spinner from '../Spinner/Spinner'
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import { theme } from '../../context/ThemeContext/ThemeColor';

export default function CameraInput({
    Error,
    Loading,
    setLoading,
    setValue,
    value,
    placeHolder,
    setNameErr,
}){
    const themeContext = useContext(ThemeContext)
    const currentTheme = theme[themeContext.ThemeValue]

    return (
        <View>
        <CameraComponent 
        style={[   
          styles().borderW1,
          styles().h50px,
          styles().w100,
           styles().mt20,
        ,styles().alignCenter,
        {
            borderColor : '#ACB8C4',
            borderRadius : 5,
        },Error && { borderColor: currentTheme.danger }
        , Loading && styles().justifyCenter,
        value !== "" && [ styles().flexRow , styles().justifyBetween]]}
        loading={(e) => setLoading(e)} 
        update={(e) => {
            setValue(e)
          setNameErr(null)
        }}
        >
       {!Loading ? <Text style={[
             styles().pl20,
             styles().fontMedium,
             {
                 color : '#ACB8C4'
             },
             Error && { borderColor: currentTheme.danger },
          ]}>{placeHolder}</Text> : <Spinner /> } 
      { value !== "" && <Image source={{ uri : value  }}
      style={[styles().wh100]}
      resizeMode='contain'
      />}
    </CameraComponent>
    {!!Error && <Text style={styles(currentTheme).error}>{Error}</Text>}
    </View>
    )
}