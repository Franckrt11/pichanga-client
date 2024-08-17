import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { LatLng } from "react-native-maps";
import FieldItem from "@/src/components/field-item";
import LocationButton from "@/src/components/location-button";
import FilterIcon from "@/src/components/icons/filter-icon";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { FieldData } from "@/src/utils/Types";
import { useLocationContext } from "@/src/context/Location";
import { useAuthContext } from "@/src/context/Auth";
import { fetctNearbyFields } from "@/src/models/Field";
import { START_LOCATION } from "@/src/utils/Constants";

const { width, height } = Dimensions.get("window");

const FieldsList = () => {
  const { location, geoName } = useLocationContext();
  const { token } = useAuthContext();
  const [coords, setCoords] = useState<LatLng>(START_LOCATION);
  const [fields, setFields] = useState<FieldData[]>([]);

  const getNearbyFields = async (coordinates: LatLng) => {
    const fields = await fetctNearbyFields(coordinates, 10, token);
    if (fields.status) setFields(fields.data);
  };

  useEffect(() => {
    setCoords({
      latitude: location ? location.latitude : START_LOCATION.latitude,
      longitude: location ? location.longitude : START_LOCATION.longitude,
    });
    getNearbyFields(coords);
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

      <ScrollView style={{ paddingTop: 30 }}>
        {fields.map((field, index) => (
          <View
            key={`list-${index}`}
            style={{ alignItems: "center", marginBottom: 15, height: 130, paddingHorizontal: 20 }}
          >
            <FieldItem
              id={field.id}
              name={field.name}
              district={field.district.name}
              portrait={field.portrait}
            />
          </View>
        ))}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FieldsList;

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
