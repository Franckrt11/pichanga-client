import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  Modal,
} from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from "react-native-maps";
import LocationButton from "@/src/components/location-button";
import FilterIcon from "@/src/components/icons/filter-icon";
import MapMarker from "@/src/components/icons/map-marker";
import ZoomIcon from "@/src/components/icons/zoom-icon";
import CloseIcon from "@/src/components/icons/close-icon";
import Rating from "@/src/components/rating";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { FieldData } from "@/src/utils/Types";
import { getFieldUrl } from "@/src/utils/Helpers";
import { useLocationContext } from "@/src/context/Location";
import { useAuthContext } from "@/src/context/Auth";
import { fetctNearbyFields } from "@/src/models/Field";
import { START_LOCATION } from "@/src/utils/Constants";

const { width, height } = Dimensions.get("window");

interface ModalField {
  id: number;
  name: string;
  district: string;
  score: number;
  comments: number;
}

const FieldsMap = () => {
  const { location, geoName } = useLocationContext();
  const { token } = useAuthContext();
  const [coords, setCoords] = useState<LatLng>(START_LOCATION);
  const [fields, setFields] = useState<FieldData[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalField, setModalField] = useState<ModalField | null>(null);

  const getNearbyFields = async (coordinates: LatLng) => {
    const fields = await fetctNearbyFields(coordinates, 5, token);
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
        region={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
      >
        {fields?.map((field, index) => (
          <Marker
            key={`map-${index}`}
            onPress={() => {
              setModalField({
                id: field.id,
                name: field.name,
                district: field.district.name,
                score: 4,
                comments: 35,
              });
              setModalVisible(true);
            }}
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CloseIcon
              style={styles.modalCloseIcon}
              size={20}
              onPress={() => setModalVisible(!modalVisible)}
            />
            {modalField && (
              <View>
                <Text style={styles.modalTitle}>{modalField.name}</Text>
                <Text style={styles.modalSubText}>{modalField.district}</Text>
                <Rating
                  score={modalField.score}
                  comments={modalField.comments}
                />
                <View style={{ width: "100%", alignItems: "center" }}>
                  <Pressable
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      router.push(`/fields/${modalField.id}`);
                    }}
                    style={styles.greenButton}
                  >
                    <ZoomIcon size={13} color={Colors.white} />
                    <Text style={styles.greenButtonText}>Ver cancha</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000066",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  modalCloseIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 10,
  },
  modalSubText: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  greenButton: {
    backgroundColor: Colors.metallicGreen,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  greenButtonText: {
    color: Colors.white,
    fontFamily: "PoppinsMedium",
    fontSize: 12,
  },
});
