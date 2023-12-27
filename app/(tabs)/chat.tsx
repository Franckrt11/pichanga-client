import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Image } from 'expo-image';
import { router } from "expo-router";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { fetchAllChats }  from "@/src/models/Chat";
import { useAuthContext } from "@/src/context/Auth";
import { getAvatarUrl, getCompanyAvatarUrl } from "@/src/utils/Helpers";
import Images from "@/src/utils/Images";
import { IRoom } from "@/src/utils/Types";

const RoomItem = ({data}: {data: IRoom}) => {
  const goToRoom = (id:number) => {
    router.push(`/chats/${id}`);
  };

  return (
    <Pressable
      onPress={() => goToRoom(data.id)}
      style={{ flex: 1, flexDirection: "row", width: "100%"}}
    >
      <View>
        <Image
          source={{uri: getCompanyAvatarUrl(data.company.photo) }}
          placeholder={Images.avatarDefault}
          style={styles.avatar}
          transition={300}
        />
      </View>
      <View>
        <Text style={styles.chatName}>{ `${data.company.name}`}</Text>
        <Text style={styles.chatMessage}>{data.last_message}</Text>
      </View>
    </Pressable>
  );
};

const Chat = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const { token } = useAuthContext();

  // useEffect(() => {
  //   const fetchGroups = () => {
	// 		fetch(SOCKET_URL)
	// 			.then((res) => res.json())
	// 			.then((data) => setRooms(data))
	// 			.catch((err) => console.error(err));
	// 	}
	// 	fetchGroups();
  // },[]);

  // useEffect(() => {
	// 	socket.on("roomsList", (rooms) => {
	// 		setRooms(rooms);
	// 	});
	// }, [socket]);

  // const handleCreateGroup = () => setVisible(true);

  const getChatList = async (): Promise<void> => {
    const chats = await fetchAllChats(token);
    if (chats.status) {
      setRooms(chats.data);
    }
  };

  useEffect(() => {
    getChatList();
  },[]);

  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <ScrollView
        style={{ paddingTop: 10 }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={LayoutStyles.scrollContainer}>
          <Text style={LayoutStyles.pageTitle}>CHAT</Text>
          { rooms.map((item)=> <RoomItem data={item} key={item.id} />) }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 60,
    height: 60,
    width: 60,
    marginRight: 15
  },
  chatName: {
    color: Colors.maastrichtBlue,
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 5,
  },
  chatMessage: {
    color: Colors.maastrichtBlue,
    fontSize: 16,
    fontFamily: "PoppinsMedium"
  }
});

// https://dev.to/novu/building-a-chat-app-with-socketio-and-react-native-k1b
// https://github.com/novuhq/blog/blob/main/chat-app-reactnative-socketIO/app/screens/Chat.js
