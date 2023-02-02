import React, { useRef, useEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import * as Permission from "expo-permissions";

function MapInput(props) {
  const ref = useRef();
  console.log("MapInput >>>>>", props);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("useEffect location>>>>", location);
      let region = {
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      };
      regionChange(region);
      props.onChangeRegion(region);
    })();
  }, []);

  async function regionChange(region) {
    const { status } = await Permission.askAsync(Permission.LOCATION);
    if (status === "granted") {
      Location.reverseGeocodeAsync({ ...region })
        .then((data) => {
          console.log("data on regionChange(region)", data);
          if (data.length) {
            const location = data[0];
            let delivery_address = Object.keys(location)
              .map((key) => location[key])
              .join(" ");
            // setDeliveryAddress(delivery_address)
            console.log("data on delivery_address", delivery_address);
            ref.current.setAddressText(delivery_address);
            props.onChangeAddress(delivery_address);
          }
        })
        .catch((error) => {
          console.log("Error : ", error);
        });
    }
  }
  console.log("MapInput del adrs", props.delivery_address);

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder="Is this your address ?"
      minLength={2} // minimum length of text to search
      autoFocus={false}
      // currentLocation = {true}
      returnKeyType={"search"} // Can be left out for default return key
      listViewDisplayed={false} // true/false/undefined
      fetchDetails={true}
      // value = {props.delivery_address}

      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log("data >>>>>", data);
        console.log("details >>>>", details);
        let dataAddressComponent = data.structured_formatting;
        console.log("dataAddressComponent >>>>", dataAddressComponent);
        let desc =
          data.description &&
          data.description !== undefined &&
          data.description !== null
            ? data.description
            : data.name;
        props.notifyChange(
          details.geometry.location,
          desc,
          dataAddressComponent
        );
      }}
      query={{
        // key: 'AIzaSyCMC8Ra4HyF63DhGTWkXJK1og3sfCo-xds',
        key: "AIzaSyD0vSz1qjsn_RSPBB9HRD1Eqztm7DyuKw8",
        language: "en",
        // components: 'country:us',
        types: "geocode",
      }}
      // GooglePlacesSearchQuery ={
      //   { rankby: 'distance', type: 'restaurant' }
      // }
      filterReverseGeocodingByTypes={["locality"]}
      enablePoweredByContainer={false}
      styles={{
        //     container:{
        //         zIndex: 9999,
        //         flex: 1
        // //   position: 'absolute'
        //     },
        textInputContainer: {
          backgroundColor: "rgba(0,0,0,0)",
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#EFEFEF",
        },

        listView: {},

        textInput: {
          backgroundColor: "transparent",
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: "#5d5d5d",
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      // debounce={300}
    />
  );
}
export default MapInput;
