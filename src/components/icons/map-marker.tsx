import Svg, { G, Path, Defs, ClipPath, Ellipse, Image } from "react-native-svg";
import Colors from "@/src/utils/Colors";
import Images from "@/src/utils/Images";

const MapMarker = ({
  image,
  size,
}: {
  image: string | undefined;
  size: number;
}) => {
  const defaultImage = image ?? Images.portraitDefault;

  return (
    <Svg viewBox="0 0 150 150" width={size} height={size}>
      <Defs>
        <ClipPath id="clipPath51">
          <Path
            transform="translate(-110.93 -761.76)"
            d="m0 1170h540v-1170h-540z"
          />
        </ClipPath>
        <ClipPath id="clipPath2">
          <Ellipse
            cx="-89.874"
            cy="656.18"
            rx="248.48"
            ry="248.48"
            fill="#00ffff"
          />
        </ClipPath>
      </Defs>
      <G transform="matrix(.26458 0 0 .26458 98.779 -104.68)">
        <Path
          transform="matrix(4.8015 0 0 -4.8015 -152.33 896.54)"
          d="m0 0 9.772-12.562c1.232-1.583 3.623-1.591 4.865-0.016l9.925 12.578z"
          clipPath="url(#clipPath51)"
          fill={Colors.maastrichtBlue}
        />
        <Ellipse
          cx="-89.874"
          cy="656.18"
          rx="260.53"
          ry="260.53"
          fill={Colors.maastrichtBlue}
        />
        <Image
          x="-509.65"
          y="398.8"
          width="839.55"
          height="511.5"
          clipPath="url(#clipPath2)"
          preserveAspectRatio="none"
          href={defaultImage}
        />
      </G>
    </Svg>
  );
};

export default MapMarker;
