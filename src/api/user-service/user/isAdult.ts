import type { TokenDto } from "@/domain/auth";
import http from "@/api/user-service/UserHTTPClient";
import type { AxiosResponse } from "axios";

export async function isAdult<T>() {
  const url = "/users/adults";
  var accessTokenData = localStorage.getItem("accessToken");

  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;

    try {
      const { status, data }: AxiosResponse<T> = await http.head(url, {
        headers: {
          accesstoken: token,
        },
      });
      return status < 500 ? data : Promise.reject("error");
    } catch (err) {
      return Promise.reject(err);
    }
  } else return Promise.reject("error");
}
