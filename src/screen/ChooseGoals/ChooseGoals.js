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
import FlashMessage from "../../Component/FlashMessage/FlashMessage";

export default function ChooseGoals(props) {
  const { width, height } = Dimensions.get("window");
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];
  const [goal, SetGoal] = useState(false);
  const [topgoals, setTopgoals] = useState("");
  const [selectedGoals, setSelectedGoals] = useState([]);

  const GOALS = gql`
    ${goals}
  `;

  const { loading, error, data, refetch } = useQuery(GOALS, {
    fetchPolicy: "cache-and-network",
    variables: {
      options: {
        limit: 1000,
      },
    },
    onCompleted: ({ goals }) => {
      // console.log("goals res :", goals.results);
      setTopgoals(goals.results);
    },
    onError: (err) => {
      console.log("error in goals :", err);
      FlashMessage({ msg: err.message, type: "danger" });
    },
  });

  if (loading) return <Loader loading={true} />;
  console.log("selectedGoals====>", selectedGoals);
  // if (error) return alert("Something Went Wrong While Choosing Goals!");
  return (
    <AuthLayout navigation={props.navigation} withoutScroll={true}>
      <View style={[styles().w150px, styles().h110px]}>
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
              styles().textLeft,
              styles().fontSemibold,
              styles().lh30,
              styles().fw600,
              { color: currentTheme.themeBackground },
            ]}
          >
            Top {"\n"}Goals
          </Text>
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
                  let x = selectedGoals.indexOf(item._id);
                  if (x === -1) {
                    setSelectedGoals((prev) => [...prev, item._id]);
                  } else {
                    selectedGoals.splice(x, 1);
                    setSelectedGoals((prev) => [...prev]);
                  }
                  console.log("x===>", x);
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
                    borderColor: selectedGoals.includes(item._id)
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
                      backgroundColor: selectedGoals.includes(item._id)
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
                  numberOfLines={2}
                  style={[
                    styles().fs12,
                    styles().mt10,
                    styles().fontSemibold,
                    styles().fw600,
                    { color: currentTheme.black },
                  ]}
                >
                  {item.name?.toUpperCase()}
                </Text>
                <Text
                  numberOfLines={2}
                  style={[
                    styles().fs12,
                    styles().fontRegular,
                    { color: currentTheme.c50545D },
                  ]}
                >
                  {item.description}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={[styles().mb20]}>
          <ThemeButton
            Title={"Next"}
            onPress={() => {
              if (selectedGoals.length !== 0) {
                props.navigation.navigate("TellAboutYourself", {
                  goal: selectedGoals,
                });
              } else {
                FlashMessage({ msg: "Choose Your Goals!", type: "warning" });
              }
            }}
          />
        </View>
      </View>
    </AuthLayout>
  );
}
