import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LayoutStyles } from "@/src/utils/Styles";
import ChildPage from "@/src/components/layouts/child-page";

const FieldComments = () => {
  return (
    <ChildPage style={{ paddingBottom: 70 }}>
      <Text style={[LayoutStyles.pageTitle, { marginBottom: 10 }]}>
        Comentarios
      </Text>
    </ChildPage>
  );
};

export default FieldComments;

const styles = StyleSheet.create({});
