import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from "react-native-maps";
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
import { START_LOCATION } from "@/src/utils/Constants";

const { width, height } = Dimensions.get("window");

const FieldsMap = () => {
  const { location, geoName } = useLocationContext();
  const { token } = useAuthContext();
  const [coords, setCoords] = useState<LatLng>(START_LOCATION);
  const [fields, setFields] = useState<FieldData[]>([]);

  const getNearbyFields = async (coordinates: LatLng) => {
    const fields = await fetctNearbyFields(coordinates, 10, token);
    setFields(fields.data);
  };

  useEffect(() => {
    setCoords({
      latitude: location ? location.latitude : START_LOCATION.latitude,
      longitude: location ? location.longitude : START_LOCATION.longitude,
    });
    getNearbyFields(coords);
    console.log("🌏 ~ location", location);
  }, [location]);

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
    </SafeAreaView>
  );
};

export default FieldsMap;

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
