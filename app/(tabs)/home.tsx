import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import MarkIcon from "@/src/components/icons/mark-icon";
import FieldCarousel from "@/src/components/field-carousel";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ReservationItem from "@/src/components/reservation-item";

const Home = () => {
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
          <View style={{ width: "90%", marginVertical: 30 }}>
            <Pressable
              style={styles.buttonOutline}
              onPress={() => console.log('Location')}
            >
              <MarkIcon size={15} />
              <Text style={styles.buttonText}>Cercado de Lima</Text>
            </Pressable>
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
  },
  buttonOutline: {
    backgroundColor: Colors.white,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    padding: 5,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row"
  },
  buttonText: {
    color: Colors.maastrichtBlue,
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    textAlign: "center",
    marginLeft: 8
  }
});
