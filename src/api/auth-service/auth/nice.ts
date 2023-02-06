import http from "@/api/auth-service/authHTTPClient";
import type { checkAuthidDto } from "@/domain/auth/DTO/CheckAuthIdDto";
import type { niceEncrypotionDto } from "@/domain/auth/DTO/niceEncrypotionDto";
import axios from "axios";

const niceInstance = axios.create({
  timeout: 10000, // timeout 설정
});

export async function getNiceEncDataAPI<T>(
  mode: string
): Promise<niceEncrypotionDto> {
  const url = `/auth/certifications/${mode}/enc-data`;
  try {
    const result: niceEncrypotionDto = await http.get(url);
    console.log(`api success`);
    return result;
  } catch (err) {
    console.log("API error");
    console.log(`api failed`);
    return Promise.reject(err);
  }
}

export async function getNiceCertification<T>(authId: string, data: string) {
  const url = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";

  niceInstance.post(
    url,
    {
      m: `checkplusService`,
      EncodeData: data,
    },
    {
      headers: {
        authId: authId,
      },
    }
  );
}

export async function checkAuthid<T>(authId: string): Promise<checkAuthidDto> {
  const url = "/auth/ids/" + authId + "?mode=register&status=verified";
  try {
    const res: checkAuthidDto = await http.get(url);
    console.log(`api success`);
    return Promise.resolve(res);
  } catch (err) {
    console.log("API error");
    console.log(`api failed`);
    return Promise.reject(err);
  }
}
//작성중
