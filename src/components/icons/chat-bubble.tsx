import { View } from "react-native";
import { TabStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { ColorIconProps } from "@/src/utils/Types";
import ChatIcon from "./chat-icon";

const ChatBubble = ({ active, color }: ColorIconProps) => {
  return (
    <View
      style={[
        TabStyles.tabIcon,
        {
          borderColor: active ? Colors.maastrichtBlue : Colors.silverSand,
          backgroundColor: active ? Colors.maastrichtBlue : "white",
        },
      ]}
    >
      <ChatIcon size={15} color={color} />
    </View>
  );
};

export default ChatBubble;
