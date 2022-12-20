import axios from "axios";
import { validateOrReject } from "class-validator";

const baseurl_test = import.meta.env.VITE_BASE_URL_HOME_TEST;

const instance = axios.create({
  baseURL: baseurl_test, // baseUrl 설정
  timeout: 10000, // timeout 설정
});

instance.interceptors.response.use(
  (response) => {
    console.log(`http success`);
    //성공 시에는 result 값만 돌려보넴

    return response.data.result;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    console.log(`http failed`);
    //실패 할 경우 meta값을 돌려보냄
    return Promise.reject(error.response.data.meta);
  }
);

export default instance;
