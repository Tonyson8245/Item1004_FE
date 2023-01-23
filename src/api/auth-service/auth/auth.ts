import http from "@/api/auth-service/authHTTPClient";
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
  var accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;

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
  }
}
