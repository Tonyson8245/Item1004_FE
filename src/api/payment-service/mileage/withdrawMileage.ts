import type { TokenDto } from "@/domain/auth";
import type {
  withdrawalMileageBody,
  withdrawMileageResult,
} from "@/domain/payment/withdrawMileage.interface";
import http from "../paymentHTTPClient";
import { checkTokenStatus } from "@/api/common";

export async function withdrawMileage(
  body: withdrawalMileageBody
): Promise<withdrawMileageResult> {
  const url = "/point/request-withdraw.php";
  // TODO 토큰 상태를 확인 하는 메서드, 나중에 정리 필요
  checkTokenStatus();
  var accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;

    try {
      const result: withdrawMileageResult = await http.post(url, body, {
        headers: {
          accessToken: token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(`api success`);
      return result;
    } catch (err) {
      console.log(`api failed`);
      return Promise.reject(err);
    }
  } else return Promise.reject("token error");
}
