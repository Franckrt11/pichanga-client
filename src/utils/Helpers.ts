import { API_URL, LIMA_POSTAL_CODES } from "@/src/utils/Constants";

export const getAvatarUrl = (filename: string | null | undefined) =>
  filename ? `${API_URL}storage/user/avatar/${filename}` : undefined;

export const getCompanyAvatarUrl = (filename: string | null | undefined) =>
  filename ? `${API_URL}storage/company/avatar/${filename}` : undefined;

export const getFieldUrl = (filename: string | null | undefined) =>
  filename ? `${API_URL}storage/company/field/${filename}` : undefined;

export const findPostalCode = (code: string) =>
  LIMA_POSTAL_CODES.find(o => o.code === parseInt(code))
