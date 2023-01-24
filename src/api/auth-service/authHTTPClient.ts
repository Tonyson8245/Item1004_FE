import type { TokenDto } from "@/domain/auth";
import type { user } from "@/domain/user/user.interface";
import { useLocalStorage } from "@vueuse/core";
import axios, { AxiosError } from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const baseurl_test = import.meta.env.VITE_BASE_URL_AUTH_TEST;

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
            baseurl_test + `/auth/tokens`, // token refresh api
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
            console.log("재발급 실패");
            alert("다시 로그인해주세요");
            router.push("/account/login");
          });

        var response: any;

        await axios(originalRequest)
          .then((res) => {
            response = res;
          })
          .catch((err) => {
            console.log("api 재 요청 실패");
            return Promise.reject(err);
          });
      }
      // module 별로 다름 위에 참고
      return response.data.result;
    } else return Promise.reject(error);
    return Promise.reject(error.response.data.meta);
  }
);

export default instance;
