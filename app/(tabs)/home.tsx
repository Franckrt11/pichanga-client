import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import FieldCarousel from "@/src/components/field-carousel";
import { LayoutStyles } from "@/src/utils/Styles";
import ReservationItem from "@/src/components/reservation-item";
import LocationButton from "@/src/components/location-button";
import { useLocationContext } from "@/src/context/Location";

const Home = () => {
  const { geoName } = useLocationContext();

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
            <ReservationItem />
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
