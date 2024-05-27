import { API_URL, FETCH_HEADERS } from "@/src/utils/Constants";
import { LatLng } from "react-native-maps";

export const fetctNearbyFields = async (location: LatLng, distance: number, token: string | null)  => {
  try {
    const response = await fetch(`${API_URL}api/client/fields/nearby`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        latitude: location.latitude,
        longitude: location.longitude,
        distance
      })
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ fetctNearbyFields() ~ error:", error);
  }
};
