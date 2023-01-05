import http from "@/api/user-service/UserHTTPClient";
import type { findUseridResponseDto } from "@/domain/user/findUseridResponseDto";
import type { AxiosResponse } from "axios";

export async function getUserId<T>(
  authId: string
): Promise<findUseridResponseDto> {
  const url = "/users/ids";
  try {
    const res: AxiosResponse<findUseridResponseDto> = await http.get(url, {
      headers: {
        authid: authId,
      },
    });

    console.log(`api success`);
    return res.data;
  } catch (err) {
    console.log("API error");
    console.log(`api failed`);
    return Promise.reject(err);
  }
}
