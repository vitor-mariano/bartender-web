import axios from "axios";
import { getPublicConfig } from "src/app/shared/config";

export function getAxiosInstance(accessToken?: string) {
  const config = getPublicConfig();

  const axiosInstance = axios.create({
    baseURL: config.api.url,
    ...(accessToken && {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  });

  return axiosInstance;
}
