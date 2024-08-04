import { StyleSheet, Text, View } from "react-native";
import StarIcon from "@/src/components/icons/star-icon";

const Rating = ({ score, comments }: { score: number, comments: number }) => {
  let star_array = [];

  for (let i = 0; i < 5; i++) {
    if (i < score) {
      star_array.push(true);
    } else {
      star_array.push(false);
    }
  }

  return (
    <View style={styles.score}>
      {star_array.map((star, index) => (
        <StarIcon key={index} size={15} active={star} />
      ))}
      <Text style={styles.countScore}>({comments})</Text>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
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
});
