import http from "@/api/auth-service/authHTTPClient";
import type { TokenDto } from "@/domain/auth";
import type { userInfoResult } from "@/domain/user/userInfoDto";
import type { userInfoOverviewResult } from "@/domain/user/userInfoOverview";

export async function getUserInfo<T>(): Promise<userInfoResult> {
  const url = "/my/infos";
  var token = "";
  var accessTokenData = localStorage.getItem("accessToken");

  if (accessTokenData != null) {
    token = (JSON.parse(accessTokenData) as TokenDto).token;
  } else {
    return Promise.reject("token error");
  }

  try {
    const result: userInfoResult = await http.get(url, {
      headers: {
        accesstoken: token,
      },
    });
    return result;
  } catch (err) {
    return Promise.reject("API error");
  }
}
