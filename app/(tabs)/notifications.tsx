import { Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { LayoutStyles } from "@/src/utils/Styles";
import ActivityBlock from "@/src/components/activity-block";

const Notifications = () => {
  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <ScrollView
        style={{ paddingTop: 10 }}
        contentContainerStyle={{ alignItems: "center"}}
      >
        <View style={LayoutStyles.scrollContainer}>
          <Text style={LayoutStyles.pageTitle}>NOTIFICACIONES</Text>
          <ActivityBlock />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
