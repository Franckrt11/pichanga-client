import { ReactNode } from "react";

export interface RegisterUserData {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  district: string;
  password: string;
  password_confirmation: string;
  checkbox: boolean;
}

export interface PhotoData {
  photo: string | null;
}

export interface UserData {
  id: number;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  district: string;
  photo?: string | null;
  push: boolean;
  mailing: boolean;
}

export interface CompanyData {
  id: number;
  name: string;
  photo?: string | null;
  email: string;
  ruc: string;
  mailing: boolean;
  push: boolean;
  status: boolean;
}

// export interface FetchUserData extends UserData {
//   password: string;
//   password_confirmation: string;
//   checkbox: boolean;
// }

export interface ProviderProps {
  children: ReactNode;
}

export interface ColorIconProps {
  active: boolean;
  color: string;
}

export interface SizeIconProps {
  active?: boolean;
  size: number;
}

// export interface ISpecialHour {
//   type: string;
//   day: string;
//   hour: string;
//   field: string;
//   reason: string;
// };

interface DistrictData {
  id: number;
  name: string;
  city_id: number;
}

interface CityData {
  id: number;
  name: string;
  country_id: number;
}

interface CountryData {
  id: number;
  name: string;
}

export interface FieldData {
  id: number;
  name: string;
  address: string;
  country: CountryData;
  city: CityData;
  district: DistrictData;
  map_latitude: number;
  map_longitude: number;
  portrait: string | null;
  games?: string;
  mobile?: string;
  parking?: string;
  phone?: string;
  players?: string;
  size?: string;
  type?: string;
  company_id: number;
  company?: CompanyData;
};

// export interface FieldPicture {
//   location: string;
//   picture: string | boolean;
//   position: number;
//   field_id: number;
// };

export interface FieldPictureData {
  id: number;
  filename: string;
  position: number;
  field_id: number;
};

// export interface FieldDay {
//   day: string;
//   active: boolean;
// };

export interface HourRange {
  id?: number;
  position: number;
  start: number;
  end: number;
  price?: any;
};
// export interface HourDayRange {
//   [key: string]: HourRange[]
// };


export interface IMessages {
  id: number;
  message: string;
  sender: string;
  attach: string | null;
  chat_id: number;
  updated_at: string;
  created_at: string;
}

export interface IRoom {
  id: number;
  last_message: string;
  last_sender: string;
  company_id: number;
  user_id: number;
  company: IFetchCompany;
  user: IFetchUser;
  created_at: string;
  updated_at: string;
}

export interface IFetchCompany extends PhotoData {
  id: number;
  name: string;
  ruc: string;
  email: string;
}

export interface IFetchUser extends PhotoData {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

export interface ReserveData {
  id?: number;
  date: string;
  time: number;
  game: string;
  price: number;
  inscription: boolean;
  status: string;
  field_hour_id: number;
  field_id: number;
  user_id: number;
  field?: FieldData;
  hour?: HourRange;
}

export interface GoogleUser {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}

export interface FacebookUser {
  userID?: string | null;
  email?: string | null;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  linkURL?: string | null;
  imageURL?: string | null;
}
