import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  Animated,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import ThemeContext from "../../context/ThemeContext/ThemeContext";
import { theme } from "../../context/ThemeContext/ThemeColor";
import styles from "../styles";

import ThemeButton from "../../Component/ThemeButton/ThemeButton";
import AuthLayout from "../../Component/AuthLayout/AuthLayout";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { goals } from "../../apollo/server";
import Spinner from "../../Component/Spinner/Spinner";
import Loader from "../../Component/Loader/Loader";

export default function ChooseGoals(props) {
  const { width, height } = Dimensions.get("window");
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [goal, SetGoal] = useState(false);
  const [topgoals, setTopgoals] = useState("");

  const GOALS = gql`
    ${goals}
  `;

  const { loading, error, data, refetch } = useQuery(GOALS, {
    fetchPolicy: "cache-and-network",
    onCompleted: ({ goals }) => {
      //   console.log("goals res :", goals.results);
      setTopgoals(goals.results);
    },
    onError: (err) => {
      console.log("error in goals :", err);
    },
  });

  if (loading) return <Loader />;
  // if (error) return alert("Something Went Wrong While Choosing Goals!");
  return (
    <AuthLayout navigation={props.navigation} withoutScroll={true}>
      <View style={[styles().w150px, styles().h100px]}>
        <Image
          source={require("../../assets/images/logo.png")}
          resizeMode="cover"
          style={styles().wh100}
        />
      </View>

      <View style={[styles().mt25, styles().mb15]}>
        <Text
          style={[
            styles().fs24,
            styles().fontRegular,
            { color: currentTheme.black },
          ]}
        >
          Choose your{" "}
          <Text
            style={[
              styles().fs24,
              styles().textCenter,
              styles().fontSemibold,
              styles().lh30,
              styles().fw600,
              { color: currentTheme.themeBackground },
            ]}
          >
            Top {"\n"} Goals
          </Text>{" "}
        </Text>
      </View>

      <View style={styles().flex}>
        <FlatList
          data={topgoals}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  SetGoal(index);
                  props.navigation.navigate("TellAboutYourself", {
                    goal: item,
                  });
                }}
                style={[
                  styles().mb20,
                  styles().bw2,
                  styles().h150px,
                  styles().pall20,
                  {
                    width: width * 0.42,
                    marginLeft: index % 2 == 0 ? 0 : width * 0.05,
                    borderTopRightRadius: 30,
                    borderBottomLeftRadius: 30,
                    borderColor:
                      goal === index
                        ? currentTheme.themeBackground
                        : currentTheme.cE5E5E5,
                  },
                ]}
              >
                <View
                  style={[
                    styles().wh40px,
                    styles().alignCenter,
                    styles().justifyCenter,
                    styles().br5,
                    {
                      backgroundColor:
                        goal === index
                          ? currentTheme.themeBackground
                          : currentTheme.cE5E5E5,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles().wh20px}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={[
                    styles().fs14,
                    styles().mt10,
                    styles().fontSemibold,
                    styles().fw600,
                    { color: currentTheme.black },
                  ]}
                >
                  {item.name?.toUpperCase()}
                </Text>
                <Text
                  style={[
                    styles().fs11,
                    styles().fontRegular,
                    { color: currentTheme.textColor },
                  ]}
                >
                  {item.description}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </AuthLayout>
  );
}
