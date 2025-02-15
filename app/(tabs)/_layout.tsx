import { Tabs } from "expo-router/tabs";
import { StyleSheet } from "react-native";
import Colors from "@/src/utils/Colors";
import HomeIcon from "@/src/components/icons/home-icon";
import FieldIcon from "@/src/components/icons/field-icon";
import CalendarBubble from "@/src/components/icons/calendar-bubble";
import ChatBubble from "@/src/components/icons/chat-bubble";
import BellIcon from "@/src/components/icons/bell-icon";
import Logo from "@/src/components/header/logo";
import Options from "@/src/components/header/options";
import { initSockets } from "@/src/models/Socket";

const TabsLayout = () => {
  initSockets();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerLeft: () => <Logo />,
        headerStyle: { backgroundColor: "white", borderBottomWidth: 0 },
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: Colors.maastrichtBlue,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: () => <></>,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarLabel: "INICIO",
          tabBarIcon: ({ focused, color }) => (
            <HomeIcon active={focused} color={color} />
          ),
          headerRight: () => <Options />,
        }}
      />
      <Tabs.Screen
        name="fields"
        options={{
          headerShown: false,
          headerTitle: () => <></>,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarLabel: "CANCHAS",
          tabBarIcon: ({ focused, color }) => (
            <FieldIcon active={focused} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          headerTitle: () => <></>,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarLabel: "RESERVAS",
          tabBarIcon: ({ focused, color }) => (
            <CalendarBubble active={focused} color={color} />
          ),
          // headerRight: () => <BookingControl />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerTitle: () => <></>,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarLabel: "CHAT",
          tabBarIcon: ({ focused, color }) => (
            <ChatBubble active={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          headerTitle: () => <></>,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarLabel: "NOTIF.",
          tabBarIcon: ({ focused, color }) => (
            <BellIcon active={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  tabIcon: {
    color: Colors.maastrichtBlue,
    backgroundColor: "white",
    borderRadius: 20,
    height: 30,
    width: 30,
    textAlign: "center",
    borderColor: "Colors.maastrichtBlue",
    borderWidth: 1,
  },
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 5,
  },
  tabBarLabel: {
    color: Colors.maastrichtBlue,
    marginBottom: 10,
    fontSize: 9,
    fontFamily: "PoppinsMedium",
  },
});
