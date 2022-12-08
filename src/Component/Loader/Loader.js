import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
// import { connect } from "react-redux";
// import { useSelector } from "react-redux";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
export default function Loader(props) {
  // let loading = useSelector((state) => state.Loading.loading);
  // if (!loading) {
  //   return null;
  // }
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        // backgroundColor: "red",
        elevation: 10,
        zIndex: 190000,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(17, 17, 17, 0.6)",
        }}
      />
      <ActivityIndicator size="large" color={currentTheme.themeBackground} />
      {/* <LottieView
        autoPlay={true}
        loop={true}
        style={{height: 40, width: 40}}
        source={require('../../shared/assets/ball_loader.json')}
      /> */}
    </View>
  );
}

// export default connect(mapStateToProps)(Loader);
// export default Loader;
