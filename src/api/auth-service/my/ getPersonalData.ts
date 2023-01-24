import http from "@/api/auth-service/authHTTPClient";
import type { TokenDto } from "@/domain/auth";
import type meta from "@/domain/common/meta.interface";
import type * as auth from "@/domain/auth/index";
import type { userPersonalDataResult } from "@/domain/user/userPersonalDataDto";

export async function getPersoncalData<T>(): Promise<userPersonalDataResult> {
  const url = "/my/infos/overview";
  var token = "";
  var accessTokenData = localStorage.getItem("accessToken");

  if (accessTokenData != null) {
    token = (JSON.parse(accessTokenData) as TokenDto).token;
  } else {
    return Promise.reject("token error");
  }

  try {
    const result: userPersonalDataResult = await http.get(url, {
      headers: {
        accessToken: token,
      },
    });
    return result;
  } catch (err) {
    return Promise.reject("API error");
  }
}
