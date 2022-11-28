import http from "@/api/http";

export function getServiceTerm() {
  return http.get(`/service-terms/validities`);
}
