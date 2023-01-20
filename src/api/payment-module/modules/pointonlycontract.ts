import type meta from "@/domain/common/meta.interface";
import axios from "axios";
import { UUID } from "uuid-generator-ts";
import http from "../../payment-service/paymentHTTPClient";
import type * as pointDto from "@/domain/payment/pointonlyContracttDto.interface";
import { payload } from "@/domain/payment/card-PointandContractDto.interface";

class pointonlyContractResult {
  tid: number;
  postIdx: number;
  payMethod: string;
  userIdx: string;
}

export async function pointonlyContract(
  body: pointDto.payload,
  uuid: string
): Promise<pointonlyContractResult> {
  const url = "/point/point-only-contract.php";

  body.ordNm = uuid;
  try {
    const result: pointonlyContractResult = await http.post(url, body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}
