import { StyleSheet, Text, View, SafeAreaView, Pressable, Dimensions } from "react-native";
import { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from "react-native-maps";
import { LayoutStyles } from "@/src/utils/Styles";
import FilterIcon from "@/src/components/icons/filter-icon";
import Colors from "@/src/utils/Colors";
import LocationButton from "@/src/components/location-button";
import { useLocationContext } from "@/src/context/Location";

const { width } = Dimensions.get('window');

const Fields = () => {
  const { location, geoName } = useLocationContext();
  const [coords, setCoords] = useState<LatLng>({
    latitude: location ? location.latitude : -12.0459667,
    longitude: location ? location.longitude :-77.0305709
  });

  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <View style={{ marginTop: 90, alignItems: "center", paddingVertical: 20, borderBottomColor: Colors.silverSand, borderBottomWidth: 2, zIndex: 1 }}>
        <Pressable
          style={[styles.button, { marginBottom: 20 }]}
          onPress={() => console.log('Filter')}
        >
          <FilterIcon size={20} />
          <Text style={[styles.buttonText, { marginLeft: 10 }]}>FILTRAR CANCHAS</Text>
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
      />
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
    paddingVertical: 10
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
  map: {
    height: "100%",
    width: width
  }
});
