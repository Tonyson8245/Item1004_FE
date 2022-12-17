import type meta from "@/domain/common/meta.interface";
import type { AxiosResponse } from "axios";
import { useloginStore } from "@/store/modules/user/authStore";

const loginStore = useloginStore();

export interface term {
  idx: number; // 약관 고유 번호
  title: string; // 제목
  mandatory: boolean; // 필수 약관 여부
  link: string; // 약관 url
}

export default interface validServiceTerms extends AxiosResponse {
  meta: meta;
  result: {
    validServiceTerms: Array<term>; // 유효한 서비스 약관 목록
  };
}
