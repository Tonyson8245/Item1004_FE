import http from "../paymentHTTPClient";
import type mileageOveriewResponseDto from "@/domain/payment/mileageOverviewReponseDTO.interface";

export async function getMileageOverview<T>(
  userIdx: string
): Promise<mileageOveriewResponseDto> {
  const url = "/point/mypage-current-point.php?userIdx=" + userIdx;
  try {
    const result: mileageOveriewResponseDto = await http.get(url);
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}
