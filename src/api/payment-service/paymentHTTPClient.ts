import axios from "axios";

const baseurl_test = import.meta.env.VITE_BASE_URL_PAYMENT_TEST;

const instance = axios.create({
  baseURL: baseurl_test, // baseUrl 설정
  timeout: 10000, // timeout 설정
});

instance.interceptors.response.use(
  (response) => {
    //성공 시에는 result 값만 돌려보넴
    return response.data.result;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    //실패 할 경우 meta값을 돌려보냄
    return Promise.reject(error.response.data.meta);
  }
);

export default instance;
