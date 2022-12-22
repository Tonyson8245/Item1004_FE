import http from "@/api/user-service/UserHTTPClient";
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
