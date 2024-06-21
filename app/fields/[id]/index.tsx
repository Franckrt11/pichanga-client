import { Text, StyleSheet, Pressable, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from "react-native-maps";
import Colors from "@/src/utils/Colors";
import { LayoutStyles } from "@/src/utils/Styles";
import ChildPage from "@/src/components/layouts/child-page";
import ImageCarousel from "@/src/components/image-carousel";
import ChatIcon from "@/src/components/icons/chat-icon";
import StarIcon from "@/src/components/icons/star-icon";
import { useAuthContext } from "@/src/context/Auth";
import { fetchField, fetchFieldPictures } from "@/src/models/Field";
import { fetchChatRoom, createChatRoom } from "@/src/models/Chat";
import { FieldData, FieldPictureData } from "@/src/utils/Types";

interface PictureList {
  id: number;
  filename: string | undefined;
}

const ContentRow = ({
  label,
  data,
}: {
  label: string;
  data: string | undefined;
}) => {
  return (
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>{label}</Text>
      <Text style={styles.contentData}>{data}</Text>
    </View>
  );
};

const RatingRow = ({ score }: { score: number }) => {
  let star_array = [];

  for (let i = 0; i < 5; i++) {
    if (i < score) {
      star_array.push(true);
    } else {
      star_array.push(false);
    }
  }

  return (
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>Ranking</Text>
      <View style={{ flexDirection: "row", gap: 5, marginLeft: 20 }}>
        {star_array.map((star, index) => (
          <StarIcon key={index} size={28} active={star} />
        ))}
      </View>
    </View>
  );
};

const FieldDetails = () => {
  const params = useLocalSearchParams();
  const { token } = useAuthContext();
  const [field, setField] = useState<FieldData | null>(null);
  const [pictures, setPictures] = useState<PictureList[]>([]);
  const [coords, setCoords] = useState<LatLng>({
    latitude: -12.0459667,
    longitude: -77.0305709,
  });

  const getPictures = async (): Promise<FieldPictureData[]> => {
    const response = await fetchFieldPictures(
      parseInt(params.id as string),
      token
    );
    return response.status ? response.data : [];
  };

  const getField = async () => {
    const response = await fetchField(params.id as unknown as number, token);
    if (response.status) {
      setField(response.data);
      const field_pictures = await getPictures();
      setPictures([
        { id: 0, filename: response.data.portrait },
        ...field_pictures,
      ]);
      setCoords({
        latitude: response.data.map_latitude,
        longitude: response.data.map_longitude,
      });
    }
  };

  const showGames = (json: string | undefined) => {
    if (json) {
      const decode: string[] = JSON.parse(json);
      const replaced = decode.map((value) => value.replace("v", " vs "));
      return replaced.join(", ");
    } else {
      return "";
    }
  };

  const openChat = async (user:number, company: number) => {
    const chat = await fetchChatRoom(user, company, token);
    console.log("🚀 ~ openChat ~ chat:", chat);
    if (chat.data) {
      router.push(`/chats/${chat.room}`)
    } else {
      const newChat = await createChatRoom(user, company, token);
      console.log("🚀 ~ openChat ~ newChat:", newChat);
      if (newChat.status) router.push(`/chats/${newChat.data}`)
    }
  };

  useEffect(() => {
    getField();
  }, []);

  return (
    <ChildPage style={{ paddingBottom: 70 }}>
      <Text style={[LayoutStyles.pageTitle, { marginBottom: 10 }]}>
        {field?.name}
      </Text>

      <ImageCarousel data={pictures} />

      <View style={{ width: "70%", marginBottom: 10 }}>
        <Pressable
          onPress={() => router.push(`/fields/${params.id}/reserve`)}
          style={styles.greenButton}
        >
          <Text style={{ fontFamily: "PoppinsMedium", color: Colors.white }}>
            RESERVAR CANCHA
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Pressable
          onPress={() => router.push(`/fields/${params.id}/comments`)}
          style={styles.buttom}
        >
          <Text style={styles.buttomText}>Ver comentarios</Text>
        </Pressable>
        <Pressable
          onPress={() => openChat(params.id as unknown as number, field?.id as number)}
          style={styles.buttom}
        >
          <ChatIcon size={10} color={Colors.maastrichtBlue} />
          <Text style={styles.buttomText}>Abrir chat</Text>
        </Pressable>
      </View>
      <View style={{ width: "90%" }}>
        <ContentRow label="Teléfono fijo" data={field?.phone} />
        <ContentRow label="Celular o Whatsapp" data={field?.mobile} />
        <ContentRow label="Estacionamientos" data={field?.parking} />
        <ContentRow label="Medida de la cancha" data={field?.size} />
        <ContentRow label="Tipo de cancha" data={field?.type} />
        <ContentRow
          label="Cantidad máxima de jugadores"
          data={field?.players}
        />
        <ContentRow label="Modos de juego" data={showGames(field?.games)} />
        <ContentRow label="País" data={field?.country.name} />
        <ContentRow label="Ciudad" data={field?.city.name} />
        <ContentRow label="Distrito" data={field?.district.name} />
        <ContentRow label="Dirección" data={field?.address} />
      </View>
      <View
        style={{
          width: "100%",
          height: 300,
          marginBottom: 50,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ width: "100%", height: "100%" }}
          region={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.005,
          }}
        >
          <Marker coordinate={coords} />
        </MapView>
      </View>
      <View style={{ width: "90%" }}>
        <RatingRow score={2} />
        <ContentRow label="Comentarios" data={"20"} />
      </View>
    </ChildPage>
  );
};

export default FieldDetails;

const styles = StyleSheet.create({
  contentRow: {
    marginBottom: 20,
  },
  contentLabel: {
    fontFamily: "PoppinsMedium",
    fontSize: 18,
    marginBottom: 10,
    color: Colors.maastrichtBlue,
  },
  contentData: {
    marginLeft: 20,
    fontFamily: "PoppinsSemiBold",
    fontSize: 22,
    color: Colors.maastrichtBlue,
  },
  buttom: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    paddingVertical: 2,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  buttomText: {
    color: Colors.maastrichtBlue,
    fontFamily: "PoppinsMedium",
    fontSize: 12,
  },
  greenButton: {
    backgroundColor: Colors.metallicGreen,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    padding: 10,
  },
});
