import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
  split,
  concat,
  Observable,
  defaultDataIdFromObject,
} from "@apollo/client";

import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { persistCache } from "apollo3-cache-persist";

import getEnvVars from "../../environment";
const { GRAPHQL_URL, WS_GRAPHQL_URL } = getEnvVars();

const cache = new InMemoryCache({
  dataIdFromObject: (object) => {
    switch (object.__typename) {
      default:
        return defaultDataIdFromObject(object); // fall back to default handling
    }
  },
});
const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const wsLink = new WebSocketLink({
  uri: WS_GRAPHQL_URL,
  options: {
    reconnect: true,
  },
});

const request = async (operation) => {
  const token = await AsyncStorage.getItem("token");
  operation.setContext({
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    headers: {
      //   authorization: token ? `Bearer ${token}` : "",
      authorization: token ? token : "",
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      // console.log(observer)
      let handle;
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const terminatingLink = split(({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  return kind === "OperationDefinition" && operation === "subscription";
}, wsLink);

const setupData = async (client) => {
  try {
    const token = await AsyncStorage.getItem("token");
    // cache.writeData({
    //     data: {
    //         // configuration: data.configuration,
    //         // notifications: [],
    //         isLoggedIn: !!token,
    //         // cartItems: cartItems ? JSON.parse(cartItems).length : 0
    //     }
    // })
  } catch (error) {
    console.log("setupData Error", error);
  }
};

const setupApollo = async () => {
  await persistCache({
    cache,
    storage: AsyncStorage,
  });
  const client = new ApolloClient({
    link: concat(ApolloLink.from([terminatingLink, requestLink]), httpLink),
    cache,
    resolvers: {
      User: {
        isLoggedIn: async (profile, _args, { cache }) => {
          try {
            const token = await AsyncStorage.getItem("token");
            return !!token;
          } catch (err) {}
          return false;
        },
      },
    },
  });
  // console.log("client>>>>",client)
  await setupData(client);
  client.onClearStore(setupData);
  client.onResetStore(setupData);
  return client;
};

export default setupApollo;
