import Svg, { Path } from "react-native-svg";
import Colors from "@/src/utils/Colors";
import { Pressable, StyleProp, ViewStyle } from "react-native";

const CloseIcon = ({
  style,
  size,
  onPress
}: {
  style: StyleProp<ViewStyle>;
  size: number;
  onPress: () => void;
}) => {
  return (
    <Pressable style={style} onPress={onPress}>
      <Svg width={size} height={size} viewBox="0 0 50 50">
        <Path
          d="m7.3266 7.3028c-9.7541 9.7427-9.7706 25.604-0.03892 35.353 9.7457 9.7624 25.571 9.7989 35.353 0.07297 9.7962-9.7343 9.8158-25.624 0.03649-35.409-9.7485-9.7539-25.597-9.7598-35.351-0.017087zm9.3552 4.5535c0.43457-0.44578 0.69293-0.38781 1.0995 0.02432 2.0719 2.0999 4.1703 4.18 6.2563 6.2659l0.7273 0.72729 7.4773-7.4772 5.7211 5.721-7.4773 7.4772 7.5382 7.538-5.7673 5.7672-7.4725-7.4724c-0.28598 0.26354-0.51628 0.4579-0.73217 0.67378-2.0888 2.0831-4.1851 4.1596-6.2514 6.2707-0.4514 0.4626-0.72178 0.45213-1.1676-0.0049-1.514-1.5644-3.0519-3.108-4.6192-4.6191-0.47943-0.4626-0.41866-0.73579 0.02432-1.1676 2.0888-2.0495 4.1413-4.1217 6.2076-6.188l0.7273-0.72729-7.4725-7.4724c0.18505-0.24111 0.29823-0.42958 0.45244-0.58378 1.5757-1.5869 3.1698-3.1492 4.7287-4.7529z"
          fill={Colors.maastrichtBlue}
        />
      </Svg>
    </Pressable>
  );
};

export default CloseIcon;
