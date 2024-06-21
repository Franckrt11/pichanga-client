import { API_URL, FETCH_HEADERS } from "@/src/utils/Constants";

export const fetchAllChats = async (token: string | null) => {
  try {
    const response = await fetch(`${API_URL}api/chat`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Chat.ts ~ fetchAllChats() ~ error:", error);
  }
};

export const fetchChat = async (id: number, token: string | null) => {
  try {
    const response = await fetch(`${API_URL}api/chat/${id}`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Chat.ts ~ fetchChat() ~ error:", error);
  }
};

export const fetchMessages = async (id: number, token: string | null) => {
  try {
    const response = await fetch(`${API_URL}api/chat/message/${id}`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Chat.ts ~ fetchMessages() ~ error:", error);
  }
};

export const postMessage = async (
  id: number,
  token: string | null,
  message: string
) => {
  try {
    const response = await fetch(`${API_URL}api/chat/message`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        sender: "user",
        chat_id: id,
      }),
    });

    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Chat.ts ~ postMessage() ~ error:", error);
  }
};

export const fetchChatRoom = async (
  user: number,
  company: number,
  token: string | null
) => {
  try {
    const response = await fetch(`${API_URL}api/chat/room/${user}/${company}`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Chat.ts ~ fetchChatRoom() ~ error:", error);
  }
};

export const createChatRoom = async (
  user: number,
  company: number,
  token: string | null
) => {
  try {
    const response = await fetch(`${API_URL}api/chat/room`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: user,
        company_id: company,
      }),
    });

    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Chat.ts ~ createChatRoom() ~ error:", error);
  }
};
