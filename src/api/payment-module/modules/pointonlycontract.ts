import http from "../../payment-service/paymentHTTPClient";

export async function pointonlyContract<T>(
  sellerIdx: number,
  buyerIdx: number,
  point: number,
  productPrice: number,
  postIdx: number,
  totalPrice: number
): Promise<T> {
  const url = "/point/point-only-contract.php";
  try {
    const result: T = await http.post(url, {
      sellerIdx: sellerIdx,
      buyerIdx: buyerIdx,
      point: point,
      productPrice: productPrice,
      postIdx: postIdx,
      totalPrice: totalPrice,
    });
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}
