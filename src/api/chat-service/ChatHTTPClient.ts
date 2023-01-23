import axios from "axios";

const baseurl_test = import.meta.env.VITE_BASE_URL_CHAT_TEST;

const instance = axios.create({
  baseURL: baseurl_test, // baseUrl 설정
  timeout: 10000, // timeout 설정
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const {
    //   config,
    //   response: { status },
    // } = error;

    return Promise.reject(error);
  }
);

export default instance;
