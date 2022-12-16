import { StyleSheet } from "react-native";
import fontStyles from "../utils/fonts/fontStyles";

const styles = (props = null) =>
  StyleSheet.create({
    themeBg: {
      backgroundColor: props !== null ? props.themeBackground : "transparent",
    },
    whiteBg: {
      backgroundColor: props !== null ? props.white : "transparent",
    },
    themeText:{
      color:props !== null ? props.themeBackground : 'transparent',
    },
    whiteText:{
      color: props !== null ? props.white : 'transparent'
    },
    flex: {
      flex: 1,
    },
    flex1_5: {
      flex: 1.5,
    },
    flex2: {
      flex: 2,
    },
    zIndex1: {
      zIndex: 1,
    },
    zIndex2: {
      zIndex: 2,
    },
    zIndex3: {
      zIndex: 3,
    },
    zIndex10: {
      zIndex: 10,
    },
    br5:{
      borderRadius:5
    },
    br10:{
      borderRadius:10
    },
    br15:{
      borderRadius:15
    },
    br20:{
      borderRadius:20
    },
    br25:{
      borderRadius:25
    },
    br30:{
      borderRadius:30
    },
    br50:{
      borderRadius:50
    },
    br100:{
      borderRadius:100
    },
    flexRow: {
      flexDirection: "row",
    },
    flexCol: {
      flexDirection: "column",
    },
    flexWrap: {
      flexWrap: "wrap",
    },
    textCenter: {
      textAlign: "center",
    },
    textRight: {
      textAlign: "right",
    },
    textLeft: {
      textAlign: "left",
    },
    textDecorationUnderline:{
      textDecorationLine:'underline'
    },
    textUpper: {
      textTransform: "uppercase",
    },
    textCapitalize: {
      textTransform: "capitalize",
    },
    justifyStart: {
      justifyContent: "flex-start",
    },
    justifyEnd: {
      justifyContent: "flex-end",
    },
    justifyCenter: {
      justifyContent: "center",
    },
    justifyBetween: {
      justifyContent: "space-between",
    },
    justifyAround: {
      justifyContent: "space-around",
    },
    justifyEvenly: {
      justifyContent: "space-evenly",
    },
    alignCenter: {
      alignItems: "center",
    },
    alignStart: {
      alignItems: "flex-start",
    },
    alignEnd: {
      alignItems: "flex-end",
    },
    alignSelfStart:{
      alignSelf:'flex-start'
    },
    alignSelfCenter: {
      alignSelf: "center",
    },
    alignSelfEnd:{
      alignSelf:'flex-end'
    },
    posRel: {
      position: "relative",
    },
    posAbs: {
      position: "absolute",
    },
    top0: {
      top: 0,
    },
    top5:{
      top:5
    },
    top10:{
      top:10
    },
    top15:{
      top:15
    },
    top17:{
      top:17
    },
    top20:{
      top:20
    },
    top25:{
      top:25
    },
    top35:{
      top:35
    },
    left0: {
      left: 0,
    },
    left5:{
      left:5
    },
    left10:{
      left:10
    },
    left15:{
      left:15
    },
    left20:{
      left:20
    },
    left25:{
      left:25
    },
    right0:{
      right:0,
    },
    right5:{
      right:5,
    },
    right10:{
      right:10,
    },
    right15:{
      right:15,
    },
    right20:{
      right:20,
    },
    right25:{
      right:25,
    },
    bottom0:{
      bottom:0
    },
    bottom5:{
      bottom:5
    },
    bottom10:{
      bottom:10
    },
    bottom15:{
      bottom:15
    },
    bottom20:{
      bottom:20
    },
    bottom25:{
      bottom:25
    },
    mtminus5:{
      marginTop:-5
    },
    mt0:{
      marginTop:0
    },
    mt5: {
      marginTop: 5,
    },
    mt10: {
      marginTop: 10,
    },
    mt15: {
      marginTop: 15,
    },
    mt20: {
      marginTop: 20,
    },
    mt25: {
      marginTop: 25,
    },
    mt30: {
      marginTop: 30,
    },
    mt35: {
      marginTop: 35,
    },
    mt50: {
      marginTop: 50,
    },
    mt70: {
      marginTop: 70,
    },
    mt100: {
      marginTop: 100,
    },
    mt125: {
      marginTop: 125,
    },
    mt_170:{
      marginTop:-170
    },
    mb0: {
      marginBottom: 0,
    },
    mb5: {
      marginBottom: 5,
    },
    mb10: {
      marginBottom: 10,
    },
    mb15: {
      marginBottom: 15,
    },
    mb20: {
      marginBottom: 20,
    },
    mb25: {
      marginBottom: 25,
    },
    mb30: {
      marginBottom: 30,
    },
    mb35: {
      marginBottom: 35,
    },
    mb50: {
      marginBottom: 50,
    },
    mb100: {
      marginBottom: 100,
    },
    ml0:{
      marginLeft:0
    },
    ml5: {
      marginLeft: 5,
    },
    ml10: {
      marginLeft: 10,
    },
    ml15: {
      marginLeft: 15,
    },
    ml20: {
      marginLeft: 20,
    },
    ml25: {
      marginLeft: 25,
    },
    ml30: {
      marginLeft: 30,
    },
    ml35: {
      marginLeft: 35,
    },
    mr0:{
      marginRight:0
    },
    mr5: {
      marginRight: 5,
    },
    mr10: {
      marginRight: 10,
    },
    mr15: {
      marginRight: 15,
    },
    mr20: {
      marginRight: 20,
    },
    mr25: {
      marginRight: 25,
    },
    mr30: {
      marginRight: 30,
    },
    mr35: {
      marginRight: 35,
    },
    mh5: {
      marginHorizontal: 5,
    },
    mh10: {
      marginHorizontal: 10,
    },
    mh15: {
      marginHorizontal: 15,
    },
    mh20: {
      marginHorizontal: 20,
    },
    mh25: {
      marginHorizontal: 25,
    },
    mh2per:{
      marginHorizontal:'1%'
    },
    mh4per:{
      marginHorizontal:'4%'
    },
    mv5: {
      marginVertical: 5,
    },
    mv10: {
      marginVertical: 10,
    },
    mv15: {
      marginVertical: 15,
    },
    mv20: {
      marginVertical: 20,
    },
    mv25: {
      marginVertical: 25,
    },
    mall5: {
      margin: 5,
    },
    mall10: {
      margin: 10,
    },
    mall15: {
      margin: 15,
    },
    mall20: {
      margin: 20,
    },
    pt0:{
      paddingTop:0
    },
    pt5: {
      paddingTop: 5,
    },
    pt10: {
      paddingTop: 10,
    },
    pt15: {
      paddingTop: 15,
    },
    pt20: {
      paddingTop: 20,
    },
    pt25: {
      paddingTop: 25,
    },
    pt30: {
      paddingTop: 30,
    },
    pt35: {
      paddingTop: 35,
    },
    pb0: {
      paddingBottom: 0,
    },
    pb5: {
      paddingBottom: 5,
    },
    pb10: {
      paddingBottom: 10,
    },
    pb15: {
      paddingBottom: 15,
    },
    pb20: {
      paddingBottom: 20,
    },
    pb25: {
      paddingBottom: 25,
    },
    pb30: {
      paddingBottom: 30,
    },
    pb35: {
      paddingBottom: 35,
    },
    pb100: {
      paddingBottom: 100,
    },
    pl0:{
      paddingLeft:0
    },
    pl5: {
      paddingLeft: 5,
    },
    pl10: {
      paddingLeft: 10,
    },
    pl15: {
      paddingLeft: 15,
    },
    pl20: {
      paddingLeft: 20,
    },
    pl25: {
      paddingLeft: 25,
    },
    pl30: {
      paddingLeft: 30,
    },
    pl35: {
      paddingLeft: 35,
    },
    pr0:{
      paddingRight:0
    },
    pr5: {
      paddingRight: 5,
    },
    pr10: {
      paddingRight: 10,
    },
    pr15: {
      paddingRight: 15,
    },
    pr20: {
      paddingRight: 20,
    },
    pr25: {
      paddingRight: 25,
    },
    pr30: {
      paddingRight: 30,
    },
    pr35: {
      paddingRight: 35,
    },
    pv5:{
      paddingVertical:5
    },
    pv10: {
      paddingVertical: 10,
    },
    pv15: {
      paddingVertical: 15,
    },
    pv20: {
      paddingVertical: 20,
    },
    pv25: {
      paddingVertical: 25,
    },
    pv30: {
      paddingVertical: 30,
    },
    pv35: {
      paddingVertical: 35,
    },
    ph0:{
      paddingHorizontal:0
    },
    ph5: {
      paddingHorizontal: 5,
    },
    ph10: {
      paddingHorizontal: 10,
    },
    ph15: {
      paddingHorizontal: 15,
    },
    ph20: {
      paddingHorizontal: 20,
    },
    ph25: {
      paddingHorizontal: 25,
    },
    ph30:{
      paddingHorizontal:30
    },
    ph35:{
      paddingHorizontal:35
    },
    pall5: {
      padding: 5,
    },
    pall10: {
      padding: 10,
    },
    pall15: {
      padding: 15,
    },
    pall20: {
      padding: 20,
    },
    overflowH: {
      overflow: "hidden",
    },
    overflowS: {
      overflow: "scroll",
    },
    w33: {
      width: "33%",
    },
    w33per3:{
      width:'33.3%'
    },
    w38:{
      width:'38%'
    },
    w40:{
      width:'40%'
    },
    w45: {
      width: "45%",
    },
    w48: {
      width: "48%",
    },
    w50: {
      width: "50%",
    },
    w60: {
      width: "60%",
    },
    w62:{
      width:'62%'
    },
    w70:{
      width:'70%'
    },
    w80:{
      width:'80%'
    },
    w98: {
      width: "98%",
    },
    w100: {
      width: "100%",
    },
    w15px:{
      width:15
    },
    w30px:{
      width:30
    },
    w25px:{
      width:25
    },
    w50px:{
      width:50
    },
    w60px:{
      width:60
    },
    w100px:{
      width:100
    },
    w150px:{
      width:150,
    },
    w200px:{
      width:200
    },
    wh100: {
      width: "100%",
      height: "100%",
    },
    h100: {
      height: "100%",
    },
    h50:{
      height:'50%'
    },
    h70:{
      height:'70%'
    },
    wh20px: {
      width: 20,
      height: 20,
    },
    wh25px:{
      width:25,
      height:25,
    },
    wh30px:{
      width:30,
      height:30
    },
    wh35px:{
      width:35,
      height:35
    },
    wh40px: {
      height: 40,
      width: 40,
    },
    wh50px:{
      width:50,
      height:50
    },
    wh65px: {
      width: 65,
      height: 65,
    },
    wh80px: {
      height: 80,
      width: 80,
    },
    wh100px: {
      width: 100,
      height: 100,
    },
    wh130px:{
      width:130,
      height:130
    },
    wh150px:{
      width:150,
      height:150,
    },
    h5px:{
      height:5
    },
    h25px:{
      height:25
    },
    h30px:{
      height:30
    },
    h35px:{
      height:35
    },
    h40px:{
      height:40
    },
    h45px:{
      height:45
    },

    h50px: {
      height: 50,
    },
    h60px:{
      height:60
    },
    h70px:{
      height:70
    },
    h80px:{
      height:80
    },
    h100px: {
      height: 100,
    },
    h110px:{
      height:110
    },
    h130px:{
      height:130
    },
    h140px:{
      height:140
    },
    h150px:{
      height:150
    },
    h200px: {
      height: 200,
    },
    h250px: {
      height: 250,
    },
    h300px: {
      height: 300,
    },
    fw700: {
      fontWeight: "700",
    },
    fw600: {
      fontWeight: "600",
    },
    fw400: {
      fontWeight: "400",
    },
    fw300:{
      fontWeight:'300'
    },
    fs9:{
      fontSize:9
    },
    fs10: {
      fontSize: 10,
    },
    fs11:{
      fontSize:11,
    },
    fs12: {
      fontSize: 12,
    },
    fs13:{
      fontSize:13,
    },
    fs14: {
      fontSize: 14,
    },
    fs15: {
      fontSize: 15,
    },
    fs16: {
      fontSize: 16,
    },
    fs18: {
      fontSize: 18,
    },
    fs20: {
      fontSize: 20,
    },
    fs22: {
      fontSize: 22,
    },
    fs24: {
      fontSize: 24,
    },
    fs30:{
      fontSize:30
    },
    fs32:{
      fontSize:32
    },
    fs50:{
      fontSize:50
    },
    fontBold: {
      fontFamily: fontStyles.PoppinsBold,
    },
    fontRegular: {
      fontFamily: fontStyles.PoppinsRegular,
    },
    fontMedium: {
      fontFamily: fontStyles.PoppinsMedium,
    },
    fontSemibold: {
      fontFamily: fontStyles.PoppinSemibold,
    },
    lh36:{
      lineHeight:36,
    },
    lh30: {
      lineHeight: 30,
    },
    lh26: {
      lineHeight: 26,
    },
    lh22:{
      lineHeight:22
    },
    lh20:{
      lineHeight:20
    },
    lh18:{
      lineHeight:18
    },
    bw0:{
      borderWidth:0
    },
    bw1:{
      borderWidth:1
    },
    bw2:{
      borderWidth:2
    },
    boxpeshadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 2.58,
      elevation: 5,
      backgroundColor: "#fff",
    },
    boxpeshadowProduct: {
      shadowColor: "#ccc",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1.85,
      elevation: 5,
      backgroundColor: "#fff",
    },
    boxpeshadowCart: {
      shadowColor: "#aaa",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.46,
      shadowRadius: 1.85,
      elevation: 8,
      backgroundColor: "#fff",
    },

    SliderdotStyle: {
      width: 10,
      height:10,
      borderRadius: 5,
      backgroundColor: props !== null ? props.white : "transparent",
    },
    SliderInActivedot: {
      width: 10,
      height:10,
      borderRadius: 5,
      backgroundColor: props !== null ? props.SliderDots : 'transparent',
    },

    CircleBullent : {
      width : 8,
      height :8,
      borderRadius : 8,
      marginRight : 5,
      backgroundColor : '#000'
    },
    ActiveCricleBullent : {
      width : 30,
      height :8,
      borderRadius : 40,
      marginRight : 5,
      backgroundColor : props !== null ? props.themeBackground : 'transparent'
    },
    passEye : {
      position :'absolute',
      padding : 20,
      right : 0,
    },
    menuBarIcon:{
      backgroundColor:props !== null ? props.themeBackground : 'transparent',
      height:2
    },
    



    
    /* main layout start */
    
    bgTextWhite: {
      color: props !== null ? props.white : 'transparent'
    },
    bgWhite: {
      backgroundColor: "white",
    },
    error: {
      marginLeft: 12,
      fontSize: 12,
      color: props !== null ? props.danger : "transparent",
      fontFamily: fontStyles.PoppinsRegular,
    },
    phoneInput: {
      borderColor: props !== null ? props.inputBorder : "transparent",
      backgroundColor: props !== null ? props.inputBackground : "transparent",
      color: props !== null ? props.white : "transparent",
      borderWidth: 2,
      borderRadius: 100,
      //   height : 40,
      padding: 18,
      color: props !== null ? props.white : "transparent",
      borderRadius: 50,
    },
  
  
    verifyContainer: {
      width: 44,
      height: 55,
      borderRadius : 10,
      // lineHeight: 40,
      fontSize: 20,
      justifyContent: "center",
      borderBottomWidth: 1,
      backgroundColor:props !== null ? props.blackish : 'transparent',
      borderColor: "#EFF0F3",
      textAlign: "center",
      alignContent: "center",
      alignSelf: "center",
      alignItems: "center",
    },
    
    input: {
      height: 50,
      borderWidth: 2,
      width: "100%",
    },

    /* FLoat Text Field */
    
    Floatlabel:{
      color:props !== null ? props.c999999 : 'transparent'
    },
    Floaterror:{
      marginLeft: 12,
      fontSize: 12,
      color: props !== null ? props.black : 'transparent',
    },
    modalContainer:{
      borderTopLeftRadius:10,
      borderTopRightRadius:10
    }
    
    
  });

export default styles;
