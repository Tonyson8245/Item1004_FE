import type meta from "@/domain/common/meta.interface";
import axios from "axios";
import http from "../../payment-service/paymentHTTPClient";

class pointonlyContractResult {
  tid: number;
  amt: number;
  payMethod: string;
  ediDate: string;
}

export async function pointonlyContract(
  sellerIdx: number,
  buyerIdx: number,
  point: number,
  productPrice: number,
  postIdx: number,
  totalPrice: number
): Promise<pointonlyContractResult> {
  const url = "/point/point-only-contract.php";
  try {
    const result: pointonlyContractResult = await http.post(
      url,
      {
        sellerIdx: sellerIdx,
        buyerIdx: buyerIdx,
        point: point,
        productPrice: productPrice,
        postIdx: postIdx,
        totalPrice: totalPrice,
      },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}
