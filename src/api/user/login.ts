import http from "@/api/http";
import type validServiceTerms from "@/interface/user/serviceTermList.interface";

export function getServiceTerm(): Promise<validServiceTerms> {
  const url = "/service-terms/validities";

  return http.get(url);
}
