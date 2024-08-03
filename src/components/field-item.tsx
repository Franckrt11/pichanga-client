import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import Colors from "@/src/utils/Colors";
import Images from "@/src/utils/Images";
import StarIcon from "@/src/components/icons/star-icon";
import ZoomPlusIcon from "@/src/components/icons/zoom-plus-icon";
import { getFieldUrl } from "@/src/utils/Helpers";

const { width } = Dimensions.get("window");
const ITEM_LENGTH = width * 0.9;

interface FieldProps {
  id: number;
  name: string;
  district: string;
  portrait: string | null;
}

const FieldItem = ({ id, name, district, portrait }: FieldProps) => {
  return (
    <View style={[styles.container, { width: ITEM_LENGTH }]}>
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
              <View style={styles.score}>
                <StarIcon size={15} active={true} />
                <StarIcon size={15} active={true} />
                <StarIcon size={15} active={true} />
                <StarIcon size={15} active={false} />
                <StarIcon size={15} active={false} />
                <Text style={styles.countScore}>(50)</Text>
              </View>
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
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  score: {
    flexDirection: "row",
    gap: 5,
    marginTop: 5,
    alignItems: "center",
  },
  countScore: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    paddingTop: 4,
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
