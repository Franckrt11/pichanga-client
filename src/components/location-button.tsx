import { StyleSheet, Text, Pressable, StyleProp, ViewStyle } from "react-native";
import { useState, useEffect } from "react";
import MarkIcon from "@/src/components/icons/mark-icon";
import Colors from "@/src/utils/Colors";

const INIT_REGION = "Ubicación no encontrada";

const LocationButton = ({ style, geoname }: { style?: StyleProp<ViewStyle>, geoname: string }) => {
  const [region, setRegion] = useState<string>(INIT_REGION);

  useEffect(() => {
    setRegion(geoname);
  },[geoname]);

  return (
    <Pressable
      style={[styles.button, style]}
      onPress={() => console.log('Pressable ~ Location Button')}
    >
      <MarkIcon size={20} />
      <Text style={[styles.text, { marginLeft: 10 }]}>{region}</Text>
    </Pressable>
  )
};

export default LocationButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    padding: 5,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    flexDirection: "row"
  },
  text: {
    color: Colors.maastrichtBlue,
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    textAlign: "center",
    marginLeft: 8
  }
})