import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
  validateStatus: () => true,
});

axiosClient.interceptors.request.use((req) => {
  console.log(`REQUEST: ${JSON.stringify(req, null, 2)}`);
  return req;
});

axiosClient.interceptors.response.use((res) => {
  console.log(`RESPONSE: ${JSON.stringify(res, null, 2)}`);
  return res;
});
