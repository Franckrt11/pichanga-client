import React, { createContext, useState, useEffect, useContext } from "react";
import { reverseGeocodeAsync } from "expo-location";
import useLocation from "../hooks/useLocation";
import { ProviderProps } from "@/src/utils/Types";
import { LatLng } from "react-native-maps";

interface ContextProps {
  location: LatLng | null;
  setLocation: React.Dispatch<React.SetStateAction<LatLng | null>>;
  geoName: string;
};

const LocationContext = createContext<ContextProps>({
  location: null,
  setLocation: () => {},
  geoName: "Ubicación no encontrada",
});

export const useLocationContext = () => {
  return useContext(LocationContext);
};

export const LocationProvider = ({ children }: ProviderProps) => {
  const currentLocation = useLocation();
  const [location, setLocation] = useState<LatLng | null>(null);
  const [geoName, setGeoName] = useState<string>("Loading location..");

  const getAddressFromCoordinates = async (
    latitude: number,
    longitude: number,
    setLocationName: Function
    ) => {
    try {
      const geocode = await reverseGeocodeAsync({latitude, longitude});
      console.log("🗺 ~ context/Location.tsx ~ reverseGeocodeAsync() ~ geocode:", geocode);
      if (geocode[0]) {
        // let postalCode = findPostalCode(geocode[0].postalCode);
        // if (postalCode) setRegion(postalCode.name);
        setLocationName(geocode[0].city);
      }
    } catch (error) {
      console.log("🚩 ~ context/Location.tsx ~ LocationProvider() ~ error:", error);
    }
  };

  useEffect(() => {
    if (currentLocation) {
      setLocation(currentLocation);
    }
  }, [currentLocation]);

  useEffect(() => {
    if (location) {
      getAddressFromCoordinates(
        location.latitude,
        location.longitude,
        setGeoName
      );
    }
  }, [location]);

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        geoName
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};