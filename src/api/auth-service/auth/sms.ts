import http from "@/api/auth-service/authHTTPClient";
import type * as SmsDto from "@/domain/auth/DTO/SmsDto";
import type { AxiosResponse } from "axios";

export async function creatSMSCode<T>(
  mode: string,
  body: SmsDto.CreateSmsCodeBodyDto
): Promise<SmsDto.CreateSmsCodeResponseDto | string> {
  const url = "/auth/codes/sms?mode=" + mode;
  try {
    const result: SmsDto.CreateSmsCodeResponseDto | string = await http.post(
      url,
      body
    );
    return result;
  } catch (err) {
    console.log("API error");
    console.log(`api failed`);
    return Promise.reject(err);
  }
}

export async function chcekSms<T>(body: SmsDto.checkSMSBodyDto) {
  const url = "/auth/codes/sms/" + body.code + "?mode=" + body.mode;
  try {
    const response = await http.head(url, {
      headers: {
        authid: body.authid,
      },
    });
    return "success";
  } catch (err) {
    return Promise.reject(err);
  }
}
