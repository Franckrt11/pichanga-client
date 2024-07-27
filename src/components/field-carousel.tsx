import { StyleSheet, ScrollView, View, NativeScrollEvent } from "react-native";
import { useState } from "react";
import FieldItem from "@/src/components/field-item";
import Colors from "@/src/utils/Colors";
import { FieldData } from "@/src/utils/Types";

const Pagination = ({ data, page }: { data: FieldData[]; page: number }) => {
  return (
    <View style={styles.paginationWrapper}>
      {data.map((_, idx) => {
        return (
          <View
            key={`pagination-dot-${idx}`}
            style={[
              styles.dots,
              idx === page && { backgroundColor: Colors.maastrichtBlue },
            ]}
          />
        );
      })}
    </View>
  );
};

const FieldCarousel = ({ data }: { data: FieldData[] }) => {
  const [pageIndex, setPageIndex] = useState<number>(0);

  const handleSlidePageChanged = ({
    nativeEvent,
  }: {
    nativeEvent: NativeScrollEvent;
  }) => {
    let slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    setPageIndex(slide);
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        snapToAlignment="center"
        onScroll={handleSlidePageChanged}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <View key={`field-item-${index}`} style={{ paddingHorizontal: 5 }}>
            <FieldItem
              id={item.id}
              name={item.name}
              district={item.district.name}
              portrait={item.portrait}
            />
          </View>
        ))}
      </ScrollView>
      <Pagination data={data} page={pageIndex} />
    </View>
  );
};

export default FieldCarousel;

const styles = StyleSheet.create({
  dots: {
    height: 15,
    width: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.maastrichtBlue,
    backgroundColor: Colors.white,
  },
  paginationWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
});
