import { StyleSheet, Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import Colors from "@/src/utils/Colors";
import Images from "@/src/utils/Images";
import ZoomPlusIcon from "@/src/components/icons/zoom-plus-icon";
import Rating from "@/src/components/rating";
import { getFieldUrl } from "@/src/utils/Helpers";

interface FieldProps {
  id: number;
  name: string;
  district: string;
  portrait: string | null;
}

const FieldItem = ({ id, name, district, portrait }: FieldProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View style={{ width: 120, overflow: "hidden" }}>
            <Image
              source={{ uri: getFieldUrl(portrait) }}
              placeholder={Images.portraitDefault}
              style={{ width: 200, height: 125, right: "35%" }}
              transition={200}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.description}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subtitle}>{district}</Text>
              <Rating score={2} comments={32} />
            </View>
            <View style={styles.more}>
              <Pressable onPress={() => router.push(`/fields/${id}`)}>
                <ZoomPlusIcon size={20} color={Colors.maastrichtBlue} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FieldItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  wrapper: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.silverSand,
    overflow: "hidden",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.silverSand,
  },
  content: {
    flexDirection: "row",
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: Colors.silverSand,
  },
  description: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "PoppinsMedium",
  },
  more: {
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    height: "90%",
    borderLeftWidth: 2,
    borderLeftColor: Colors.silverSand,
  },
});
