import axios from "axios";

const baseurl_test = import.meta.env.VITE_BASE_URL_AUTH_TEST;

const instance = axios.create({
  baseURL: baseurl_test, // baseUrl 설정
  timeout: 10000, // timeout 설정
});

instance.interceptors.response.use(
  (response) => {
    console.log(`http success`);
    return response.data.result;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    console.log(`http failed`);
    return Promise.reject(error.response);
  }
);

export default instance;
