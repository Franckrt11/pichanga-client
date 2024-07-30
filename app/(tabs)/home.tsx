import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";
import FieldCarousel from "@/src/components/field-carousel";
import { LayoutStyles } from "@/src/utils/Styles";
import { FieldData, HourRange, ReserveData } from "@/src/utils/Types";
import ReservationItem from "@/src/components/reservation-item";
import LocationButton from "@/src/components/location-button";
import { useLocationContext } from "@/src/context/Location";
import { useAuthContext } from "@/src/context/Auth";
import { fetchAllReserves } from "@/src/models/Reserve";
import { fetctNearbyFields } from "@/src/models/Field";
import { START_LOCATION } from "@/src/utils/Constants";

const Home = () => {
  const { location, geoName } = useLocationContext();
  const { token, userId } = useAuthContext();
  const [reserves, setReserves] = useState<ReserveData[]>([]);
  const [fields, setFields] = useState<FieldData[]>([]);
  const [coords, setCoords] = useState<LatLng>(START_LOCATION);

  const getReserves = async () => {
    if (userId) {
      const response = await fetchAllReserves(Number(userId), token);
      if (response.status) setReserves(response.data);
    }
  };

  const getNearbyFields = async (cords: LatLng) => {
    const fields = await fetctNearbyFields(coords, 2.5, token);
    setFields(fields.data);
  };

  useEffect(() => {
    setCoords({
      latitude: location ? location.latitude : START_LOCATION.latitude,
      longitude: location ? location.longitude : START_LOCATION.longitude,
    });
    getReserves();
    getNearbyFields(coords);
    // console.log('🚖 ~ token', token);
  }, [userId]);

  return (
    <SafeAreaView style={LayoutStyles.whiteContainer}>
      <ScrollView
        style={{ paddingTop: 10 }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={LayoutStyles.scrollContainer}>
          <View
            style={{
              width: "100%",
              marginTop: 10,
              marginBottom: 30,
              alignItems: "center",
            }}
          >
            <LocationButton geoname={geoName} />
          </View>
          <Text style={styles.title}>CANCHAS CERCANAS</Text>
          <View style={{ width: "100%", marginBottom: 30 }}>
            <FieldCarousel data={fields} />
          </View>

          <Text style={styles.title}>SOLICITUD DE RESERVAS</Text>
          <View style={{ width: "100%", paddingBottom: 30 }}>
            {reserves.map((reserve, index) => (
              <ReservationItem
                key={`reserve-${index}`}
                id={reserve.id as number}
                status={reserve.status as string}
                date={reserve.date}
                field={reserve.field as FieldData}
                hour={reserve.hour as HourRange}
                inscription={reserve.inscription}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontFamily: "PoppinsSemiBold",
    marginBottom: 10,
    fontSize: 16,
    textAlign: "left",
    width: "100%",
  },
});
