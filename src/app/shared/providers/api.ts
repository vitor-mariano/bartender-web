import axios from "axios";
import { getConfig } from "src/app/shared/config";

export function getAxiosInstance() {
  const config = getConfig();

  const axiosInstance = axios.create({
    baseURL: config.api.url,
  });

  return axiosInstance;
}
