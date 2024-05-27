import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { StyleProp, ViewStyle } from "react-native";
import Colors from "@/src/utils/Colors";

const PinIcon = ({style, size}: {style: StyleProp<ViewStyle>, size: number}) => {
  return (
    <Svg viewBox="0 0 50 50" style={style} width={size} height={size}>
      <Defs>
        <ClipPath id="clipPath66">
          <Path
            transform="translate(-287.59 -213.02)"
            d="m0 1170h540v-1170h-540z"
          />
        </ClipPath>
      </Defs>
      <G transform="matrix(.26458 0 0 .26458 -101.45 -337.6)">
        <Path
          transform="matrix(7.6939 0 0 -7.6939 383.45 1317.5)"
          d="m0 0 9.772-12.562c1.233-1.583 3.623-1.591 4.866-0.016l9.924 12.578z"
          clipPath="url(#clipPath66)"
          fill={Colors.maastrichtBlue}
        />
      </G>
    </Svg>
  );
};

export default PinIcon;
