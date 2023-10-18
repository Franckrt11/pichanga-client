import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { LayoutStyles } from "@/src/utils/Styles";

const Fields = () => {
  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <ScrollView
        style={{ paddingTop: 10 }}
        contentContainerStyle={{ alignItems: "center"}}
      >
        <View style={LayoutStyles.scrollContainer}>
          <Text style={LayoutStyles.pageTitle}>CANCHAS</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Fields;

const styles = StyleSheet.create({});