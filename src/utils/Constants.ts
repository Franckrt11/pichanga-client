import { Platform } from "react-native";

export const API_URL =
  Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_API_URL
    : process.env.EXPO_PUBLIC_LOCAL_URL;

export const FETCH_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const HOUR_LIST = [
  {
    value: "5:00",
    text: "5:00 am",
  },
  {
    value: "6:00",
    text: "6:00 am",
  },
  {
    value: "7:00",
    text: "7:00 am",
  },
  {
    value: "8:00",
    text: "8:00 am",
  },
  {
    value: "9:00",
    text: "9:00 am",
  },
  {
    value: "10:00",
    text: "10:00 am",
  },
  {
    value: "11:00",
    text: "11:00 am",
  },
  {
    value: "12:00",
    text: "12:00 pm",
  },
  {
    value: "13:00",
    text: "1:00 pm",
  },
  {
    value: "14:00",
    text: "2:00 pm",
  },
  {
    value: "15:00",
    text: "3:00 pm",
  },
  {
    value: "16:00",
    text: "4:00 pm",
  },
  {
    value: "17:00",
    text: "5:00 pm",
  },
  {
    value: "18:00",
    text: "6:00 pm",
  },
  {
    value: "19:00",
    text: "7:00 pm",
  },
  {
    value: "20:00",
    text: "8:00 pm",
  },
  {
    value: "21:00",
    text: "9:00 pm",
  },
  {
    value: "22:00",
    text: "10:00 pm",
  },
  {
    value: "23:00",
    text: "11:00 pm",
  },
];

export const LIMA_DISTRICTS = [
  "Ancón",
  "Ate",
  "Barranco",
  "Breña",
  "Carabayllo",
  "Cercado de Lima",
  "Chaclacayo",
  "Chorrillos",
  "Cieneguilla",
  "Comas",
  "El agustino",
  "Independencia",
  "Jesús maría",
  "La molina",
  "La victoria",
  "Lince",
  "Los olivos",
  "Lurigancho",
  "Lurín",
  "Magdalena del mar",
  "Miraflores",
  "Pachacámac",
  "Pucusana",
  "Pueblo libre",
  "Puente piedra",
  "Punta hermosa",
  "Punta negra",
  "Rímac",
  "San bartolo",
  "San borja",
  "San isidro",
  "San Juan de Lurigancho",
  "San Juan de Miraflores",
  "San Luis",
  "San Martin de Porres",
  "San Miguel",
  "Santa Anita",
  "Santa María del Mar",
  "Santa Rosa",
  "Santiago de Surco",
  "Surquillo",
  "Villa el Salvador",
  "Villa Maria del Triunfo"
];
