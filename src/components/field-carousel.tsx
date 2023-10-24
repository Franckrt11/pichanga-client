import { StyleSheet, FlatList, View, ViewToken } from "react-native"
import { useState, useRef } from "react";
import FieldItem from "@/src/components/field-item";
import Colors from "@/src/utils/Colors";

interface FieldCarouselItem {
  id: number;
  name: string;
  district: string;
  portrait: string | null,
};

interface FieldCarouselProps {
  data: FieldCarouselItem[];
};

const Pagination = ({ data, index }: {data: FieldCarouselItem[], index: number})  => {
  return (
    <View style={styles.paginationWrapper}>
      {data.map((_, idx) => {
        return (
          <View
            key={'dot-'+idx.toString()}
            style={[
              styles.dots,
              idx === index && { backgroundColor: Colors.maastrichtBlue }
            ]}
          />
        )
      })}
    </View>
  )
};

const FieldCarousel = ({ data }: FieldCarouselProps) => {
  const [index, setIndex] = useState<number>(0);

  const handleOnViewableItemsChanged = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
    setIndex(viewableItems[0].index as number);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <FieldItem id={item.id} name={item.name} district={item.district} portrait={item.portrait} />}
        keyExtractor={item => 'picture-'+item.id.toString()}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        ItemSeparatorComponent={() => <View style={{ height: "100%", width: 10 }} />}
      />
      <Pagination data={data} index={index} />
    </View>
  )
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
    backgroundColor: Colors.white
  },
  paginationWrapper : {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center"
  }
});