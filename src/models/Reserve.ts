import { API_URL, FETCH_HEADERS } from "@/src/utils/Constants";
import { ReserveData } from "@/src/utils/Types";

export const saveReserve = async (data: ReserveData, token: string | null) => {
  try {
    const response = await fetch(`${API_URL}api/client/reserve`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Reserve.ts ~ saveReserve() ~ error:", error);
    return { status: false };
  }
};

export const fetchAllReserves = async (id: number, token: string | null)  => {
  try {
    const response = await fetch(`${API_URL}api/client/reserves/${id}`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      }
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Reserve.ts ~ fetchReserve() ~ error:", error);
    return { status: false };
  }
};
