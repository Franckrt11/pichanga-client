import { LatLng } from "react-native-maps";

export const API_URL = process.env.EXPO_PUBLIC_API_URL;
// export const API_URL = "http://10.0.2.2/pichanga/";

export const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL;
// export const SOCKET_URL = "http://localhost:3000"

export const GOOGLE_AUTH_ANDROID = process.env.GOOGLE_LOGIN_KEY_ANDROID;
export const GOOGLE_AUTH_IOS = process.env.GOOGLE_LOGIN_KEY_IOS;

export const FETCH_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const START_LOCATION: LatLng = {
  latitude:  -12.0459667,
  longitude: -77.0305709,
};

export const RESERVE_STATUS = [
  {
    value: "pending",
    text: "En espera",
  },
  {
    value: "confirm",
    text: "Confirmado",
  },
  {
    value: "cancel",
    text: "Cancelado",
  },
];

export const HOUR_LIST = [
  {
    value: 1,
    text: "5:00 am",
  },
  {
    value: 2,
    text: "6:00 am",
  },
  {
    value: 3,
    text: "7:00 am",
  },
  {
    value: 4,
    text: "8:00 am",
  },
  {
    value: 5,
    text: "9:00 am",
  },
  {
    value: 6,
    text: "10:00 am",
  },
  {
    value: 7,
    text: "11:00 am",
  },
  {
    value: 8,
    text: "12:00 pm",
  },
  {
    value: 9,
    text: "1:00 pm",
  },
  {
    value: 10,
    text: "2:00 pm",
  },
  {
    value: 11,
    text: "3:00 pm",
  },
  {
    value: 12,
    text: "4:00 pm",
  },
  {
    value: 13,
    text: "5:00 pm",
  },
  {
    value: 14,
    text: "6:00 pm",
  },
  {
    value: 15,
    text: "7:00 pm",
  },
  {
    value: 16,
    text: "8:00 pm",
  },
  {
    value: 17,
    text: "9:00 pm",
  },
  {
    value: 18,
    text: "10:00 pm",
  },
  {
    value: 19,
    text: "11:00 pm",
  },
  {
    value: 20,
    text: "12:00 am",
  },
];

export const LIMA_DISTRICTS = [
  { id: 1, value: "Ancón" },
  { id: 2, value: "Ate" },
  { id: 3, value: "Barranco" },
  { id: 4, value: "Breña" },
  { id: 5, value: "Carabayllo" },
  { id: 6, value: "Cercado de Lima" },
  { id: 7, value: "Chaclacayo" },
  { id: 8, value: "Chorrillos" },
  { id: 9, value: "Cieneguilla" },
  { id: 10, value: "Comas" },
  { id: 11, value: "El agustino" },
  { id: 12, value: "Independencia" },
  { id: 13, value: "Jesús maría" },
  { id: 14, value: "La molina" },
  { id: 15, value: "La victoria" },
  { id: 16, value: "Lince" },
  { id: 17, value: "Los olivos" },
  { id: 18, value: "Lurigancho" },
  { id: 19, value: "Lurín" },
  { id: 20, value: "Magdalena del mar" },
  { id: 21, value: "Miraflores" },
  { id: 22, value: "Pachacámac" },
  { id: 23, value: "Pucusana" },
  { id: 24, value: "Pueblo libre" },
  { id: 25, value: "Puente piedra" },
  { id: 26, value: "Punta hermosa" },
  { id: 27, value: "Punta negra" },
  { id: 28, value: "Rímac" },
  { id: 29, value: "San bartolo" },
  { id: 30, value: "San borja" },
  { id: 31, value: "San isidro" },
  { id: 32, value: "San Juan de Lurigancho" },
  { id: 33, value: "San Juan de Miraflores" },
  { id: 34, value: "San Luis" },
  { id: 35, value: "San Martin de Porres" },
  { id: 36, value: "San Miguel" },
  { id: 37, value: "Santa Anita" },
  { id: 38, value: "Santa María del Mar" },
  { id: 39, value: "Santa Rosa" },
  { id: 40, value: "Santiago de Surco" },
  { id: 41, value: "Surquillo" },
  { id: 42, value: "Villa el Salvador" },
  { id: 43, value: "Villa Maria del Triunfo" },
];

