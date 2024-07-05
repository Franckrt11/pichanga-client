import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import FieldCarousel from "@/src/components/field-carousel";
import { LayoutStyles } from "@/src/utils/Styles";
import { FieldData, HourRange, ReserveData } from "@/src/utils/Types";
import ReservationItem from "@/src/components/reservation-item";
import LocationButton from "@/src/components/location-button";
import { useLocationContext } from "@/src/context/Location";
import { useAuthContext } from "@/src/context/Auth";
import { fetchAllReserves } from "@/src/models/Reserve";

const Home = () => {
  const { geoName } = useLocationContext();
  const { token, userId } = useAuthContext();
  const [ reserves, setReserves ] = useState<ReserveData[]>([]);

  const fields = [
    {
      id: 1,
      name: 'Cancha Uno',
      district: 'Cercado de Lima',
      portrait: null,
    },
    {
      id: 2,
      name: 'Cancha 2',
      district: 'Comas',
      portrait: null,
    },
    {
      id: 3,
      name: 'Canchita',
      district: 'Breña',
      portrait: null,
    },
  ];

  const getReserves = async () => {
    if (userId) {
      const response = await fetchAllReserves(Number(userId), token);
      console.log("🚀 ~ getReserves ~ response:", response);
      if (response.status) setReserves(response.data);
    }
  };

  useEffect(() => {
    getReserves();
    // console.log('🚖 ~ token', token);
  }, [userId]);

  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <ScrollView
        style={{ paddingTop: 10 }}
        contentContainerStyle={{ alignItems: "center"}}
      >
        <View style={LayoutStyles.scrollContainer}>
          <View style={{ width: "100%", marginTop: 10, marginBottom: 30, alignItems: "center" }}>
            <LocationButton geoname={geoName} />
          </View>
          <Text style={styles.title}>CANCHAS CERCANAS</Text>
          <View style={{ width: "100%", marginBottom: 30 }}>
            <FieldCarousel data={fields} />
          </View>

          <Text style={styles.title}>SOLICITUD DE RESERVAS</Text>
          <View style={{ width: "100%" }}>
            {reserves.map((reserve, index) => (
              <ReservationItem
                key={`reserve-${index}`}
                id={reserve.id as number}
                date={reserve.date}
                field={reserve.field as FieldData}
                hour={reserve.hour as HourRange}
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
    width: "100%"
  }
});
