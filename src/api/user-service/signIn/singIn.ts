import http from "@/api/user-service/UserHTTPClient";
import type { CreateTokenResponseDto } from "@/domain/auth/CreateTokenResponseDto";
import type validServiceTerms from "@/domain/user/serviceTermList.interface";
import type { AxiosResponse } from "axios";

export async function getServiceTerms<T>(): Promise<
  validServiceTerms | undefined
> {
  const url = "/service-terms/validities";
  try {
    const { status, data }: AxiosResponse<validServiceTerms> = await http.get(
      url
    );
    return status < 500 ? data : undefined;
  } catch (err) {
    console.log(err);
  }
}

export async function checkUserid<T>(id: string) {
  const url = "/users/ids/" + id;
  try {
    const { status, data }: AxiosResponse<T> = await http.head(url);
    return status < 500 ? data : undefined;
  } catch (err) {}
}

export async function checkPublicidx<T>(index: string) {
  const url = "/users/public-idxs/" + index;
  try {
    const { status, data }: AxiosResponse<T> = await http.head(url);
    return status < 500 ? data : undefined;
  } catch (err) {}
}

export async function signIn<T>(
  id: string,
  pw: string,
  terms: number[],
  recommender: string,
  authId: string
): Promise<CreateTokenResponseDto> {
  const url = "/users/registrations/local";
  try {
    const result: CreateTokenResponseDto = await http.post(
      url,
      {
        id: id,
        password: pw,
        serviceTermIdxs: terms,
        ...(recommender != "" ? { recommender: recommender } : {}),
      },
      {
        headers: {
          authId: authId,
        },
      }
    );
    console.log(`api success`);
    return result;
  } catch (err) {
    console.log("API error");
    console.log(`api failed`);
    return Promise.reject(err);
  }
}
