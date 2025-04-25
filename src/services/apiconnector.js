import axios from "axios";

// ✅ Render backend base URL
export const axiosInstance = axios.create({
  baseURL: "https://studynotion-1rps.onrender.com/api/v1",
  withCredentials: true,
});

// ✅ Improved apiconnector function
export const apiconnector = (method, url, bodyData = {}, headers = {}, params = {}) => {
  return axiosInstance({
    method: method,
    url: url,
    data: bodyData,
    headers: headers,
    params: params,
  });
};
