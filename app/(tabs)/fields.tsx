import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "expo-router";
import { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from "react-native-maps";
import { Image } from "expo-image";
import FieldControl from "@/src/components/header/field-control";
import FieldItem from "@/src/components/field-item";
import LocationButton from "@/src/components/location-button";
import FilterIcon from "@/src/components/icons/filter-icon";
import MapMarker from "@/src/components/icons/map-marker";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { FieldData } from "@/src/utils/Types";
import { getFieldUrl } from "@/src/utils/Helpers";
import { useLocationContext } from "@/src/context/Location";
import { useAuthContext } from "@/src/context/Auth";
import { fetctNearbyFields } from "@/src/models/Field";

const { width, height } = Dimensions.get("window");
const START_LOCATION: LatLng = {
  latitude:  -12.0459667,
  longitude: -77.0305709,
};

const Fields = () => {
  const navigation = useNavigation();
  const { location, geoName } = useLocationContext();
  const { token } = useAuthContext();
  const [coords, setCoords] = useState<LatLng>(START_LOCATION);
  const [fields, setFields] = useState<FieldData[]>([]);
  const [showlist, setShowlist] = useState<boolean>(false);

  const getNearbyFields = async (cords: LatLng) => {
    const fields = await fetctNearbyFields(coords, 10, token);
    setFields(fields.data);
  };

  const swapFieldView = () => {
    setShowlist(!showlist);
  };

  useEffect(() => {
    setCoords({
      latitude: location ? location.latitude : START_LOCATION.latitude,
      longitude: location ? location.longitude : START_LOCATION.longitude,
    })
    getNearbyFields(coords);
    console.log('🌏 ~ location', location);
  }, [location]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FieldControl onValueChange={swapFieldView} value={showlist} />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={[LayoutStyles.whiteContainer, { justifyContent: "flex-end" }]}
    >
      <View
        style={{
          marginTop: 0,
          alignItems: "center",
          paddingVertical: 20,
          borderBottomColor: Colors.silverSand,
          borderBottomWidth: 2,
          zIndex: 1,
        }}
      >
        <Pressable
          style={[styles.button, { marginBottom: 20 }]}
          onPress={() => console.log("Filter")}
        >
          <FilterIcon size={20} />
          <Text style={[styles.buttonText, { marginLeft: 10 }]}>
            FILTRAR CANCHAS
          </Text>
        </Pressable>
        <LocationButton style={{ marginBottom: -50 }} geoname={geoName} />
      </View>

      {showlist ? (
        <ScrollView style={{ paddingTop: 30}}>
          {fields?.map((field, index) => (
            <View  key={`list-${index}`} style={{ alignItems: "center"}}>
              <FieldItem
                id={field.id}
                name={field.name}
                district={field.district.name}
                portrait={field.portrait}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.005,
          }}
        >
          {fields?.map((field, index) => (
            <Marker
              key={`map-${index}`}
              onPress={() => console.log("Press marker:", field.id)}
              coordinate={{
                latitude: field.map_latitude,
                longitude: field.map_longitude,
              }}
            >
              <View
                style={{
                  height: 80,
                  width: 80,
                }}
              >
                <MapMarker image={getFieldUrl(field.portrait)} size={80} />
              </View>
            </Marker>
          ))}
        </MapView>
      )}
    </SafeAreaView>
  );
};

export default Fields;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.maastrichtBlue,
    borderRadius: 10,
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
  map: {
    height: height - 229.27,
    width: width,
  },
});
