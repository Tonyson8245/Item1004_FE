import type { checkwithdrawPointDtoResult } from "@/domain/payment/checkwithdrawPointDto.interface";
import http from "../paymentHTTPClient";

export async function checkwithdrawPoint<T>(
  userIdx: string
): Promise<checkwithdrawPointDtoResult> {
  const url = "/point/check-withdraw-point.php";
  try {
    const result: checkwithdrawPointDtoResult = await http.get(url, {
      params: {
        userIdx: userIdx,
      },
    });
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}
