import axios from "axios";
import { getLocalValue, LOCAL_KEYS } from "../../utils/reduxStorage";

const apiClient = axios.create({
  baseURL: `http://localhost:3001`,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = getLocalValue(LOCAL_KEYS.ACCESS_TOKEN);

  const axiosConfig = { ...config };
  axiosConfig.headers["Content-Type"] = "application/json";
  axiosConfig.headers["Access-Control-Allow-Origin"] = "*";
  if (accessToken) {
    axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
  }
  // if (!!userId) {
  //   axiosConfig.headers['userKey'] = userId;
  // }
  if (config.url?.includes("/upload")) {
    axiosConfig.headers["Content-Type"] = "multipart/form-data";
  }

  return axiosConfig;
});

export { apiClient };
