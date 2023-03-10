import type { TokenDto } from "@/domain/auth";
import type { user } from "@/domain/user/user.interface";
import { useLocalStorage } from "@vueuse/core";
import axios, { AxiosError } from "axios";

const baseurl = import.meta.env.VITE_BASE_URL_CHAT_BASE;
const testurl = import.meta.env.VITE_BASE_URL_CHAT_TEST;
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

const namespace = "ChatHTTPClient::";

instance.interceptors.response.use(
  (response) => {
    //성공 시에는 result 값만 돌려보넴
    console.log(namespace, "http 요청 성공");
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    console.log(namespace, "http 요청 실패");

    if (status === 401) {
      const originalRequest = config;

      var refreshToken = localStorage.getItem("refreshToken");
      var user = localStorage.getItem("user");

      if (refreshToken != null && user != null) {
        var token = (JSON.parse(refreshToken) as TokenDto).token;
        var userIdx = (JSON.parse(user) as user).idx;
        var response: any;
        // token refresh 요청
        await axios
          .put(
            tokenUrl + `/auth/tokens`, // token refresh api
            { refreshToken: `${token}`, userIdx: userIdx }
          )
          .then((res: any) => {
            console.log(namespace);
            console.log(namespace, "재발급 성공");
            // 새로운 토큰 저장
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            useLocalStorage("accessToken", res.data.result.accessToken);
            useLocalStorage("refreshToken", res.data.result.refreshToken);

            originalRequest.headers.accessToken =
              res.data.result.accessToken.token;
          })
          .catch((err) => {
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            console.log(namespace, "재발급 실패 >>> CHAT");
            return Promise.reject(error.response.data.meta);
          });

        await axios(originalRequest)
          .then((res) => {
            console.log(namespace, "api 재요청 성공");
            response = res;
          })
          .catch((err) => {
            alert("다시 로그인해주세요.");
            // 기존 정보 지우기
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            location.href = "/account/login";

            return Promise.reject(error.response.data.meta);
          });

        // module 별로 다름 위에 참고
        return response;
      } else return Promise.reject(error.response.data.meta);
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
