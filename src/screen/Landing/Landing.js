import React, { useState, useRef, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import styles from "../styles";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import Layout from "../../Component/Layout/Layout";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

export default function Landing(props) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [page, Setpage] = useState(0);

  // const [scrollValue, SetscrollValue] = useState(0)

  const _scrollView = useRef();

  function handleOnScroll(event) {
    //calculate screenIndex by contentOffset and screen width
    Setpage(
      parseInt(
        event.nativeEvent.contentOffset.x / Dimensions.get("window").width
      )
    );
    // SetscrollValue(parseInt(event.nativeEvent.contentOffset.x/Dimensions.get('window').width))
    console.log(
      "currentScreenIndex",
      parseInt(
        event.nativeEvent.contentOffset.x / Dimensions.get("window").width
      )
    );
  }

  let scrollValue = 0;
  function asd() {
    if (scrollValue === width * 3) {
      console.log("andar araha hai");

      // SetscrollValue(0)
      scrollValue = 0;
      _scrollView.current.scrollTo({ x: scrollValue });
    } else {
      console.log(width);
      // SetscrollValue(prev => prev + width )
      scrollValue = scrollValue + width; // width = screen width
      _scrollView.current.scrollTo({ x: scrollValue, animated: true });
    }
  }

  //   useEffect(()=>{
  //     let scrollValue = 0;
  //     // console.log(scrollValue)
  //     const interval = setInterval(function(){
  //      console.log(scrollValue)
  //         if(scrollValue === width * 3){
  //             console.log('andar araha hai')

  //             scrollValue = 0;
  //             _scrollView.current.scrollTo({x: scrollValue})
  //         } else {
  //       scrollValue = scrollValue + width;   // width = screen width
  //       _scrollView.current.scrollTo({x: scrollValue, animated:true})
  //     }
  //     }, 2000);
  //     return () => clearInterval(interval);
  // }, []);

  const landingText = [
    {
      image: require("../../assets/images/landing1.png"),
      heading: "Howdy!",
      text1:
        "OnTheBlock is here to make your life easier. By answering a few simple questions, OnTheBlock will build a maintenance plan for your home and remind you when it is time to take care of something. You can focus on making your house your home instead of worrying about keeping track of maintenance.",
    },
    {
      image: require("../../assets/images/landing2.png"),
      heading: "Important Documents",
      text1:
        "OnTheBlock gives you central a location to store all of your important documents. Think:",
      text2:
        "Any document you'd like to remove from the drawer in your kitchen can be securely stored OnTheBlock and accessed easily when needed.",
    },
    {
      image: require("../../assets/images/landing3.png"),
      heading: "Personal Finance",
      text1:
        "Lets name it; your home is your investment. OnTheBlock helps you protect your investment and save money in the process. As we learn from neighbors like yourself, we are able to recommend local handypersons and transparently help you understand how much work around the house should cost.",
      text2:
        "We will be rolling out some other cool personal finance features shortly.",
    },
  ];

  return (
    <View style={[styles().flex, styles().justifyEnd, styles().pv20]}>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={(e) => handleOnScroll(e)}
        scrollEventThrottle={5}
        showsHorizontalScrollIndicator={false}
        ref={_scrollView}
        bounces={false}
        contentContainerStyle={{ alignItems: "flex-end" }}
      >
        <View
          style={[
            styles().flex,
            styles().ph20,
            styles().pt20,
            { width: width },
          ]}
        >
          <View style={[styles().flex, styles().justifyEnd]}>
            <Image
              source={landingText[page].image}
              resizeMode="contain"
              style={styles().w100}
            />
          </View>
          <View style={[styles().flex, styles().mt25]}>
            <Text
              style={[
                styles().fs20,
                styles().mt15,
                styles().fontSemibold,
                styles().lh30,
                { color: currentTheme.black },
              ]}
            >
              {landingText[page].heading}
            </Text>
            <View
              style={[
                { width: width - 40 },
                styles().mt5,
                styles().flexRow,
                styles().flexWrap,
              ]}
            >
              <Text
                style={[
                  styles().fs14,
                  styles().mb10,
                  styles().fontRegular,
                  styles().lh18,
                  { color: currentTheme.c50545D },
                ]}
              >
                {landingText[page].text1}
              </Text>
              {page == 1 ? (
                <View style={[styles().mb10, styles().w100]}>
                  <Text
                    style={[
                      styles().fs14,
                      styles().fontRegular,
                      styles().lh18,
                      { color: currentTheme.c50545D },
                    ]}
                  >
                    - receipts
                  </Text>
                  <Text
                    style={[
                      styles().fs14,
                      styles().fontRegular,
                      styles().lh18,
                      { color: currentTheme.c50545D },
                    ]}
                  >
                    - warranties
                  </Text>
                  <Text
                    style={[
                      styles().fs14,
                      styles().fontRegular,
                      styles().lh18,
                      { color: currentTheme.c50545D },
                    ]}
                  >
                    - insurance information
                  </Text>
                  <Text
                    style={[
                      styles().fs14,
                      styles().fontRegular,
                      styles().lh18,
                      { color: currentTheme.c50545D },
                    ]}
                  >
                    - titles
                  </Text>
                </View>
              ) : null}
              <Text
                style={[
                  styles().fs14,
                  styles().fontRegular,
                  styles().lh18,
                  { color: currentTheme.c50545D },
                ]}
              >
                {landingText[page].text2}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles().w100,
              styles().mt15,
              styles().flexRow,
              styles().justifyCenter,
              styles().alignCenter,
            ]}
          >
            {landingText.map((a, i) => {
              return (
                <View
                  key={i}
                  style={
                    page === i
                      ? styles(currentTheme).ActiveCricleBullent
                      : styles().CircleBullent
                  }
                />
              );
            })}
          </View>

          <View style={[styles().mt15]}>
            <ThemeButton
              Title={page == 2 ? "Start" : "Next"}
              onPress={() =>
                page == 2
                  ? props.navigation.navigate("Login")
                  : Setpage(page + 1)
              }
            ></ThemeButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
