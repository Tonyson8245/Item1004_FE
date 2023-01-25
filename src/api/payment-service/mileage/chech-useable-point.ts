import http from "../paymentHTTPClient";

export async function chechUseablePoint<T>(userIdx: string): Promise<string> {
  const url = "/point/check-useable-point.php";
  try {
    const result: string = await http.get(url, {
      params: {
        userIdx: userIdx,
      },
    });
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}
