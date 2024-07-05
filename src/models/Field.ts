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

export const fetchField = async (fid: number, token: string | null)  => {
  try {
    const response = await fetch(`${API_URL}api/client/field/${fid}`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      }
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ fetchField() ~ error:", error);
  }
};

export const fetchFieldPictures = async (id: number, token: string | null)  => {
  try {
    const response = await fetch(`${API_URL}api/client/field/${id}/pictures`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      }
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ fetchFieldPictures() ~ error:", error);
  }
};

export const fetchFieldDays = async (id: number, token: string | null)  => {
  try {
    const response = await fetch(`${API_URL}api/client/field/${id}/days`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      }
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ fetchFieldDays() ~ error:", error);
  }
};
