import type { TokenDto } from "@/domain/auth";
import type meta from "@/domain/common/meta.interface";
import { usePaymentStore } from "@/store/modules/home/paymentStore";
import axios, { type AxiosResponse } from "axios";
import { storeToRefs } from "pinia";

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

async function getuseinfo<T>(): Promise<infoResponse | undefined> {
  var url =
    "https://4045zs3ccg.execute-api.ap-northeast-2.amazonaws.com/develop/my/infos/personal";
  var accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;
    try {
      const { status, data }: AxiosResponse<infoResponse> = await axios.get(
        url,
        {
          headers: {
            accessToken: token,
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
