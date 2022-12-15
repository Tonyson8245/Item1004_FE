import http from "@/api/user-serive/UserHTTPClient";
import type validServiceTerms from "@/domain/home/serviceTermList.interface";

export function getServiceTerm(): Promise<validServiceTerms> {
  const url = "/service-terms/validities";

  return http.get(url);
}
