import type {
  getProductCardResponseDto,
  getProductCardBodyDto,
  getProductCardResultDto,
} from "@/domain/home/getProductCardDto";
import http from "../HomeHTTPClient";

export async function getProductCard<T>(
  payload: getProductCardBodyDto
): Promise<getProductCardResultDto> {
  const url = "/posts/games";
  try {
    const result: getProductCardResultDto = await http.get(url, {
      params: {
        page: payload.page,
        unit: payload.unit,
        type: payload.type,
        productTypes: payload.productTypes,
        gameIdx: payload.gameIdx,
        serverIdx: payload.serverIdx,
      },
    });
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}
