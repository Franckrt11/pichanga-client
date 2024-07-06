import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { fetchAllReserves } from "@/src/models/Reserve";
import { useAuthContext } from "@/src/context/Auth";
import ReservationItem from "@/src/components/reservation-item";
import { LayoutStyles } from "@/src/utils/Styles";
import { ReserveData, FieldData, HourRange } from "@/src/utils/Types";

const Bookings = () => {
  const { token, userId } = useAuthContext();
  const [ reserves, setReserves ] = useState<ReserveData[]>([]);

  const getReserves = async () => {
    if (userId) {
      const response = await fetchAllReserves(Number(userId), token);
      if (response.status) setReserves(response.data);
    }
  };

  useEffect(() => {
    getReserves();
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
          <Text style={LayoutStyles.pageTitle}>RESERVAS</Text>
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

export default Bookings;
