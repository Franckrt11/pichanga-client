import { StyleSheet, Pressable, View } from "react-native";
import { useState } from "react";
import Colors from "@/src/utils/Colors";
import FieldMapIcon from "@/src/components/icons/fieldmap-icon";
import FieldListIcon from "@/src/components/icons/fieldlist-icon";
import SwapIcon from "@/src/components/icons/swap-icon";

const FieldControl = () => {
  const [list, setList] = useState<boolean>(true);

  const switchView = () => {
    setList(!list);
    console.log("🚀 ~ switchView:", list);
    console.log("Emit switch");
  };
  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 10 }}>
      <Pressable
        style={styles.button}
        onPress={() => switchView() }
      >
      { list ? (
        <FieldListIcon size={30} />
      ) : (
        <FieldMapIcon size={30} />
      )}
      <SwapIcon style={styles.icon} size={16} />
      </Pressable>
    </View>
  );
};

export default FieldControl;

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.silverSand,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: "relative"
  },
  icon: {
    position: "absolute",
    top: -5,
    right: -5
  }
});
