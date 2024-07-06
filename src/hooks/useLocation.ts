import { useEffect, useState } from "react";
import { requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";
import { LatLng } from "react-native-maps";

const useLocation = () => {
  const [location, setLocation] = useState<LatLng | null>(null);

  const getLocation = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        await watchPositionAsync({
          accuracy: 4,
          // distanceInterval: 1500,
          // timeInterval: 10000,
        }, ({coords}) => {
          // console.log('🚗 ~ watchPositionAsync ~ coords:', {lat :coords.latitude, lng: coords.longitude});
          const newCoords: LatLng = {latitude :coords.latitude, longitude: coords.longitude};
          setLocation(newCoords);
        });
      } else {
        return;
      }
    } catch (error) {
      console.log("🚩 ~ hooks/useLocation.ts ~ getLocation() ~ error:", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};

export default useLocation;
