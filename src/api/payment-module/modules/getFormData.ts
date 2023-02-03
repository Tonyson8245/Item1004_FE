import type { TokenDto } from "@/domain/auth";
import type meta from "@/domain/common/meta.interface";
import { usePaymentStore } from "@/store/modules/home/paymentStore";
import type { AxiosResponse } from "axios";
import { storeToRefs } from "pinia";
import http from "../paymentmoduletHTTPClient";
import { checkTokenStatus } from "@/api/common";

class infoResult {
  name: string;
  phone: string;
  birth: string;
}

class infoResponse {
  meta: meta;
  result: infoResult;
}
class postDataDto {
  postTitle: string;

  constructor(postTitle: string) {
    this.postTitle = postTitle;
  }

  // 👇️ with class method
  data = (): postDataDto => {
    return this;
  };
}

const baseurl = import.meta.env.VITE_BASE_URL_AUTH_BASE+"/my/infos";
const testurl = import.meta.env.VITE_BASE_URL_AUTH_TEST+"/my/infos";
const tokenUrl_base = import.meta.env.VITE_BASE_URL_USER_BASE;
const tokenUrl_test = import.meta.env.VITE_BASE_URL_USER_TEST;

var url = "";
var tokenUrl = "";

//API 경로 설정
if (import.meta.env.MODE == "production") {
  url = baseurl;
  tokenUrl = tokenUrl_base;
} else {
  url = testurl;
  tokenUrl = tokenUrl_test;
}
async function getuseinfo<T>(): Promise<infoResponse | undefined> {
  // TODO 토큰 상태를 확인 하는 메서드, 나중에 정리 필요
  checkTokenStatus();
  var accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;
    try {
      const { status, data }: AxiosResponse<infoResponse> = await http.get(
        url,
        {
          headers: {
            accessToken: token,
          },
          params: {
            scope: "name,phone",
          },
        }
      );
      return status < 500 ? data : undefined;
    } catch (err) {
      console.log(err);
    }
  }
}

const getPostdata = () => {
  const paymentstore = usePaymentStore();
  const { storePostTitle } = storeToRefs(paymentstore);

  var result = new postDataDto(storePostTitle.value);
  return result;
};

export { getuseinfo, getPostdata };
