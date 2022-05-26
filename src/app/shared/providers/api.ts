import axios from "axios";
import { getConfig } from "src/app/shared/config";

export function getAxiosInstance(accessToken?: string) {
  const config = getConfig();

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