export const LIMA_POSTAL_CODES = [
  {
    code: 15001,
    name: "Lima",
  },
  {
    code: 15003,
    name: "Lima",
  },
  {
    code: 15004,
    name: "El Agustino",
  },
  {
    code: 15006,
    name: "El Agustino",
  },
  {
    code: 15007,
    name: "El Agustino",
  },
  {
    code: 15008,
    name: "Santa Anita",
  },
  {
    code: 15009,
    name: "Santa Anita",
  },
  {
    code: 15011,
    name: "Ate",
  },
  {
    code: 15012,
    name: "Ate",
  },
  {
    code: 15019,
    name: "San Luis",
  },
  {
    code: 15021,
    name: "San Luis",
  },
  {
    code: 15022,
    name: "El Agustino",
  },
  {
    code: 15023,
    name: "Ate",
  },
  {
    code: 15024,
    name: "La Molina",
  },
  {
    code: 15026,
    name: "La Molina",
  },
  {
    code: 15033,
    name: "La Victoria",
  },
  {
    code: 15034,
    name: "La Victoria",
  },
  {
    code: 15036,
    name: "San Borja",
  },
  {
    code: 15038,
    name: "Santiago de Surco",
  },
  {
    code: 15039,
    name: "Santiago de Surco",
  },
  {
    code: 15046,
    name: "Lima",
  },
  {
    code: 15047,
    name: "San Isidro",
  },
  {
    code: 15048,
    name: "Surquillo",
  },
  {
    code: 15049,
    name: "Santiago de Surco",
  },
  {
    code: 15054,
    name: "Santiago de Surco",
  },
  {
    code: 15056,
    name: "San Juan de Miraflores",
  },
  {
    code: 15057,
    name: "Chorrillos",
  },
  {
    code: 15063,
    name: "Barranco",
  },
  {
    code: 15064,
    name: "Chorrillos",
  },
  {
    code: 15066,
    name: "Chorrillos",
  },
  {
    code: 15067,
    name: "Chorrillos",
  },
  {
    code: 15072,
    name: "Jesús María",
  },
  {
    code: 15073,
    name: "San Isidro",
  },
  {
    code: 15074,
    name: "Miraflores",
  },
  {
    code: 15076,
    name: "Magdalena del Mar",
  },
  {
    code: 15079,
    name: "Lima",
  },
  {
    code: 15082,
    name: "Breña",
  },
  {
    code: 15083,
    name: "Breña",
  },
  {
    code: 15084,
    name: "Pueblo Libre",
  },
  {
    code: 15086,
    name: "Magdalena del Mar",
  },
  {
    code: 15087,
    name: "San Miguel",
  },
  {
    code: 15088,
    name: "San Miguel",
  },
  {
    code: 15093,
    name: "Rimac",
  },
  {
    code: 15094,
    name: "Rimac",
  },
  {
    code: 15096,
    name: "Rimac",
  },
  {
    code: 15102,
    name: "San Martin de Porres",
  },
  {
    code: 15103,
    name: "San Martin de Porres",
  },
  {
    code: 15106,
    name: "San Martin de Porres",
  },
  {
    code: 15107,
    name: "San Martin de Porres",
  },
  {
    code: 15108,
    name: "San Martin de Porres",
  },
  {
    code: 15109,
    name: "San Martin de Porres",
  },
  {
    code: 15112,
    name: "San Martin de Porres",
  },
  {
    code: 15113,
    name: "San Martin de Porres",
  },
  {
    code: 15116,
    name: "Puente Piedra",
  },
  {
    code: 15118,
    name: "Puente Piedra",
  },
  {
    code: 15121,
    name: "Carabayllo",
  },
  {
    code: 15122,
    name: "Carabayllo",
  },
  {
    code: 15123,
    name: "Santa Rosa",
  },
  {
    code: 15125,
    name: "Aucallama",
  },
  {
    code: 15126,
    name: "Aucallama",
  },
  {
    code: 15130,
    name: "Chancay",
  },
  {
    code: 15131,
    name: "Chancay",
  },
  {
    code: 15135,
    name: "Huacho",
  },
  {
    code: 15137,
    name: "Santa María",
  },
  {
    code: 15138,
    name: "Huaura",
  },
  {
    code: 15157,
    name: "Vegueta",
  },
  {
    code: 15160,
    name: "Vegueta",
  },
  {
    code: 15161,
    name: "Supe",
  },
  {
    code: 15162,
    name: "Supe",
  },
  {
    code: 15169,
    name: "Barranca",
  },
  {
    code: 15170,
    name: "Barranca",
  },
  {
    code: 15174,
    name: "Pativilca",
  },
  {
    code: 15175,
    name: "Pativilca",
  },
  {
    code: 15178,
    name: "Paramonga",
  },
  {
    code: 15180,
    name: "Paramonga",
  },
  {
    code: 15182,
    name: "Ambar",
  },
  {
    code: 15185,
    name: "Manas",
  },
  {
    code: 15190,
    name: "Gorgor",
  },
  {
    code: 15191,
    name: "Huancapón",
  },
  {
    code: 15195,
    name: "Cajatambo",
  },
  {
    code: 15197,
    name: "Copa",
  },
  {
    code: 15200,
    name: "Huaral",
  },
  {
    code: 15201,
    name: "Huaral",
  },
  {
    code: 15202,
    name: "Huaral",
  },
  {
    code: 15205,
    name: "Atavillos Bajo",
  },
  {
    code: 15210,
    name: "Sumbilca",
  },
  {
    code: 15215,
    name: "San Miguel de Acos",
  },
  {
    code: 15220,
    name: "Lampian",
  },
  {
    code: 15221,
    name: "Veintisiete de Noviembre",
  },
  {
    code: 15225,
    name: "Atavillos Alto",
  },
  {
    code: 15230,
    name: "Pacaraos",
  },
  {
    code: 15235,
    name: "Santa Cruz de Andamarca",
  },
  {
    code: 15237,
    name: "Sayán",
  },
  {
    code: 15240,
    name: "Sayán",
  },
  {
    code: 15245,
    name: "Ihuari",
  },
  {
    code: 15246,
    name: "Leoncio Prado",
  },
  {
    code: 15250,
    name: "Cochamarca",
  },
  {
    code: 15255,
    name: "Paccho",
  },
  {
    code: 15260,
    name: "Navan",
  },
  {
    code: 15265,
    name: "Caujul",
  },
  {
    code: 15266,
    name: "Andajes",
  },
  {
    code: 15270,
    name: "Pachangara",
  },
  {
    code: 15274,
    name: "Oyón",
  },
  {
    code: 15275,
    name: "Oyón",
  },
  {
    code: 15280,
    name: "Checras",
  },
  {
    code: 15285,
    name: "Santa Leonor",
  },
  {
    code: 15301,
    name: "Los Olivos",
  },
  {
    code: 15302,
    name: "Los Olivos",
  },
  {
    code: 15304,
    name: "Los Olivos",
  },
  {
    code: 15306,
    name: "Los Olivos",
  },
  {
    code: 15307,
    name: "Los Olivos",
  },
  {
    code: 15311,
    name: "Comas",
  },
  {
    code: 15312,
    name: "Comas",
  },
  {
    code: 15313,
    name: "Carabayllo",
  },
  {
    code: 15314,
    name: "Comas",
  },
  {
    code: 15316,
    name: "Carabayllo",
  },
  {
    code: 15318,
    name: "Carabayllo",
  },
  {
    code: 15319,
    name: "Carabayllo",
  },
  {
    code: 15320,
    name: "Carabayllo",
  },
  {
    code: 15321,
    name: "Carabayllo",
  },
  {
    code: 15324,
    name: "Comas",
  },
  {
    code: 15326,
    name: "Comas",
  },
  {
    code: 15327,
    name: "Comas",
  },
  {
    code: 15328,
    name: "Comas",
  },
  {
    code: 15331,
    name: "Independencia",
  },
  {
    code: 15332,
    name: "Independencia",
  },
  {
    code: 15333,
    name: "Independencia",
  },
  {
    code: 15335,
    name: "Santa Rosa de Quives",
  },
  {
    code: 15336,
    name: "Santa Rosa de Quives",
  },
  {
    code: 15340,
    name: "Arahuay",
  },
  {
    code: 15345,
    name: "Lachaqui",
  },
  {
    code: 15350,
    name: "San Buenaventura",
  },
  {
    code: 15355,
    name: "Huamantanga",
  },
  {
    code: 15360,
    name: "Canta",
  },
  {
    code: 15365,
    name: "Huaros",
  },
  {
    code: 15401,
    name: "San Juan de Lurigancho",
  },
  {
    code: 15404,
    name: "San Juan de Lurigancho",
  },
  {
    code: 15408,
    name: "San Juan de Lurigancho",
  },
  {
    code: 15412,
    name: "San Juan de Lurigancho",
  },
  {
    code: 15416,
    name: "San Juan de Lurigancho",
  },
  {
    code: 15419,
    name: "San Juan de Lurigancho",
  },
  {
    code: 15423,
    name: "San Juan de Lurigancho",
  },
  {
    code: 15427,
    name: "San Juan de Lurigancho",
  },
  {
    code: 15431,
    name: "San Juan de Lurigancho",
  },
  {
    code: 15434,
    name: "San Juan de Lurigancho",
  },
  {
    code: 15438,
    name: "San Juan de Lurigancho",
  },
  {
    code: 15442,
    name: "San Juan de Lurigancho",
  },
  {
    code: 15446,
    name: "San Juan de Lurigancho",
  },
  {
    code: 15449,
    name: "San Juan de Lurigancho",
  },
  {
    code: 15453,
    name: "San Juan de Lurigancho",
  },
  {
    code: 15457,
    name: "Lurigancho",
  },
  {
    code: 15461,
    name: "Lurigancho",
  },
  {
    code: 15464,
    name: "Lurigancho",
  },
  {
    code: 15468,
    name: "Lurigancho",
  },
  {
    code: 15472,
    name: "Chaclacayo",
  },
  {
    code: 15476,
    name: "Chaclacayo",
  },
  {
    code: 15479,
    name: "Ate",
  },
  {
    code: 15483,
    name: "Ate",
  },
  {
    code: 15487,
    name: "Ate",
  },
  {
    code: 15491,
    name: "Ate",
  },
  {
    code: 15494,
    name: "Ate",
  },
  {
    code: 15498,
    name: "Ate",
  },
  {
    code: 15500,
    name: "Santa Eulalia",
  },
  {
    code: 15501,
    name: "Santa Eulalia",
  },
  {
    code: 15505,
    name: "Callahuanca",
  },
  {
    code: 15510,
    name: "San Antonio",
  },
  {
    code: 15515,
    name: "San Pedro de Casta",
  },
  {
    code: 15516,
    name: "Huachupampa",
  },
  {
    code: 15520,
    name: "San Juan de Irís",
  },
  {
    code: 15525,
    name: "Carampoma",
  },
  {
    code: 15530,
    name: "Laraos",
  },
  {
    code: 15535,
    name: "Huanza",
  },
  {
    code: 15536,
    name: "Ricardo Palma",
  },
  {
    code: 15537,
    name: "Ricardo Palma",
  },
  {
    code: 15540,
    name: "San Mateo de Otao",
  },
  {
    code: 15545,
    name: "Santa Cruz de Cocachacra",
  },
  {
    code: 15550,
    name: "San Bartolomé",
  },
  {
    code: 15555,
    name: "Surco",
  },
  {
    code: 15556,
    name: "Matucana",
  },
  {
    code: 15560,
    name: "San Mateo",
  },
  {
    code: 15561,
    name: "San Mateo",
  },
  {
    code: 15564,
    name: "Chicla",
  },
  {
    code: 15565,
    name: "Chicla",
  },
  {
    code: 15570,
    name: "Santiago de Tuna",
  },
  {
    code: 15571,
    name: "San Andres de Tupicocha",
  },
  {
    code: 15575,
    name: "San Damian",
  },
  {
    code: 15577,
    name: "Lahuaytambo",
  },
  {
    code: 15580,
    name: "Langa",
  },
  {
    code: 15585,
    name: "Cuenca",
  },
  {
    code: 15586,
    name: "Antioquía",
  },
  {
    code: 15590,
    name: "Santo Domingo de los Olleros",
  },
  {
    code: 15593,
    name: "Pachacamac",
  },
  {
    code: 15594,
    name: "Cieneguilla",
  },
  {
    code: 15600,
    name: "San Antonio",
  },
  {
    code: 15605,
    name: "Santa Cruz de Flores",
  },
  {
    code: 15608,
    name: "Mala",
  },
  {
    code: 15610,
    name: "Mala",
  },
  {
    code: 15615,
    name: "Calango",
  },
  {
    code: 15620,
    name: "Quinocay",
  },
  {
    code: 15621,
    name: "Cochas",
  },
  {
    code: 15625,
    name: "Sangallaya",
  },
  {
    code: 15630,
    name: "Mariatana",
  },
  {
    code: 15635,
    name: "Huarochiri",
  },
  {
    code: 15640,
    name: "San Lorenzo de Quinti",
  },
  {
    code: 15641,
    name: "San Pedro de Huancayre",
  },
  {
    code: 15645,
    name: "Santiago de Anchucaya",
  },
  {
    code: 15650,
    name: "San Juan de Tantaranche",
  },
  {
    code: 15655,
    name: "San Joaquin",
  },
  {
    code: 15660,
    name: "Tanta",
  },
  {
    code: 15661,
    name: "Huañec",
  },
  {
    code: 15665,
    name: "Quinches",
  },
  {
    code: 15670,
    name: "Huampara",
  },
  {
    code: 15675,
    name: "Ayavirí",
  },
  {
    code: 15680,
    name: "San Pedro de Pilas",
  },
  {
    code: 15681,
    name: "Omas",
  },
  {
    code: 15685,
    name: "Coayllo",
  },
  {
    code: 15689,
    name: "Asia",
  },
  {
    code: 15690,
    name: "Asia",
  },
  {
    code: 15700,
    name: "Imperial",
  },
  {
    code: 15701,
    name: "San Vicente de Cañete",
  },
  {
    code: 15712,
    name: "Quilmana",
  },
  {
    code: 15715,
    name: "Quilmana",
  },
  {
    code: 15716,
    name: "Cerro Azul",
  },
  {
    code: 15717,
    name: "Cerro Azul",
  },
  {
    code: 15719,
    name: "San Luis",
  },
  {
    code: 15720,
    name: "San Luis",
  },
  {
    code: 15723,
    name: "Nuevo Imperial",
  },
  {
    code: 15725,
    name: "Nuevo Imperial",
  },
  {
    code: 15727,
    name: "Lunahuana",
  },
  {
    code: 15730,
    name: "Pacarán",
  },
  {
    code: 15735,
    name: "Zuñiga",
  },
  {
    code: 15736,
    name: "Chocos",
  },
  {
    code: 15740,
    name: "Azangaro",
  },
  {
    code: 15742,
    name: "Madean",
  },
  {
    code: 15745,
    name: "Viñac",
  },
  {
    code: 15748,
    name: "Huangascar",
  },
  {
    code: 15750,
    name: "Cacra",
  },
  {
    code: 15753,
    name: "Hongos",
  },
  {
    code: 15755,
    name: "Lincha",
  },
  {
    code: 15760,
    name: "Catahuasi",
  },
  {
    code: 15761,
    name: "Tupe",
  },
  {
    code: 15763,
    name: "Putinza",
  },
  {
    code: 15765,
    name: "Ayauca",
  },
  {
    code: 15768,
    name: "Tauripampa",
  },
  {
    code: 15770,
    name: "Colonia",
  },
  {
    code: 15775,
    name: "Yauyos",
  },
  {
    code: 15780,
    name: "Huantán",
  },
  {
    code: 15781,
    name: "Carania",
  },
  {
    code: 15785,
    name: "Laraos",
  },
  {
    code: 15786,
    name: "Alis",
  },
  {
    code: 15790,
    name: "Tomás",
  },
  {
    code: 15792,
    name: "Miraflores",
  },
  {
    code: 15795,
    name: "Vitis",
  },
  {
    code: 15796,
    name: "Huancaya",
  },
  {
    code: 15801,
    name: "San Juan de Miraflores",
  },
  {
    code: 15803,
    name: "San Juan de Miraflores",
  },
  {
    code: 15804,
    name: "San Juan de Miraflores",
  },
  {
    code: 15806,
    name: "San Juan de Miraflores",
  },
  {
    code: 15809,
    name: "Villa Maria del Triunfo",
  },
  {
    code: 15811,
    name: "Villa Maria del Triunfo",
  },
  {
    code: 15812,
    name: "Villa Maria del Triunfo",
  },
  {
    code: 15816,
    name: "Villa el Salvador",
  },
  {
    code: 15817,
    name: "Villa Maria del Triunfo",
  },
  {
    code: 15818,
    name: "Villa Maria del Triunfo",
  },
  {
    code: 15822,
    name: "Villa Maria del Triunfo",
  },
  {
    code: 15823,
    name: "Lurín",
  },
  {
    code: 15824,
    name: "San Juan de Miraflores",
  },
  {
    code: 15828,
    name: "Villa Maria del Triunfo",
  },
  {
    code: 15829,
    name: "San Juan de Miraflores",
  },
  {
    code: 15831,
    name: "Villa el Salvador",
  },
  {
    code: 15834,
    name: "Villa el Salvador",
  },
  {
    code: 15836,
    name: "Villa el Salvador",
  },
  {
    code: 15837,
    name: "Villa el Salvador",
  },
  {
    code: 15841,
    name: "Villa el Salvador",
  },
  {
    code: 15842,
    name: "San Juan de Miraflores",
  },
  {
    code: 15845,
    name: "Punta Hermosa",
  },
  {
    code: 15846,
    name: "Punta Hermosa",
  },
  {
    code: 15850,
    name: "Punta Negra",
  },
  {
    code: 15851,
    name: "Punta Negra",
  },
  {
    code: 15855,
    name: "San Bartolo",
  },
  {
    code: 15856,
    name: "San Bartolo",
  },
  {
    code: 15861,
    name: "Santa Maria del Mar",
  },
  {
    code: 15865,
    name: "Pucusana",
  },
  {
    code: 15866,
    name: "Pucusana",
  },
  {
    code: 15870,
    name: "Chilca",
  },
  {
    code: 15871,
    name: "Chilca",
  },
  // {
  //   code: 07001,
  //   name: "Bellavista",
  // },
  // {
  //   code: 07006,
  //   name: "Bellavista",
  // },
  // {
  //   code: 07011,
  //   name: "Bellavista",
  // },
  // {
  //   code: 07016,
  //   name: "Bellavista",
  // },
  // {
  //   code: 07001,
  //   name: "Callao",
  // },
  // {
  //   code: 07006,
  //   name: "Callao",
  // },
  // {
  //   code: 07021,
  //   name: "Callao",
  // },
  // {
  //   code: 07026,
  //   name: "Callao",
  // },
  // {
  //   code: 07031,
  //   name: "Callao",
  // },
  // {
  //   code: 07036,
  //   name: "Callao",
  // },
  // {
  //   code: 07041,
  //   name: "Callao",
  // },
  // {
  //   code: 07046,
  //   name: "Callao",
  // },
  // {
  //   code: 07006,
  //   name: "Carmen de la Legua Reynoso",
  // },
];
