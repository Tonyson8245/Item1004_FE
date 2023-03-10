import type { TokenDto } from "@/domain/auth";
import type { user } from "@/domain/user/user.interface";
import { useLocalStorage } from "@vueuse/core";
import axios from "axios";

const baseurl = import.meta.env.VITE_BASE_URL_PAYMENT_BASE;
const testurl = import.meta.env.VITE_BASE_URL_PAYMENT_TEST;
const tokenUrl_base = import.meta.env.VITE_BASE_URL_USER_BASE;
const tokenUrl_test = import.meta.env.VITE_BASE_URL_USER_TEST;

var url = "";
var tokenUrl = "";

//API 경로 설정
if (import.meta.env.MODE == "production") {
  url = baseurl;
  tokenUrl = tokenUrl_base;
} else {
  url = testurl;
  tokenUrl = tokenUrl_test;
}

const instance = axios.create({
  baseURL: url, // baseUrl 설정
  timeout: 10000, // timeout 설정
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      const originalRequest = config;

      var refreshToken = localStorage.getItem("refreshToken");
      var user = localStorage.getItem("user");

      if (refreshToken != null && user != null) {
        var token = (JSON.parse(refreshToken) as TokenDto).token;
        var userIdx = (JSON.parse(user) as user).idx;

        // token refresh 요청
        await axios
          .put(
            tokenUrl + `/auth/tokens`, // token refresh api
            { refreshToken: `${token}`, userIdx: userIdx }
          )
          .then((res: any) => {
            console.log(res);
            // 새로운 토큰 저장
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            useLocalStorage("accessToken", res.data.result.accessToken);
            useLocalStorage("refreshToken", res.data.result.refreshToken);

            originalRequest.headers.accessToken =
              res.data.result.accessToken.token;
          })
          .catch((err) => {
            console.log("재발급 실패 >>> PAYMENTMODULE");
          });

        var data: any;

        await axios(originalRequest)
          .then((response) => {
            data = response;
          })
          .catch((err) => {
            console.log("api 재 요청 실패");
            return Promise.reject(err);
          });
      }
      // module 별로 다름 위에 참고
      return data;
    } else return Promise.reject(error);
    return Promise.reject(error.response.data.meta);
  }
);

export default instance;
