import http from "@/api/auth-service/authHTTPClient";
import { checkTokenStatus } from "@/api/common";
import type { TokenDto } from "@/domain/auth";
import type { CreateTokenResponseDto } from "@/domain/auth/DTO/CreateTokenResponseDto";
import type meta from "@/domain/common/meta.interface";

class logoutResponseDto {
  meta: meta;
  result: number;
}

export async function getToken<T>(
  id: string,
  pw: string
): Promise<CreateTokenResponseDto> {
  const url = "/auth/tokens/local";
  try {
    const result: CreateTokenResponseDto = await http.post(url, {
      id: id,
      password: pw,
    });
    console.log(`api success`);
    return result;
  } catch (err) {
    console.log("API error");
    console.log(`api failed`);
    return Promise.reject(err);
  }
}

export async function deleteToken<T>(): Promise<logoutResponseDto | undefined> {
  const url = "/auth/tokens";

  // TODO 토큰 상태를 확인 하는 메서드, 나중에 정리 필요
  checkTokenStatus();

  var accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    try {
      const result: logoutResponseDto = await http.delete(url, {
        headers: {
          accessToken: token,
        },
      });
      console.log(`api success`);
      return result;
    } catch (err) {
      console.log("API error");
      console.log(`api failed`);
      return Promise.reject(err);
    }
  } else console.log("token error");
}
