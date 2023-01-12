import http from "@/api/auth-service/authHTTPClient";
import type meta from "@/domain/common/meta.interface";

export async function putAccount<T>(): Promise<meta> {
  const url = "/my/account";
  try {
    const result: meta = await http.post(url, {
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
