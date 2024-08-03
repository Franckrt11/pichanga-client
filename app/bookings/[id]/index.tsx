import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { LayoutStyles } from "@/src/utils/Styles";
import ChildPage from "@/src/components/layouts/child-page";
import ImageCarousel from "@/src/components/image-carousel";
import ZoomIcon from "@/src/components/icons/zoom-icon";
import ContentRow from "@/src/components/content-row";
import { useAuthContext } from "@/src/context/Auth";
import Colors from "@/src/utils/Colors";
import { fetchFieldPictures } from "@/src/models/Field";
import { fetchUserReserve, cancelUserReserve } from "@/src/models/Reserve";
import { FieldPictureData, ReserveData, HourRange } from "@/src/utils/Types";
import {
  getStatus,
  getDayName,
  getHourName,
  hasInscriptionText,
} from "@/src/utils/Helpers";

interface PictureList {
  id: number;
  filename: string | undefined;
}

const BookingsDetails = () => {
  const params = useLocalSearchParams();
  const { userId, token } = useAuthContext();
  const [reserve, setReserve] = useState<ReserveData | null>(null);
  const [hours, setHours] = useState<HourRange | null>(null);
  const [pictures, setPictures] = useState<PictureList[]>([]);

  const getReserve = async () => {
    const response = await fetchUserReserve(
      parseInt(params.id as string),
      token
    );
    if (response.status) {
      setReserve(response.data);
      setHours(response.data.hour);
      const field_pictures = await getPictures(response.data.field.id);
      setPictures([
        { id: 0, filename: response.data.field.portrait },
        ...field_pictures,
      ]);
    }
  };

  const getGame = (value: string) => {
    return value.replace("v", " vs ");
  };

  const getPictures = async (id: number): Promise<FieldPictureData[]> => {
    const response = await fetchFieldPictures(id, token);
    return response.status ? response.data : [];
  };

  const cancelAlert = () => {
    Alert.alert("Cancelar reserva", "¿Deseas cancelar tu reserva?", [
      {
        text: "No",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Cancelar",
        onPress: async () => {
          if (reserve) {
            const response = await cancelUserReserve(
              reserve.id as number,
              token
            );
            if (response.status) router.replace("/(tabs)/home");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    getReserve();
  }, []);

  return (
    <ChildPage style={{ paddingBottom: 70 }}>
      <Text style={[LayoutStyles.pageTitle, { marginBottom: 0 }]}>
        DATOS DE RESERVA
      </Text>
      <Text style={styles.fieldTitle}>{reserve?.field?.name} </Text>

      <ImageCarousel data={pictures} />

      <View style={{ width: "50%", marginBottom: 10 }}>
        <Pressable
          onPress={() => router.push(`/fields/${reserve?.field?.id}`)}
          style={styles.greenButton}
        >
          <ZoomIcon size={15} color={Colors.white} />
          <Text style={{ fontFamily: "PoppinsMedium", color: Colors.white }}>
            Ver cancha
          </Text>
        </Pressable>
      </View>

      {reserve && (
        <View style={{ width: "90%", marginBottom: 25 }}>
          <ContentRow label="Estado" data={getStatus(reserve.status)} />
          <ContentRow label="Fecha" data={getDayName(reserve.date)} />
          <ContentRow
            label="Horario"
            data={`${getHourName(hours?.start)} - ${getHourName(hours?.end)}`}
          />
          <ContentRow label="Modo de juego" data={getGame(reserve.game)} />
          <ContentRow
            label="Modo de inscripción"
            data={hasInscriptionText(reserve.inscription)}
          />
        </View>
      )}

      <View style={{ width: "70%", marginBottom: 10 }}>
        <Pressable onPress={cancelAlert} style={styles.blueButton}>
          <Text
            style={{
              fontFamily: "PoppinsMedium",
              color: Colors.white,
              fontSize: 16,
            }}
          >
            CANCELAR RESERVA
          </Text>
        </Pressable>
      </View>
    </ChildPage>
  );
};

export default BookingsDetails;

const styles = StyleSheet.create({
  fieldTitle: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.metallicGreen,
    fontSize: 25,
    marginBottom: 10,
  },
  greenButton: {
    backgroundColor: Colors.metallicGreen,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    padding: 5,
  },
  blueButton: {
    backgroundColor: Colors.maastrichtBlue,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
});
