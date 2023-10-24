import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import Colors from "@/src/utils/Colors";

const MarkIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size}  viewBox="0 0 50 50">
      <Defs>
        <ClipPath id="clipPath50">
          <Path transform="translate(-189.23 -1003.8)" d="m0 1170h540v-1170h-540z"/>
        </ClipPath>
      </Defs>
      <G transform="matrix(.26458 0 0 .26458 -64.08 -54.601)">
        <Path
          transform="matrix(9.5893 0 0 -9.5893 336.68 316.34)"
          d="m0 0c-2.048 0-3.709 1.661-3.709 3.709s1.661 3.709 3.709 3.709 3.709-1.661 3.709-3.709-1.661-3.709-3.709-3.709m0 11.468c-4.189 0-7.585-3.397-7.585-7.586s3.46-7.632 7.585-12.121c4.031 4.605 7.585 7.932 7.585 12.121s-3.396 7.586-7.585 7.586"
          clipPath="url(#clipPath50)"
          fill={Colors.maastrichtBlue}
        />
      </G>
    </Svg>
  )
};

export default MarkIcon;
