import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { API_URL, LIMA_POSTAL_CODES } from "@/src/utils/Constants";
import { HOUR_LIST, RESERVE_STATUS } from "@/src/utils/Constants";

export const getAvatarUrl = (filename: string | null | undefined) =>
  filename ? `${API_URL}storage/user/avatar/${filename}` : undefined;

export const getCompanyAvatarUrl = (filename: string | null | undefined) =>
  filename ? `${API_URL}storage/company/avatar/${filename}` : undefined;

export const getFieldUrl = (filename: string | null | undefined) =>
  filename ? `${API_URL}storage/company/field/${filename}` : undefined;

export const findPostalCode = (code: string) =>
  LIMA_POSTAL_CODES.find((o) => o.code === parseInt(code));

// Reserve helpers
export const getStatus = (status: string) => {
  const filtered = RESERVE_STATUS.filter((statusObj) => {
    return statusObj.value === status;
  });
  return filtered[0].text;
};

export const getHourName = (key: number | undefined) => {
  if (key) {
    const filtered = HOUR_LIST.filter((hour) => {
      return hour.value === key;
    });
    return filtered[0].text;
  }
  return;
};

export const getDayName = (day: string) => {
  const date = parseISO(day);
  return format(date, "dd MMM yyyy", { locale: es });
};

export const hasInscriptionText = (value: boolean) => {
  return value ? "Si" : "No";
};
