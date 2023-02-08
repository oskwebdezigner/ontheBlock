import Constants from "expo-constants";
//  GRAPHQL_URL: "https://node.hostingladz.com:3011/graphql",
const ENV = {
  development: {
    // GRAPHQL_URL : '',
    // MEDIA_URL: '', // put / at the end of server url
    // WS_GRAPHQL_URL: '',
    // SERVER_URL: '', // put / at the end of server url
    // CLOUDINARY_URL: "",
    // CLOUDINARY_PRESET: "",

    GRAPHQL_URL: "http://192.168.30.246:3001/",
    MEDIA_URL: "https://3.139.132.193/images/", // put / at the end of server url
    WS_GRAPHQL_URL: "http://192.168.30.246:3001/",
    // SERVER_URL: "http://3.209.162.153:8080/v1/user/getToken", // put / at the end of server url
    SERVER_URL: "https://node.hostingladz.com:3022/v1/user/getToken", // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE:
      "815456534498-l2deosv2facij8kfuqvrv49dcvndkgvj.apps.googleusercontent.com",
    ANDROID_CLIENT_ID_GOOGLE:
      "815456534498-l2deosv2facij8kfuqvrv49dcvndkgvj.apps.googleusercontent.com",
    FACEBOOK_APP_ID:
      "610317069220-2uu46c87tsot7281185koto46gqjhalm.apps.googleusercontent.com",
    EXPO_CLIENT_ID:
      "815456534498-us2vah9qrhs49f6qqc9oo7sc93sbls9o.apps.googleusercontent.com",
  },
  staging: {
    GRAPHQL_URL: "http://3.139.132.193/graphql",
    MEDIA_URL: "https://3.139.132.193/images/", // put / at the end of server url
    WS_GRAPHQL_URL: "ws://3.139.132.193/graphql",
    SERVER_URL: "http://3.139.132.193/", // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE:
      "815456534498-l2deosv2facij8kfuqvrv49dcvndkgvj.apps.googleusercontent.com",
    ANDROID_CLIENT_ID_GOOGLE:
      "815456534498-l2deosv2facij8kfuqvrv49dcvndkgvj.apps.googleusercontent.com",
    FACEBOOK_APP_ID: "",
    EXPO_CLIENT_ID:
      "815456534498-us2vah9qrhs49f6qqc9oo7sc93sbls9o.apps.googleusercontent.com",
  },
  production: {
    GRAPHQL_URL: "http://3.139.132.193/graphql",
    MEDIA_URL: "https://3.139.132.193/images/", // put / at the end of server url
    WS_GRAPHQL_URL: "ws://3.139.132.193/graphql",
    SERVER_URL: "http://3.139.132.193/", // put / at the end of server url
    IOS_CLIENT_ID_GOOGLE:
      "815456534498-l2deosv2facij8kfuqvrv49dcvndkgvj.apps.googleusercontent.com",
    ANDROID_CLIENT_ID_GOOGLE:
      "815456534498-l2deosv2facij8kfuqvrv49dcvndkgvj.apps.googleusercontent.com",
    FACEBOOK_APP_ID: "",
    EXPO_CLIENT_ID:
      "815456534498-us2vah9qrhs49f6qqc9oo7sc93sbls9o.apps.googleusercontent.com",
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.development;
  } else if (env === "production") {
    return ENV.production;
  } else if (env === "staging") {
    return ENV.staging;
  } else {
    return ENV.development;
  }
};

export default getEnvVars;
