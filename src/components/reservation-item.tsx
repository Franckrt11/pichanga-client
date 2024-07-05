import { StyleSheet, Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import ZoomPlusIcon from "@/src/components/icons/zoom-plus-icon";
import Colors from "@/src/utils/Colors";
import { FieldData, HourRange } from "@/src/utils/Types";
import { HOUR_LIST } from "@/src/utils/Constants";

const ReservationItem = ({
  id,
  date,
  field,
  hour,
}: {
  id: number;
  date: string;
  field: FieldData;
  hour: HourRange;
}) => {
  const getHourName = (key: number) => {
    if (key) {
      const filtered = HOUR_LIST.filter((hour) => {
        return hour.value === key;
      });
      return filtered[0].text;
    }
    return;
  };

  const getDayName = (day:string) => {
    const date = parseISO(day);
    return format(date, "dd MMM yyyy", { locale: es });
  };

  return (
    <Pressable
      style={styles.matchBlock}
      onPress={() => router.push(`/bookings/${id}`)}
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
            {getDayName(date)}
          </Text>
          <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
            {getHourName(hour.start)} - {getHourName(hour.end)}
          </Text>
          <Text style={styles.matchContentText}>{field.name}</Text>
        </View>
      </View>
      <View style={styles.matchIcon}>
        <ZoomPlusIcon size={20} color={Colors.white} />
      </View>
    </Pressable>
  );
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
