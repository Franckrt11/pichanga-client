import { Stack } from "expo-router/stack";
import Logo from "@/src/components/header/logo";
import FieldControl from "@/src/components/header/field-control";

const FieldsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => <Logo />,
        headerStyle: { backgroundColor: "white" },
        headerShadowVisible: false,
        animation: "none",
      }}
    >
      <Stack.Screen
        name="map"
        options={{
          headerTitle: () => <></>,
          headerRight: () => (
            <FieldControl route={"fields/list"} icon={"map"} />
          ),
        }}
      />
      <Stack.Screen
        name="list"
        options={{
          headerTitle: () => <></>,
          headerRight: () => (
            <FieldControl route={"fields/map"} icon={"list"} />
          ),
        }}
      />
    </Stack>
  );
};

export default FieldsLayout;
