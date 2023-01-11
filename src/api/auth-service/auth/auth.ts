import http from "@/api/auth-service/authHTTPClient";
import type { CreateTokenResponseDto } from "@/domain/auth/DTO/CreateTokenResponseDto";

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
