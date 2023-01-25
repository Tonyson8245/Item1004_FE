import type { TokenDto } from "@/domain/auth";
import type { user } from "@/domain/user/user.interface";
import { useLocalStorage } from "@vueuse/core";
import { useRouter } from "vue-router";

const router = useRouter();

import axios from "axios";

const baseurl_test = import.meta.env.VITE_BASE_URL_USER_TEST;
const tokenUrl = import.meta.env.VITE_BASE_URL_USER_TEST;

const instance = axios.create({
  baseURL: baseurl_test, // baseUrl 설정
  timeout: 10000, // timeout 설정
});

const namespace = "userHTTPClient::";
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

        var response: any;
        // token refresh 요청
        await axios
          .put(
            tokenUrl + `/auth/tokens`, // token refresh api
            { refreshToken: `${token}`, userIdx: userIdx }
          )
          .then((res: any) => {
            console.log(namespace, res);
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
            console.log(namespace, "재발급 실패 >>> USER");
            return Promise.reject(error.response.data.meta);
          });

        await axios(originalRequest)
          .then((res) => {
            console.log(namespace, "api 재요청 성공", res);
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
    } else return Promise.reject(error.response.data.meta);
  }
);

export default instance;
