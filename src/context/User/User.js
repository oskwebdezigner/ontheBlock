import React, { useContext } from "react";
import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { profile } from "../../apollo/server";
import { AuthContext } from "../Auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE = gql`
  ${profile}
`;

const UserContext = React.createContext({});

export const UserProvider = (props) => {
  const { token } = useContext(AuthContext);

  // useEffect(() => {
  //   if (data == undefined) {
  //     AsyncStorage.clear().then(() => {
  //       console.log("async clear from user context");
  //     });
  //   }
  // }, [token]);

  useEffect(() => {
    refetch();
  }, [token]);

  const { loading, data, error, refetch, client } = useQuery(PROFILE, {
    fetchPolicy: "no-cache",
    onCompleted: (res) => {
      // console.log("user profile res :", res);
    },
    onError: (err) => {
      console.log("user profile error :", err.message);
      // AsyncStorage.clear().then(() => {
      //   console.log("async clear from user context");
      // });
    },
  });

  console.log("UserProvider ==========>>>>>", data, token);

  const user =
    loading || error || !data.profile
      ? { isLoggedIn: false }
      : { ...data.profile, refetch };
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
export const UserConsumer = UserContext.Consumer;
export default UserContext;
