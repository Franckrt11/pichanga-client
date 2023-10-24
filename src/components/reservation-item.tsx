import { StyleSheet, Text, View, Pressable } from 'react-native'
import ZoomPlusIcon from "@/src/components/icons/zoom-plus-icon";
import Colors from "@/src/utils/Colors";

const ReservationItem = () => {
  return (
    <Pressable
      style={styles.matchBlock}
      onPress={() => console.log("GoTo Next Match")}
    >
      <View style={styles.matchContent}>
        <View>
          <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
            Reserva:
          </Text>
          <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
            Fecha:
          </Text>
          <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
            Horario:
          </Text>
          <Text style={styles.matchContentText}>Cancha:</Text>
        </View>
        <View>
          <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
            Pedro Paredes
          </Text>
          <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
            06 Enero 2024
          </Text>
          <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
            5:00 pm - 8:00 pm
          </Text>
          <Text style={styles.matchContentText}>Cancha Lorem</Text>
        </View>
      </View>
      <View style={styles.matchIcon}>
        <ZoomPlusIcon size={20} color={Colors.white} />
      </View>
    </Pressable>
  )
};

export default ReservationItem;

const styles = StyleSheet.create({
  matchBlock: {
    backgroundColor: Colors.maastrichtBlue,
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    paddingVertical: 15,
    marginBottom: 20,
  },
  matchContent: {
    flexDirection: "row",
    gap: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    paddingLeft: 30,
    flexGrow: 1,
  },
  matchContentText: {
    color: Colors.white,
    fontFamily: "PoppinsMedium",
  },
  matchIcon: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: Colors.silverSand,
    paddingRight: 10,
    paddingLeft: 15,
  },
});
